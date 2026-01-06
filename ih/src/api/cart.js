import { storeApi } from "./storeApi";

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
export const getCart = async () => {
    const res = await storeApi.get("/v1/cart");
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
export const processCheckout = async (billingData, paymentMethod = "cod") => {
    // Separate email from shipping address (Store API validates schema strictly)
    const { email, ...shippingData } = billingData;

    const res = await storeApi.post("/v1/checkout", {
        billing_address: billingData,
        shipping_address: shippingData,
        payment_method: paymentMethod,
    });
    return res.data;
};
