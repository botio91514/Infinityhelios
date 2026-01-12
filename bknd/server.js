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

        // Append phone to message to ensure it's captured even if 'your-phone' field is missing in WP
        const finalMessage = phone ? `${message}\n\nPhone: ${phone}` : message;
        form.append('your-message', finalMessage);

        // Try sending phone as a separate field too (standard CF7 often ignores unknown fields)
        if (phone) form.append('your-phone', phone);

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
                cf7_status: response.data.status, // vital for debugging (e.g. 'spam', 'validation_failed')
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

// ---------------------------------------------------------
// 6. USER DATA ROUTES (Dashboard)
// ---------------------------------------------------------
app.get("/api/user/profile", async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ error: "Email is required" });

        const response = await wc.get(`/customers`, {
            params: {
                email: email,
                role: 'all' // CRITICAL FIX: Include Admins and other roles, not just 'customer'
            }
        });

        if (response.data && response.data.length > 0) {
            res.json(response.data[0]);
        } else {
            console.warn(`[Profile Warning] User not found for email: ${email}`);
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("[Profile Error]", error.message);
        // Log full error for debugging in production
        if (error.response) {
            console.error("WC Response:", error.response.data);
        }
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

app.get("/api/user/orders", async (req, res) => {
    try {
        const { customer_id, email } = req.query;
        if (!customer_id && !email) return res.status(400).json({ error: "Customer ID or Email is required" });

        // Dual Strategy: Fetch by ID AND Fetch by Email (to catch guest orders)
        const requests = [];

        if (customer_id) {
            requests.push(wc.get(`/orders`, { params: { customer: customer_id, per_page: 20, _fields: "id,status,total,currency_symbol,date_created" } }));
        }

        if (email) {
            requests.push(wc.get(`/orders`, { params: { search: email, per_page: 20, _fields: "id,status,total,currency_symbol,date_created" } }));
        }

        const responses = await Promise.all(requests);

        // Merge arrays
        let allOrders = [];
        responses.forEach(r => {
            if (r.data) allOrders = [...allOrders, ...r.data];
        });

        // Deduplicate by ID
        const uniqueOrders = Array.from(new Map(allOrders.map(item => [item.id, item])).values());

        // Filter out Trash and Auto-drafts
        const validOrders = uniqueOrders.filter(order => order.status !== 'trash' && order.status !== 'auto-draft');

        // Sort by date (newest first)
        validOrders.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

        res.json(validOrders);
    } catch (error) {
        console.error("[Orders Error]", error.message);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

app.get("/api/user/order/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await wc.get(`/orders/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error("[Order Error]", error.message);
        res.status(500).json({ error: "Failed to fetch order" });
    }
});

app.put("/api/user/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await wc.put(`/customers/${id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("[Update Error]", error.message);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

// ---------------------------------------------------------
// 7. PUBLIC TOOLS (Tracking & Auth)
// ---------------------------------------------------------
app.post("/api/track-order", async (req, res) => {
    try {
        const { order_id, email } = req.body;

        // Fetch order (admin privileges via wc instance)
        const response = await wc.get(`orders/${order_id}`);
        const order = response.data;

        if (!order) return res.status(404).json({ error: "Order not found" });

        // precise email check (case insensitive)
        if (order.billing.email.toLowerCase() === email.toLowerCase()) {
            res.json(order);
        } else {
            res.status(403).json({ error: "Email address does not match order records" });
        }
    } catch (error) {
        if (error.response?.status === 404) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(500).json({ error: "Tracking failed. Please check the Order ID." });
    }
});

app.post("/api/auth/forgot-password", async (req, res) => {
    // Simulation for Headless (Requires WP Plugin for real email)
    const { email } = req.body;
    console.log(`[Forgot Password] Reset requested for: ${email}`);
    res.json({ success: true, message: "If an account exists, a reset link has been sent." });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
