import axios from "axios";
import API_BASE_URL from "./config";

export const getProducts = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/products`);
    return res.data;
};

export const getProductById = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
    return res.data;
};

export const getOrderById = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/api/user/order/${id}`);
    return res.data;
};
