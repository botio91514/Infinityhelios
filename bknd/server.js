import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["nonce", "cart-token", "Nonce", "Cart-Token", "X-WC-Store-API-Nonce"]
}));
app.use(express.json());

// REGISTRATION PROXY: Create a new Customer in WooCommerce
app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;
        console.log(`[Auth] Registration attempt for: ${email}`);

        // Create the customer in WooCommerce using our Secret Keys
        const response = await axios.post(`${process.env.WC_BASE_URL}/wp-json/wc/v3/customers`, {
            email,
            password,
            first_name,
            last_name,
            username: email.split('@')[0] // Use email prefix as username
        }, {
            params: {
                consumer_key: process.env.WC_CONSUMER_KEY,
                consumer_secret: process.env.WC_CONSUMER_SECRET
            }
        });

        res.json({ success: true, user: response.data });
    } catch (error) {
        console.error("[Registration Error]", error.response?.data || error.message);
        const errorMsg = error.response?.data?.message || "Registration failed. This email might already be in use.";
        res.status(error.response?.status || 500).json({ message: errorMsg });
    }
});

// AUTH PROXY: Real WordPress JWT Authentication
app.post("/api/auth/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`[Auth] Login attempt for: ${username}`);

        const response = await axios.post(`${process.env.WC_BASE_URL}/wp-json/jwt-auth/v1/token`, {
            username,
            password
        });

        // If successful, WordPress returns a token and user details
        res.json(response.data);
    } catch (error) {
        console.error("[Auth Error]", error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { message: "Auth failed" });
    }
});

// Proxy for Store API (Generic)
app.all(/^\/api\/store\/.*/, async (req, res) => {
    try {
        const path = req.path.replace("/api/store", "");
        const url = `${process.env.WC_BASE_URL}/wp-json/wc/store${path}`;

        console.log(`[Proxy] Incoming: ${req.path} -> Target: ${url}`);

        const headers = {
            "host": new URL(process.env.WC_BASE_URL).host
        };

        // Capture incoming Nonce/Token from frontend
        const nonce = req.headers["nonce"] || req.headers["Nonce"] || req.headers["x-wc-store-api-nonce"];
        const cartToken = req.headers["cart-token"] || req.headers["Cart-Token"];
        const cookies = req.headers["cookie"];

        if (nonce) {
            headers["nonce"] = nonce;
            headers["X-WC-Store-API-Nonce"] = nonce;
        }
        if (cartToken) headers["cart-token"] = cartToken;
        if (cookies) headers["cookie"] = cookies;
        if (req.headers["content-type"]) headers["content-type"] = req.headers["content-type"];
        if (req.headers["authorization"]) headers["authorization"] = req.headers["authorization"];

        console.log(`[Proxy] Forwarding headers: Nonce=${!!nonce}, Token=${!!cartToken}, Auth=${!!req.headers["authorization"]}`);

        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            params: req.query,
            headers: headers,
            withCredentials: true
        });

        const respNonce = response.headers["nonce"] || response.headers["x-wc-store-api-nonce"];
        console.log(`[Proxy Response] ${response.status} - Nonce in response: ${!!respNonce}`);

        // Forward headers/cookies back to the frontend
        if (response.headers["set-cookie"]) res.setHeader("set-cookie", response.headers["set-cookie"]);
        if (respNonce) res.setHeader("nonce", respNonce);
        if (response.headers["cart-token"]) res.setHeader("cart-token", response.headers["cart-token"]);

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(`[Proxy Error] ${error.response?.status || 'No Status'} - ${req.path}`);
        const errorData = error.response?.data || error.message;
        console.error("Store Proxy Error Details:", JSON.stringify(errorData, null, 2));
        res.status(error.response?.status || 500).json(errorData);
    }
});

const wc = axios.create({
    baseURL: `${process.env.WC_BASE_URL}/wp-json/wc/v3`,
    auth: {
        username: process.env.WC_CONSUMER_KEY,
        password: process.env.WC_CONSUMER_SECRET,
    },
});

// PRODUCTS API
app.get("/api/products", async (req, res) => {
    try {
        const response = await wc.get("/products");
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// GET USER PROFILE (BILLING DETAILS)
app.get("/api/user/profile", async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) return res.status(400).json({ message: "Email required" });

        // Search for customer by email using Secret Keys
        const response = await wc.get("/customers", {
            params: { email }
        });

        if (response.data && response.data.length > 0) {
            res.json(response.data[0]); // Return the first found customer
        } else {
            res.status(404).json({ message: "User profile not found" });
        }
    } catch (error) {
        console.error("[Profile Fetch Error]", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to fetch profile" });
    }
});

// UPDATE USER PROFILE
app.post("/api/user/profile", async (req, res) => {
    try {
        const { id, billing, shipping } = req.body;
        if (!id) return res.status(400).json({ message: "User ID required" });

        const response = await wc.put(`/customers/${id}`, {
            billing,
            shipping
        });

        res.json(response.data);
    } catch (error) {
        console.error("[Profile Update Error]", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to update profile" });
    }
});

// GET USER ORDERS
app.get("/api/user/orders", async (req, res) => {
    try {
        const { customer_id } = req.query;
        if (!customer_id) return res.status(400).json({ message: "Customer ID required" });

        const response = await wc.get("/orders", {
            params: {
                customer: customer_id,
                per_page: 20,
                orderby: 'date',
                order: 'desc'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("[Orders Fetch Error]", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
});

// GET SINGLE ORDER
app.get("/api/user/order/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await wc.get(`/orders/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error("[Single Order Fetch Error]", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to fetch order" });
    }
});

// SINGLE PRODUCT API
app.get("/api/products/:id", async (req, res) => {
    try {
        const response = await wc.get(`/products/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch product" });
    }
});

// CONTACT FORM 7 PROXY
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, phone, subject, message, formId } = req.body;

        // CF7 expects FormData (multipart/form-data) but the REST API also accepts application/x-www-form-urlencoded
        // We'll use a URLSearchParams or just pass it if the WP endpoint accepts JSON (some versions/plugins do)
        // Standard CF7 REST API usually wants multipart/form-data.

        const cf7Endpoint = `${process.env.WC_BASE_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

        console.log(`[CF7 Proxy] Forwarding to: ${cf7Endpoint}`);

        const formData = new FormData();
        formData.append("your-name", name);
        formData.append("your-email", email);
        formData.append("your-subject", subject || "General Inquiry");
        formData.append("your-message", `${message || ""}\n\nPhone: ${phone || "Not provided"}`);

        // CF7 requires a unit tag to process the request via REST API
        formData.append("_wpcf7_unit_tag", `wpcf7-f${formId}-p1-o1`);

        const response = await axios.post(cf7Endpoint, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log(`[CF7 Success] Status: ${response.data.status}, Message: ${response.data.message}`);
        res.json(response.data);
    } catch (error) {
        console.error("[CF7 Error]", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: "Failed to send message. Please try again later.",
            details: error.response?.data
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Backend running on port ${process.env.PORT}`);
});
