import { createContext, useContext, useState, useEffect } from "react";
import { clearCartSession } from "../api/cart";
import API_BASE_URL from "../api/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved user in localStorage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            // Call our Node.js backend proxy
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                let msg = data.message || "Invalid credentials";
                // Strip HTML tags from WordPress response
                msg = msg.replace(/<\/?[^>]+(>|$)/g, "");

                // Simplify the "incorrect password" message
                if (msg.includes("password you entered") && msg.includes("is incorrect")) {
                    msg = "Incorrect password. Please try again.";
                }

                throw new Error(msg);
            }

            // Real user data from WordPress JWT plugin
            const realUser = {
                name: data.user_display_name || data.user_nicename,
                email: data.user_email,
                token: data.token
            };

            setUser(realUser);
            localStorage.setItem("user", JSON.stringify(realUser));
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: error.message || "Invalid credentials" };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        clearCartSession();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading: loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
