const API_BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://infinity-helios-backend.onrender.com";

export default API_BASE_URL;
