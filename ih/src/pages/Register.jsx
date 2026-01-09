import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { UserPlus, ArrowRight, Mail, Lock, User, AlertCircle, ShieldCheck, Eye, EyeOff, Loader } from "lucide-react";
import API_BASE_URL from "../api/config";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    first_name: formData.name.split(" ")[0] || "",
                    last_name: formData.name.split(" ").slice(1).join(" ") || ""
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Registration failed");

            const loginResult = await login(formData.email, formData.password);
            if (loginResult.success) {
                navigate(from, { replace: true });
            } else {
                setError("Account created, but login failed. Please login manually.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center bg-white dark:bg-solarBlue relative overflow-hidden">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-white dark:bg-slate-950/40 backdrop-blur-3xl rounded-[30px] p-6 md:p-10 border border-slate-200 dark:border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-solarGreen to-transparent opacity-20" />

                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-solarGreen/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-solarGreen/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                            <UserPlus className="w-6 h-6 text-solarGreen" />
                        </div>
                        <h1 className="text-3xl font-black mb-3 tracking-tighter text-slate-900 dark:text-white">
                            Create <span className="text-solarGreen">Account</span>
                        </h1>
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                            Join the Infinity Helios network
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-6 p-3 bg-red-500/5 border border-red-500/20 text-red-500 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-3"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-3">
                                <User className="w-3 h-3" /> Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-3.5 text-sm font-bold focus:outline-none focus:border-solarGreen focus:bg-white dark:focus:bg-white/10 transition-all shadow-inner"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-3">
                                <Mail className="w-3 h-3" /> Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-3.5 text-sm font-bold focus:outline-none focus:border-solarGreen focus:bg-white dark:focus:bg-white/10 transition-all shadow-inner"
                                placeholder="email@example.com"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1.5 relative">
                                <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-3">
                                    <Lock className="w-3 h-3" /> Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 pr-10 text-sm font-bold focus:outline-none focus:border-solarGreen focus:bg-white dark:focus:bg-white/10 transition-all shadow-inner"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-solarGreen transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1.5 relative">
                                <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-3">
                                    Confirm
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 pr-10 text-sm font-bold focus:outline-none focus:border-solarGreen focus:bg-white dark:focus:bg-white/10 transition-all shadow-inner"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-solarGreen transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group w-full flex items-center justify-between pl-6 pr-3 py-3 mt-4 bg-solarGreen text-solarBlue rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-solarGreen/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:grayscale transition-all relative overflow-hidden"
                        >
                            {!isSubmitting && (
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                            )}
                            <span className="relative z-10">{isSubmitting ? "Creating Account..." : "Register Account"}</span>
                            <div className="relative z-10 w-10 h-10 bg-solarBlue text-solarGreen rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                {isSubmitting ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowRight className="w-4 h-4" />
                                )}
                            </div>
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 text-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            Already have an account?{" "}
                            <Link to="/login" className="text-solarGreen hover:opacity-70 transition-opacity ml-2">
                                Login Now
                            </Link>
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-400/20">
                            <ShieldCheck className="w-3 h-3 text-solarGreen" /> Secure Privacy Guaranteed
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
