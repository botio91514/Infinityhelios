import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, AlertCircle, CheckCircle2, ShieldCheck, ArrowLeft, Loader } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../api/config";
import SEO from "../components/SEO";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: "", message: "" });

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
            setStatus({ type: "success", message: response.data.message });
            setEmail("");
        } catch (error) {
            setStatus({ type: "error", message: "Failed to process request. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center bg-white dark:bg-solarBlue relative overflow-hidden">
            <SEO
                title="Reset Password | Infinity Helios"
                description="Recover access to your Infinity Helios account."
            />
            {/* Cinematic Background */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-white dark:bg-slate-950/40 backdrop-blur-3xl rounded-[30px] p-6 md:p-10 border border-slate-200 dark:border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-solarGreen to-transparent opacity-20" />

                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-solarGreen/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-solarGreen/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                            <ShieldCheck className="w-6 h-6 text-solarGreen" />
                        </div>
                        <h1 className="text-3xl font-black mb-3 tracking-tighter text-slate-900 dark:text-white">
                            Reset <span className="text-solarGreen">Password</span>
                        </h1>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold leading-relaxed px-4">
                            Enter your email to receive recovery instructions.
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, mb: 0 }}
                                animate={{ opacity: 1, height: "auto", mb: 24 }}
                                exit={{ opacity: 0, height: 0, mb: 0 }}
                                className={`p-4 rounded-xl border flex items-start gap-3 text-[10px] font-black uppercase tracking-widest ${status.type === 'success'
                                        ? 'bg-green-500/5 border-green-500/20 text-green-600 dark:text-green-400'
                                        : 'bg-red-500/5 border-red-500/20 text-red-500'
                                    }`}
                            >
                                {status.type === 'success' ? <CheckCircle2 className="w-4 h-4 mt-0.5" /> : <AlertCircle className="w-4 h-4 mt-0.5" />}
                                <div className="leading-relaxed">{status.message}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 ml-3">
                                <Mail className="w-3 h-3" /> Registered Email
                            </label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-3.5 text-sm font-bold focus:outline-none focus:border-solarGreen focus:bg-white dark:focus:bg-white/10 transition-all shadow-inner placeholder:opacity-40"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group w-full flex items-center justify-between pl-6 pr-3 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:grayscale transition-all relative overflow-hidden"
                        >
                            <span className="relative z-10">{isSubmitting ? "Processing..." : "Send Reset Link"}</span>
                            <div className="relative z-10 w-10 h-10 bg-white/20 dark:bg-black/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                {isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                            </div>
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-solarGreen transition-colors">
                            <ArrowLeft className="w-3 h-3" />
                            Return to Login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
