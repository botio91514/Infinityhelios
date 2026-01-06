import wcApi from "./woocommerce";

export async function testProducts() {
    try {
        const res = await wcApi.get("/products");
        console.log("Products:", res.data);
    } catch (err) {
        console.error("API Error:", err);
    }
}
