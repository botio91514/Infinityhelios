import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLoader } from "../context/LoaderContext";

const GlobalLoader = () => {
    const { isLoading } = useLoader();
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        let timeout;
        if (isLoading) {
            // Only show loader if request takes longer than 200ms
            timeout = setTimeout(() => setShouldShow(true), 200);
        } else {
            setShouldShow(false);
        }
        return () => clearTimeout(timeout);
    }, [isLoading]);

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-xl"
                >
                    <div className="relative flex items-center justify-center">
                        {/* Core Sun */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-4 h-4 rounded-full bg-gradient-to-r from-solarOrange to-yellow-500 shadow-[0_0_30px_rgba(255,100,0,0.8)] z-10"
                        />

                        {/* Innermost Orbit */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute w-12 h-12 rounded-full border border-solarOrange/30 border-t-solarOrange shadow-[0_0_10px_rgba(255,100,0,0.2)]"
                        />

                        {/* Middle Orbit (Reverse) */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            className="absolute w-20 h-20 rounded-full border border-slate-400/20 dark:border-white/10 border-b-solarGreen/60"
                        />

                        {/* Outermost Pulsing Ring */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-28 h-28 rounded-full border border-slate-200/50 dark:border-white/5"
                        />

                        {/* Loading Text */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-16 text-xs font-bold tracking-[0.2em] text-slate-500 dark:text-white/50 uppercase"
                        >
                            Loading
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalLoader;
