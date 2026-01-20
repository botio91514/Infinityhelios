import { storeApi } from "./storeApi";
import API_BASE_URL from "./config";
import axios from "axios";

// Store nonces and tokens in localStorage for persistence across reloads/logins
const getSavedNonce = () => localStorage.getItem("wc_nonce");
const getSavedCartToken = () => localStorage.getItem("wc_cart_token");

const saveNonce = (nonce) => {
    if (nonce) localStorage.setItem("wc_nonce", nonce);
};
const saveCartToken = (token) => {
    if (token) localStorage.setItem("wc_cart_token", token);
};

// Request Interceptor: Attach the Nonce and Token to every request
storeApi.interceptors.request.use((config) => {
    const nonce = getSavedNonce();
    const cartToken = getSavedCartToken();

    if (nonce) {
        config.headers["Nonce"] = nonce;
        config.headers["X-WC-Store-API-Nonce"] = nonce;
    }
    if (cartToken) {
        config.headers["Cart-Token"] = cartToken;
    }
    return config;
});

// Response Interceptor: Capture the Security Nonce and Cart-Token from every response
storeApi.interceptors.response.use((response) => {
    const nonce = response.headers["nonce"] || response.headers["x-wc-store-api-nonce"];
    const cartToken = response.headers["cart-token"];

    if (nonce) saveNonce(nonce);
    if (cartToken) saveCartToken(cartToken);

    return response;
});

// GET CART
export const getCart = async (config = {}) => {
    // Add cache buster to prevent stale "empty" responses
    const res = await storeApi.get(`/v1/cart?cb=${Date.now()}`, config);
    return res.data;
};

// ADD TO CART
export const addToCart = async (productId, quantity = 1) => {
    const res = await storeApi.post("/v1/cart/add-item", {
        id: productId,
        quantity,
    });
    return res.data;
};

// REMOVE ITEM
export const removeFromCart = async (key) => {
    const res = await storeApi.post("/v1/cart/remove-item", {
        key,
    });
    return res.data;
};

// UPDATE QUANTITY
export const updateCartItem = async (key, quantity) => {
    const res = await storeApi.post("/v1/cart/update-item", {
        key,
        quantity,
    });
    return res.data;
};

export const clearCartSession = () => {
    localStorage.removeItem("wc_nonce");
    localStorage.removeItem("wc_cart_token");
};

// CHECKOUT
export const processCheckout = async (billingData, paymentMethod = "cod", paymentData = []) => {
    // Separate email from shipping address (Store API validates schema strictly)
    const { email, ...shippingData } = billingData;

    const payload = {
        billing_address: billingData,
        shipping_address: shippingData,
        payment_method: paymentMethod,
        payment_data: paymentData
    };

    const res = await storeApi.post("/v1/checkout", payload);
    return res.data;
};

// CREATE PAYMENT INTENT (For Stripe)
export const createPaymentIntent = async () => {
    try {
        const cartToken = getSavedCartToken();
        // We hit our Node Proxy directly, passing the cart token
        const res = await axios.post(`${API_BASE_URL}/api/create-payment-intent`, {}, {
            headers: {
                "Cart-Token": cartToken
            },
            withCredentials: true
        });
        return res.data;
    } catch (e) {
        console.warn("Payment intent creation failed", e);
        return null;
    }
};

// CLEAR BACKEND CART
export const clearBackendCart = async () => {
    try {
        await storeApi.delete("/v1/cart/items");
    } catch (e) {
        console.warn("Failed to clear backend cart", e);
    }
    // Also clear tokens to be safe
    clearCartSession();
};

// PLACE SECURE ORDER (Post-Payment)
export const placeSecureOrder = async (billingData, paymentIntentId) => {
    const { email, ...shippingData } = billingData;
    const cartToken = getSavedCartToken();

    const res = await axios.post(`${API_BASE_URL}/api/place-secure-order`, {
        payment_intent_id: paymentIntentId,
        billing_data: billingData,
        shipping_data: shippingData
    }, {
        headers: {
            "Cart-Token": cartToken
        },
        withCredentials: true
    });

    // Clear the cart items on the server
    await clearBackendCart();

    return res.data;
};

// PLACE BANK TRANSFER ORDER
export const placeBankTransferOrder = async (billingData) => {
    const { email, ...shippingData } = billingData;
    const cartToken = getSavedCartToken();

    const res = await axios.post(`${API_BASE_URL}/api/place-bank-transfer-order`, {
        billing_data: billingData,
        shipping_data: shippingData
    }, {
        headers: {
            "Cart-Token": cartToken
        },
        withCredentials: true
    });

    // Clear the cart items on the server
    await clearBackendCart();

    return res.data; // Returns { order, instructions }
};
