import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowRight, Zap } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue flex items-center justify-center px-4 relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-main relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    {/* Animated 404 Visual */}
                    <div className="relative inline-block">
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 0.95, 1]
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-slate-100 dark:text-white/5 select-none"
                        >
                            404
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-solarGreen/10 rounded-3xl flex items-center justify-center border border-solarGreen/20 backdrop-blur-xl shadow-2xl">
                                <Zap className="w-12 h-12 text-solarGreen animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-xl mx-auto space-y-6">
                        <h1 className="text-premium-h2 tracking-tighter">
                            Energy <span className="text-solarGreen">Diversion</span> Detected
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            The page you are looking for has been decommissioned or moved to a different grid.
                            Let's get you back on the right track.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                        <Link to="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-solarGreen text-solarBlue rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-solarGreen/20 flex items-center gap-3"
                            >
                                <Home className="w-4 h-4" />
                                Return Home
                            </motion.button>
                        </Link>
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl flex items-center gap-3"
                            >
                                Explore Products
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
        </div>
    );
}
