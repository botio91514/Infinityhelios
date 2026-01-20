import axios from "axios";
import API_BASE_URL from "./config";

export const getProfile = async (email) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
            params: { email }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getOrders = async (customerId, email) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/orders`, {
            params: {
                customer_id: customerId,
                email: email
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (id, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/user/update/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const cancelOrder = async (orderId, email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/order/cancel`, {
            order_id: orderId,
            email: email
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
