import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShieldCheck, Zap, ChevronDown, ChevronUp } from "lucide-react";

// Brand Configuration
const BRANDS = [
    {
        id: "Aiko",
        name: "Aiko",
        description: "World-record efficiency modules with ABC technology.",
        color: "from-blue-600 to-indigo-600",
        image: "https://placehold.co/150x150/png?text=Aiko",
        icon: Star
    },
    {
        id: "Dmegc",
        name: "Dmegc",
        description: "Tier-1 solar manufacturing excellence since 1980.",
        color: "from-emerald-500 to-teal-500",
        image: "https://placehold.co/150x150/png?text=Dmegc",
        icon: ShieldCheck
    },
    {
        id: "Emlite",
        name: "Emlite",
        description: "Precision metering solutions for renewable energy.",
        color: "from-orange-500 to-red-500",
        image: "https://placehold.co/150x150/png?text=Emlite",
        icon: Zap
    },
    {
        id: "Enphase",
        name: "Enphase",
        description: "Leading microinverter technology for maximum yield.",
        color: "from-slate-700 to-slate-900",
        image: "https://placehold.co/150x150/png?text=Enphase",
        icon: Zap
    },
    {
        id: "Canadian Solar",
        name: "Canadian",
        description: "High-performance modules from a global tier-1 leader.",
        color: "from-red-600 to-orange-600",
        image: "https://placehold.co/150x150/png?text=Canadian",
        icon: Star
    },
    {
        id: "Longi",
        name: "Longi",
        description: "The world's most valuable solar technology company.",
        color: "from-cyan-600 to-blue-600",
        image: "https://placehold.co/150x150/png?text=Longi",
        icon: ShieldCheck
    },
    {
        id: "Growatt",
        name: "Growatt",
        description: "Smart energy solutions for residential and commercial.",
        color: "from-green-600 to-emerald-600",
        image: "https://placehold.co/150x150/png?text=Growatt",
        icon: Zap
    },
    {
        id: "GivEnergy",
        name: "GivEnergy",
        description: "Premium energy storage systems for energy independence.",
        color: "from-blue-500 to-purple-500",
        image: "https://placehold.co/150x150/png?text=GivEnergy",
        icon: Zap
    },
    {
        id: "Huawei",
        name: "Huawei",
        description: "Digital power solutions for a sustainable world.",
        color: "from-red-600 to-red-800",
        image: "https://placehold.co/150x150/png?text=Huawei",
        icon: Zap
    },
    {
        id: "Solis",
        name: "Solis",
        description: "Reliable and efficient string inverters.",
        color: "from-orange-500 to-yellow-500",
        image: "https://placehold.co/150x150/png?text=Solis",
        icon: Star
    },
    {
        id: "Fox ESS",
        name: "Fox ESS",
        description: "Advanced inverter and battery storage systems.",
        color: "from-slate-600 to-slate-800",
        image: "https://placehold.co/150x150/png?text=FoxESS",
        icon: ShieldCheck
    },
    {
        id: "K2",
        name: "K2 Systems",
        description: "Innovative mounting systems for solar technology.",
        color: "from-red-500 to-orange-500",
        image: "https://placehold.co/150x150/png?text=K2",
        icon: ShieldCheck
    }
];

export default function ShopByBrand({ onBrandSelect, limit }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Determine which brands to show
    const visibleBrands = limit && !isExpanded ? BRANDS.slice(0, limit) : BRANDS;

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-solarGreen/5 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-solarBlue/5 rounded-full blur-3xl translate-y-1/3" />
            </div>

            <div className="container-main max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-3 py-1 rounded-full bg-solarGreen/10 text-solarGreen text-xs font-bold tracking-widest uppercase mb-4"
                        >
                            Official Partners
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4"
                        >
                            Shop by <span className="text-solarGreen">Brand</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 dark:text-slate-400 text-lg"
                        >
                            We partner with the world's leading manufacturers to bring you Tier-1 reliability and performance.
                        </motion.p>
                    </div>
                </div>

                {/* Brands Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {visibleBrands.map((brand, index) => {
                            const CardContent = (
                                <div className={`group relative h-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-white/5 overflow-hidden ${onBrandSelect ? 'cursor-pointer' : ''}`}>
                                    {/* Brand Color Gradient Accent (Hidden by default, shows on hover) */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Icon / Logo Placeholder */}
                                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 transition-colors shadow-sm p-2">
                                            <img
                                                src={brand.image}
                                                alt={brand.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-white transition-colors">
                                            {brand.name}
                                        </h3>

                                        <p className="text-slate-500 dark:text-slate-400 group-hover:text-white/90 transition-colors flex-grow">
                                            {brand.description}
                                        </p>
                                    </div>
                                </div>
                            );

                            return (
                                <motion.div
                                    key={brand.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    onClick={() => onBrandSelect && onBrandSelect(brand.id)}
                                >
                                    {onBrandSelect ? (
                                        CardContent
                                    ) : (
                                        <Link to={`/products?brand=${encodeURIComponent(brand.id)}`}>
                                            {CardContent}
                                        </Link>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* View More Button (Only if limit is active) */}
                {limit && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-full font-bold text-slate-900 dark:text-white hover:border-solarGreen hover:text-solarGreen transition-all shadow-lg hover:shadow-xl"
                        >
                            {isExpanded ? (
                                <>Show Less <ChevronUp className="w-5 h-5" /></>
                            ) : (
                                <>View All Brands <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" /></>
                            )}
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}
