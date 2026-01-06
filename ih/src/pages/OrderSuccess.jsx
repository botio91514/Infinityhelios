import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    ArrowRight,
    Zap,
    Truck,
    ExternalLink,
    ShieldCheck,
    Package
} from "lucide-react";

const OrderSuccess = () => {
    const location = useLocation();
    const orderDetails = location.state?.order || {};

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue page-pt pb-24 relative overflow-hidden flex items-center justify-center">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-solarGreen/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-solarOrange/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-main relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <div className="mb-12 relative">
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                            className="w-24 h-24 bg-solarGreen rounded-[32px] flex items-center justify-center mx-auto shadow-[0_20px_60px_rgba(100,255,153,0.4)] relative z-10"
                        >
                            <CheckCircle2 className="w-12 h-12 text-solarBlue" />
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-solarGreen rounded-full blur-[60px] opacity-20"
                        />
                    </div>

                    <div className="space-y-4 mb-16">
                        <h1 className="text-premium-h1 tracking-tighter">
                            Order <span className="text-solarGreen">Successful</span>
                        </h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Reference Code: #{orderDetails.order_id || "772"}</p>
                    </div>

                    <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-3xl rounded-[50px] p-10 md:p-14 border border-slate-200 dark:border-white/10 shadow-3xl mb-16 relative overflow-hidden text-left group">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-solarGreen to-transparent opacity-30" />

                        <h2 className="text-xl font-black mb-12 flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/5 uppercase tracking-widest text-slate-900 dark:text-white">
                            Order Details
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-solarGreen rounded-full animate-pulse" />
                                <span className="text-[9px] opacity-30 font-black">CONFIRMED</span>
                            </div>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[
                                { label: "Order ID", value: `#${orderDetails.order_id || "PENDING"}`, icon: <Package className="w-4 h-4 text-solarGreen" /> },
                                { label: "Status", value: "Processing", icon: <Zap className="w-4 h-4 text-solarGreen" /> },
                                { label: "Payment", value: "Cash on Delivery", icon: <ShieldCheck className="w-4 h-4 text-solarGreen" /> },
                                { label: "Est. Delivery", value: "3-5 Business Days", icon: <Truck className="w-4 h-4 text-solarGreen" /> }
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-2 group-hover:translate-x-1 transition-transform duration-500">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        {item.icon} {item.label}
                                    </p>
                                    <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 text-slate-400">
                                <div className="p-3 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10">
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest">Digital Invoice</p>
                                    <p className="text-[10px] font-bold opacity-60">Sent to {orderDetails.billing?.email || "your email"}</p>
                                </div>
                            </div>
                            <Link
                                to={`/invoice/${orderDetails.order_id}`}
                                className="text-[10px] font-black text-solarGreen uppercase tracking-widest hover:opacity-70 transition-opacity"
                            >
                                View Invoice →
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/products"
                            className="group flex-1 max-w-[280px] flex items-center justify-between pl-10 pr-6 py-6 bg-solarGreen text-solarBlue rounded-[35px] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-solarGreen/20 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                            <span className="relative z-10">Continue Shopping</span>
                            <div className="relative z-10 w-12 h-12 bg-solarBlue text-solarGreen rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </Link>

                        <Link
                            to="/"
                            className="flex-1 max-w-[280px] px-10 py-6 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-400 rounded-[35px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center"
                        >
                            Return to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderSuccess;
