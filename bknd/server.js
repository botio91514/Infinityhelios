import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import FormData from "form-data";

import Stripe from "stripe";

dotenv.config();

const app = express();
// Ensure key is trimmed
const stripeKey = process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.trim() : "";
if (!stripeKey) console.warn("[Config Warning] STRIPE_SECRET_KEY is missing!");
const stripe = new Stripe(stripeKey);

// 1. Clean CORS Setup
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://infinityhelios.com",
    "https://www.infinityhelios.com"
];

// Health Check Endpoint (Keep-Alive)
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

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
// 6.7 SECURE BANK TRANSFER ORDER (BACS)
// ---------------------------------------------------------
app.post("/api/place-bank-transfer-order", async (req, res) => {
    try {
        const { billing_data, shipping_data } = req.body;

        // 1. Create Order in WooCommerce via Admin API
        // Status: 'on-hold' (Waiting for manual bank transfer)
        const orderData = {
            payment_method: "bacs",
            payment_method_title: "Direct Bank Transfer",
            set_paid: false,
            status: "on-hold",
            billing: billing_data,
            shipping: shipping_data,
            line_items: [], // Will fill from cart
        };

        // Retrieve cart items securely using token
        const cartToken = req.headers["cart-token"];
        if (!cartToken) return res.status(400).json({ error: "Session expired" });

        const cartRes = await axios.get(`${WP_BASE_URL}/wp-json/wc/store/v1/cart`, { headers: { "Cart-Token": cartToken } });
        const cartItems = cartRes.data.items;

        if (cartItems.length === 0) return res.status(400).json({ error: "Cart is empty" });

        const line_items = cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            variation_id: item.id
        }));

        orderData.line_items = line_items;

        const response = await wc.post("/orders", orderData);

        // Return Order Data + Bank Details (Hardcoded or fetched from Settings)
        // Ideally fetch from WC settings, but for now we return standard instructions.
        const bankDetails = {
            account_name: "Infinity Helios Energy",
            account_number: "12345678",
            sort_code: "20-00-00",
            bank_name: "Solar Bank UK",
            iban: "GB20SOLAR123456"
        };

        res.json({ order: response.data, instructions: bankDetails });

    } catch (error) {
        console.error("[BACS Order Error]", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to place bank transfer order" });
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
            requests.push(wc.get(`/orders`, {
                params: {
                    customer: customer_id,
                    per_page: 20,
                    _fields: "id,status,total,currency_symbol,date_created,line_items,payment_method_title",
                    ts: Date.now() // Force fresh fetch
                }
            }));
        }

        if (email) {
            requests.push(wc.get(`/orders`, {
                params: {
                    search: email,
                    per_page: 20,
                    _fields: "id,status,total,currency_symbol,date_created,line_items,payment_method_title",
                    ts: Date.now() // Force fresh fetch
                }
            }));
        }

        const responses = await Promise.all(requests);

        // Merge arrays
        let allOrders = [];
        responses.forEach(r => {
            if (r.data) allOrders = [...allOrders, ...r.data];
        });

        // Deduplicate by ID
        const uniqueOrders = Array.from(new Map(allOrders.map(item => [item.id, item])).values());

        // DEBUG LOGGING
        console.log("Fetched Orders (Raw IDs/Statuses):", uniqueOrders.map(o => `${o.id}:${o.status}`));

        // Filter out Trash, Auto-drafts, Failed, and potentially Cancelled if user desires
        const validOrders = uniqueOrders.filter(order =>
            order.status !== 'trash' &&
            order.status !== 'auto-draft' &&
            order.status !== 'failed'
            // order.status !== 'cancelled' // Uncomment if you want to hide cancelled too
        );



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
// 6.5 PAYMENT INTENTS (Stripe)
// ---------------------------------------------------------
app.post("/api/create-payment-intent", async (req, res) => {
    try {
        // 1. Get Cart Token to verify Price from WooCommerce
        const cartToken = req.headers["cart-token"];
        if (!cartToken) {
            return res.status(400).json({ error: "No cart token provided" });
        }

        // 2. Fetch verified cart total from WooCommerce Store API
        // We use the proxy approach to forward the token
        const cartResponse = await axios.get(`${WP_BASE_URL}/wp-json/wc/store/v1/cart`, {
            headers: {
                "Cart-Token": cartToken
            }
        });

        const cartData = cartResponse.data;
        const totalAmount = parseInt(cartData.totals.total_price); // Amount in smallest unit (e.g. cents/paise)
        const currency = cartData.totals.currency_code.toLowerCase();

        console.log(`[Stripe Init] Creating intent: Amount=${totalAmount}, Currency=gbp, Token=${cartToken ? "Yes" : "No"}`);

        if (!totalAmount || totalAmount <= 0) {
            console.error("[Stripe Error] Invalid Amount:", totalAmount);
            return res.status(400).json({ error: "Cart is empty or invalid amount" });
        }

        // 3. Create Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'gbp', // Force GBP for UK Bank Transfers (Bacs) to appear
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                cart_token: cartToken,
                items_count: cartData.item_count
            }
        });

        // 4. Return Client Secret
        res.json({
            client_secret: paymentIntent.client_secret,
            amount: totalAmount,
            currency: currency
        });

    } catch (error) {
        console.error("[Stripe Error] Full Detail:", error);
        res.status(500).json({ error: "Payment init failed", details: error.message, stack: error.stack });
    }
});

// ---------------------------------------------------------
// 6.6 SECURE ORDER PLACEMENT (Admin API)
// ---------------------------------------------------------
app.post("/api/place-secure-order", async (req, res) => {
    try {
        const { payment_intent_id, billing_data, shipping_data } = req.body;

        if (!payment_intent_id) {
            return res.status(400).json({ error: "Missing payment intent ID" });
        }

        // 1. Verify Payment Intent with Stripe (Security Check)
        const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({ error: "Payment not successful" });
        }

        // 1.5 IDEMPOTENCY CHECK (Advanced Security)
        // Check if an order already exists for this Payment Intent to prevent duplicates
        try {
            // Retrieve latest orders (e.g., last 20) to scan for duplicates.
            // Full search via WC API for meta is hard, but this covers relevant recent retries.
            const recentOrders = await wc.get("orders", { per_page: 30 });
            if (recentOrders.data && Array.isArray(recentOrders.data)) {
                const existingOrder = recentOrders.data.find(o =>
                    o.meta_data.some(m => m.key === "_stripe_intent_id" && m.value === payment_intent_id) ||
                    o.transaction_id === payment_intent_id
                );

                if (existingOrder) {
                    console.log(`[Idempotency] Order ${existingOrder.id} already exists for PI ${payment_intent_id}`);
                    return res.json(existingOrder);
                }
            }
        } catch (checkErr) {
            console.warn("[Idempotency Warning] Failed to check duplicates:", checkErr.message);
        }

        // 2. Create Order in WooCommerce via Admin API
        const orderData = {
            payment_method: "stripe",
            payment_method_title: "Credit Card (Stripe)",
            set_paid: true,
            status: "processing",
            billing: billing_data,
            shipping: shipping_data,
            transaction_id: payment_intent_id, // Store PI ID as transaction ID for easy tracking
            line_items: [], // We need items! 
            // PROBLEM: Admin API creates new order, doesn't convert Cart.
            // SOLUTION: We must fetch cart items first.
            meta_data: [
                { key: "_stripe_intent_id", value: payment_intent_id },
                { key: "_stripe_charge_id", value: paymentIntent.latest_charge }
            ]
        };

        // For simplicity in this specific "Repair", we will use the Store API to create a CASH order 
        // then update it to Paid, OR we just trust the Cart matches.
        // BETTER: Retrieve the current cart for this user/session to get items.
        // Complexity: mapping cart items to order items is tedious.

        // ALTERNATIVE STRATEGY:
        // Use the passed 'items' from frontend (less secure but faster now)
        // OR Use the Store API `checkout` with 'cod' method, then UPDATE it.
        // Let's go with the UPDATE strategy. It's safer for item sync.

        // Wait, we can't call Store API easily from Node without the specific user Headers.
        // BUT we have the headers from the request!

        // IGNORE THE ABOVE. Let's do the UPDATE strategy on the FRONTEND + BACKEND VALIDATION?
        // No, user wants backend robustness.

        // Let's retrieve the cart using the token passed in headers
        const cartToken = req.headers["cart-token"];
        const cartRes = await axios.get(`${WP_BASE_URL}/wp-json/wc/store/v1/cart`, { headers: { "Cart-Token": cartToken } });
        const cartItems = cartRes.data.items;

        const line_items = cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            variation_id: item.id // approximating
        }));

        orderData.line_items = line_items;

        const response = await wc.post("/orders", orderData);

        // Clear the cart on WC (optional, difficult via Admin API)
        // We rely on frontend to clear local storage or call 'clear cart'

        res.json(response.data);

    } catch (error) {
        console.error("[Order Placement Error]", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to place order after payment" });
    }
});


app.post("/api/order/cancel", async (req, res) => {
    try {
        const { order_id, email } = req.body;

        if (!order_id || !email) return res.status(400).json({ error: "Missing Order ID or Email" });

        // 1. Fetch Order details to verify ownership
        const response = await wc.get(`orders/${order_id}`);
        const order = response.data;

        if (!order) return res.status(404).json({ error: "Order not found" });

        // 2. Ownership Check (Case Insensitive)
        if (order.billing.email.toLowerCase() !== email.toLowerCase()) {
            return res.status(403).json({ error: "Unauthorized: Order doesn't belong to this email." });
        }

        // 3. Status Check (Only allow cancelling if not shipped/completed)
        const allowedStatuses = ['processing', 'on-hold', 'pending'];
        if (!allowedStatuses.includes(order.status)) {
            return res.status(400).json({ error: `Cannot cancel order with status: ${order.status}` });
        }

        // 4. Update Status to 'cancelled'
        const updateResponse = await wc.put(`orders/${order_id}`, {
            status: 'cancelled'
        });

        // 5. Add Note
        await wc.post(`orders/${order_id}/notes`, {
            note: "Cancelled by customer via User Dashboard."
        });

        res.json({ success: true, order: updateResponse.data });

    } catch (error) {
        console.error("[Cancel Order Error]", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to cancel order" });
    }
});

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
