import axios from "axios";
import API_BASE_URL from "./config";

export const sendContactForm = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/contact`, formData);
        return response.data;
    } catch (error) {
        console.error("Error sending contact form:", error);
        throw error;
    }
};
