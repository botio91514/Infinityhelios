import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-white/10 relative overflow-hidden"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-white/5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                                    <AlertTriangle className="w-8 h-8 text-red-500" />
                                </div>

                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">
                                    {title}
                                </h3>

                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-[80%] mb-8">
                                    {message}
                                </p>

                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={onClose}
                                        disabled={isLoading}
                                        className="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
                                    >
                                        No, Keep It
                                    </button>
                                    <button
                                        onClick={onConfirm}
                                        disabled={isLoading}
                                        className="flex-1 py-4 bg-red-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-red-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            "Yes, Cancel Order"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
