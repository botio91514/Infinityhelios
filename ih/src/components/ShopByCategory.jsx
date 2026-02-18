import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import commercialImg from "../assets/products/commercial.jpg";
import residentialImg from "../assets/products/residential.jpg";
import inverterImg from "../assets/products/inverter.jpg";
import kitImg from "../assets/products/kit.jpg";

const categories = [
    {
        id: 1,
        title: "Solar Panels",
        subtitle: "High-Efficiency Modules",
        img: residentialImg,
        link: "/products?category=Solar%20Panels",
        colSpan: "md:col-span-2",
    },
    {
        id: 2,
        title: "Inverters",
        subtitle: "Grid-Tie & Hybrid",
        img: inverterImg,
        link: "/products?category=Inverters",
        colSpan: "md:col-span-1",
    },
    {
        id: 3,
        title: "Batteries",
        subtitle: "Energy Storage Systems",
        img: kitImg, // Using kit image as placeholder for battery if valid, or similar
        link: "/products?category=Batteries",
        colSpan: "md:col-span-1",
    },
    {
        id: 4,
        title: "Mounting Gear",
        subtitle: "Racking & Rails",
        img: commercialImg,
        link: "/products?category=Mounting%20Gear",
        colSpan: "md:col-span-2",
    },
];

export default function ShopByCategory() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section ref={ref} className="py-10 bg-white dark:bg-solarBlue overflow-hidden">
            <div className="container-main">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-solarGreen font-bold tracking-widest uppercase text-xs mb-2 block">
                            Browse Collection
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                            Shop by <span className="text-solarGreen">Category</span>
                        </h2>
                    </div>
                    <Link
                        to="/products"
                        className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-solarGreen transition-colors"
                    >
                        View All Categories
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <Link
                            to={cat.link}
                            key={cat.id}
                            className={`relative block group overflow-hidden rounded-[30px] h-[300px] md:h-[400px] ${cat.colSpan}`}
                        >
                            {/* Background Image with Zoom Effect */}
                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={cat.img}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-8 flex items-end justify-between z-10">
                                <div>
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        {cat.subtitle}
                                    </p>
                                    <h3 className="text-white text-2xl md:text-3xl font-black leading-tight group-hover:text-solarGreen transition-colors">
                                        {cat.title}
                                    </h3>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-solarGreen group-hover:text-solarBlue group-hover:border-solarGreen transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
