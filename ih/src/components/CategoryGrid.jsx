import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sun, Zap, Battery, Hammer, ArrowRight } from "lucide-react";

const categories = [
    {
        id: "panels",
        name: "Solar Panels",
        desc: "High-efficiency monocrystalline modules from top global brands.",
        icon: <Sun className="w-8 h-8 md:w-10 md:h-10 text-solarGreen" />,
        link: "/products?category=Solar%20Panels",
        color: "bg-blue-500/5",
        border: "border-blue-500/20"
    },
    {
        id: "inverters",
        name: "Inverters",
        desc: "Advanced string and hybrid inverters for optimal power conversion.",
        icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />,
        link: "/products?category=Inverters",
        color: "bg-yellow-500/5",
        border: "border-yellow-500/20"
    },
    {
        id: "batteries",
        name: "Battery Storage",
        desc: "Scalable energy storage solutions for homes and businesses.",
        icon: <Battery className="w-8 h-8 md:w-10 md:h-10 text-green-500" />,
        link: "/products?category=Batteries",
        color: "bg-green-500/5",
        border: "border-green-500/20"
    },
    {
        id: "mounting",
        name: "Mounting Systems",
        desc: "Robust racking and mounting hardware for any roof type.",
        icon: <Hammer className="w-8 h-8 md:w-10 md:h-10 text-slate-500" />,
        link: "/products?category=Mounting%20Gear",
        color: "bg-slate-500/5",
        border: "border-slate-500/20"
    }
];

export default function CategoryGrid() {
    return (
        <section className="py-10 bg-slate-50 dark:bg-slate-900/50">
            <div className="container-main">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-solarGreen font-bold tracking-widest uppercase text-xs mb-2 block">Our Hardware</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
                            What We <span className="text-solarGreen">Sell</span>
                        </h2>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            Browse our comprehensive catalog of solar components. Fully certified, warranty-backed, and ready to ship.
                        </p>
                    </div>
                    <Link
                        to="/products"
                        className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-solarGreen transition-colors"
                    >
                        View Full Catalog <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link to={cat.link} className="group block h-full">
                                <div className={`
                  relative h-full p-8 rounded-3xl bg-white dark:bg-slate-950 
                  border ${cat.border} hover:border-solarGreen/50
                  shadow-xl shadow-slate-200/50 dark:shadow-none
                  transition-all duration-500 hover:-translate-y-2
                  flex flex-col
                `}>
                                    <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                        {cat.icon}
                                    </div>

                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-solarGreen transition-colors">
                                        {cat.name}
                                    </h3>

                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                                        {cat.desc}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:text-solarGreen transition-colors">
                                        Shop Now <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-solarGreen transition-colors"
                    >
                        View Full Catalog <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
