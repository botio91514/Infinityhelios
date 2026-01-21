import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if consent has already been given
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Delay slightly for smoother UX entrance
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem("cookie-consent", "all");
        setIsVisible(false);
        // Here you would trigger analytics initialization if added later
    };

    const handleEssentialOnly = () => {
        localStorage.setItem("cookie-consent", "essential");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg">
                                    <Cookie className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    We use cookies
                                </h3>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                                We use essential cookies and similar technologies to operate this website and process payments securely.
                                Third-party services such as Stripe may set cookies for fraud prevention and payment processing.
                                You can accept all cookies or choose essential cookies only.
                                <br className="hidden md:block" />
                                <Link to="/legal" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline mt-1 inline-block">
                                    Learn more about our Privacy Policy
                                </Link>
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 min-w-[300px]">
                            <button
                                onClick={handleEssentialOnly}
                                className="px-6 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm uppercase tracking-wide"
                            >
                                Essential Only
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-600/20 text-sm uppercase tracking-wide flex items-center justify-center gap-2"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                Accept All
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
