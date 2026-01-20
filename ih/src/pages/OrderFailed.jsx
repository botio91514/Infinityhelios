import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    XCircle,
    RotateCcw,
    AlertCircle,
    ShieldAlert,
    HelpCircle,
    ArrowLeft
} from "lucide-react";

const OrderFailed = () => {
    const location = useLocation();
    const errorDetails = location.state?.error || "Payment processing failed. Please try again.";

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-28 pb-12 relative overflow-hidden flex items-center justify-center">
            {/* Cinematic Background Elements (Red/Orange Theme) */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-main relative z-10 w-full px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <div className="mb-8 relative inline-block">
                        {/* Shockwave Rings (Red) */}
                        <motion.div
                            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                            className="absolute inset-0 bg-red-500 rounded-full z-0"
                        />
                        <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                            className="w-24 h-24 bg-red-500 rounded-[30px] flex items-center justify-center mx-auto shadow-[0_20px_60px_rgba(239,68,68,0.4)] relative z-10"
                        >
                            <XCircle className="w-12 h-12 text-white" />
                        </motion.div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                            Payment <span className="text-red-500">Failed</span>
                        </h1>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            We couldn't process your payment. Don't worry, you haven't been charged.
                        </p>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/10 backdrop-blur-xl rounded-[24px] p-6 border border-red-200 dark:border-red-500/20 mb-10 text-left">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-xl text-red-500 shrink-0">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wide text-red-600 dark:text-red-400 mb-1">
                                    Error Details
                                </h3>
                                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {errorDetails}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/checkout"
                            className="group w-full sm:w-auto px-8 py-5 bg-red-500 text-white rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-red-500/20 hover:bg-red-600 hover:scale-[1.02] active:scale-95 transition-all relative overflow-hidden flex items-center justify-center gap-3"
                        >
                            <span className="relative z-10">Try Again</span>
                            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        </Link>

                        <Link
                            to="/contact"
                            className="w-full sm:w-auto px-8 py-5 bg-white border border-slate-200 text-slate-600 rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-sm hover:shadow-md hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <HelpCircle className="w-4 h-4" /> Report Issue
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderFailed;
