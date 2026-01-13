import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/ihlogo.png"; // Assuming logo exists

export default function SplashScreen({ onComplete }) {
    const [exit, setExit] = useState(false);

    useEffect(() => {
        // Start exit animation after 1.2 seconds
        const timer = setTimeout(() => {
            setExit(true);
            // Notify parent to unmount after exit animation finishes (approx 0.5s)
            setTimeout(onComplete, 1500);
        }, 1500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: exit ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden"
        >
            <div className="relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-solarGreen/20 rounded-full blur-[80px] animate-pulse" />

                <div className="relative z-10 flex flex-col items-center">
                    {/* Logo or Text Animation */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                        className="mb-8"
                    >
                        {/* Use Text instead of Image for faster visual load */}
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter text-center">
                            INFINITY <span className="text-solarGreen text-glow">HELIOS</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="h-1 bg-gradient-to-r from-transparent via-solarGreen to-transparent rounded-full"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500"
                    >
                        Energy Evolved
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
}
