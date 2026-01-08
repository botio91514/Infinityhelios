import axios from "axios";
import API_BASE_URL from "./config";

export const sendContactForm = async (data) => {
    try {
        const formData = new FormData();
        formData.append('action', 'infinity_contact_form');
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone || '');
        formData.append('subject', data.subject || '');
        formData.append('message', data.message);

        // Direct call to WordPress (User Instruction)
        // Let Axios handle the Content-Type boundary automatically
        const response = await axios.post(
            'https://admin.infinityhelios.com/wp-admin/admin-ajax.php',
            formData
        );
        return response.data;
    } catch (error) {
        console.error("Error sending contact form:", error);
        throw error;
    }
};
