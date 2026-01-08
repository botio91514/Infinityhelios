import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

const app = express();

// 1. Clean CORS Setup
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://infinityhelios.com",
    "https://www.infinityhelios.com"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    exposedHeaders: ["nonce", "cart-token", "X-WC-Store-API-Nonce"]
}));

app.use(express.json());

// ---------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------
const WP_BASE_URL = process.env.WC_BASE_URL || "https://admin.infinityhelios.com";
// REPLACE '123' WITH YOUR ACTUAL CONTACT FORM 7 ID FROM WORDPRESS
const CONTACT_FORM_ID = process.env.CONTACT_FORM_ID || "6";

// WooCommerce API Instance
const wc = axios.create({
    baseURL: `${WP_BASE_URL}/wp-json/wc/v3`,
    auth: {
        username: process.env.WC_CONSUMER_KEY,
        password: process.env.WC_CONSUMER_SECRET,
    },
    headers: {
        "Content-Type": "application/json"
    }
});

// ---------------------------------------------------------
// 2. CONTACT FORM ROUTE (The Fix)
// ---------------------------------------------------------
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        console.log(`[Contact] Sending message from: ${email}`);

        // Construct FormData for Contact Form 7 REST API
        const form = new FormData();
        form.append('your-name', name);
        form.append('your-email', email);
        form.append('your-subject', subject || "New Inquiry from Website");
        form.append('your-message', message);
        form.append('your-phone', phone);

        // CF7 Hidden Fields (Required for some configurations)
        form.append('_wpcf7', CONTACT_FORM_ID);
        form.append('_wpcf7_unit_tag', `wpcf7-f${CONTACT_FORM_ID}-p1-o1`);
        form.append('_wpcf7_version', '5.9');
        form.append('_wpcf7_locale', 'en_US');
        form.append('_wpcf7_container_post', '0');

        // Hit the CF7 REST Endpoint
        const cf7Url = `${WP_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/${CONTACT_FORM_ID}/feedback`;

        const response = await axios.post(cf7Url, form, {
            headers: form.getHeaders()
        });

        if (response.data.status === "mail_sent") {
            res.json({ success: true, message: "Message sent successfully!" });
        } else {
            console.error("[Contact Error]", response.data);
            res.status(400).json({
                success: false,
                message: response.data.message || "Failed to send message.",
                detail: response.data.invalid_fields
            });
        }

    } catch (error) {
        console.error("[Contact Proxy Error]", error.message);
        console.error("Using ID:", CONTACT_FORM_ID);
        console.error("Target URL:", `${WP_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/${CONTACT_FORM_ID}/feedback`);

        res.status(500).json({
            success: false,
            message: "Server connection failed.",
            // EXPOSE ERROR DETAILS FOR DEBUGGING
            debug_error: error.message,
            debug_response: error.response ? error.response.data : "No upstream response",
            debug_config: {
                id: CONTACT_FORM_ID,
                url: WP_BASE_URL
            }
        });
    }
});

// ---------------------------------------------------------
// 3. AUTH & REGISTRATION ROUTES
// ---------------------------------------------------------
app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;
        const response = await wc.post("/customers", {
            email, password, first_name, last_name, username: email.split('@')[0]
        });
        res.json({ success: true, user: response.data });
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Registration failed" });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await axios.post(`${WP_BASE_URL}/wp-json/jwt-auth/v1/token`, { username, password });
        res.json(response.data);
    } catch (error) {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// ---------------------------------------------------------
// 4. STORE API PROXY (Cleaner Version)
// ---------------------------------------------------------
// ---------------------------------------------------------
// 4. STORE API PROXY (Fixed Route Matching)
// ---------------------------------------------------------
// Use standard Express wildcard syntax
// Use standard middleware mounting (Fail-Safe)
app.use("/api/store", async (req, res) => {
    // req.path DOES NOT include /api/store when using app.use
    // It will be just /v1/cart, etc.
    const path = req.path;
    const targetUrl = `${WP_BASE_URL}/wp-json/wc/store${path}`;

    try {
        const headers = {
            ...req.headers,
            host: new URL(WP_BASE_URL).host
        };
        delete headers["content-length"];
        delete headers["connection"];

        const response = await axios({
            method: req.method,
            url: targetUrl,
            data: req.body,
            params: req.query,
            headers: headers
        });

        if (response.headers["nonce"]) res.set("nonce", response.headers["nonce"]);
        if (response.headers["x-wc-store-api-nonce"]) res.set("x-wc-store-api-nonce", response.headers["x-wc-store-api-nonce"]);
        if (response.headers["cart-token"]) res.set("cart-token", response.headers["cart-token"]);

        res.status(response.status).json(response.data);

    } catch (error) {
        console.error(`[Store Proxy Error] ${targetUrl}:`, error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Store API Error" });
    }
});

// ---------------------------------------------------------
// 5. DATA FETCHING ROUTES
// ---------------------------------------------------------
app.get("/api/products", async (req, res) => {
    try {
        console.log("Fetching products from:", `${WP_BASE_URL}/wp-json/wc/v3/products`);
        const response = await wc.get("/products");
        res.json(response.data);
    } catch (error) {
        console.error("[Products Error]", error.response?.data || error.message);
        // Pass the actual error from WP back to frontend for debugging
        res.status(error.response?.status || 500).json(error.response?.data || { error: "Failed to fetch products" });
    }
});

app.get("/api/products/:id", async (req, res) => {
    try {
        const response = await wc.get(`/products/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
