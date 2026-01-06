import axios from "axios";
import API_BASE_URL from "./config";

export const sendContactForm = async (formData) => {
    try {
        // You should replace '123' with your actual CF7 Form ID from WordPress
        const formId = "87"; // Found in your URL as post=87

        const response = await axios.post(`${API_BASE_URL}/api/contact`, {
            ...formData,
            formId
        });

        return response.data;
    } catch (error) {
        console.error("Error sending contact form:", error);
        throw error;
    }
};
