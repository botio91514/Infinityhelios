import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />
    };

    const bgColors = {
        success: "bg-white dark:bg-slate-900 border-emerald-500/20",
        error: "bg-white dark:bg-slate-900 border-red-500/20",
        warning: "bg-white dark:bg-slate-900 border-amber-500/20",
        info: "bg-white dark:bg-slate-900 border-blue-500/20"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed top-24 right-6 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border ${bgColors[type]} backdrop-blur-xl min-w-[300px]`}
        >
            <div className={`p-2 rounded-full ${type === 'success' ? 'bg-emerald-500/10' : type === 'error' ? 'bg-red-500/10' : type === 'warning' ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
                {icons[type]}
            </div>
            <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
                    {type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Notification'}
                </h4>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {message}
                </p>
            </div>
            <button
                onClick={onClose}
                className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
                <XCircle className="w-5 h-5" />
            </button>
        </motion.div>
    );
};

export default Toast;
