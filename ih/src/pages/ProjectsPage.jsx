import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Zap, Calendar, Filter } from "lucide-react";

// Project Data
const projectsData = [
    {
        id: 1,
        title: "1.2MW Industrial Rooftop",
        location: "Ahmedabad, Gujarat",
        category: "Industrial",
        image: "/projects/project1.jpg",
        capacity: "1.2 MW",
        year: "2023",
        description: "Large-scale industrial solar installation powering a major textile manufacturing unit, reducing carbon footprint by 40%."
    },
    {
        id: 2,
        title: "Green Valley Residential Complex",
        location: "Pune, Maharashtra",
        category: "Residential",
        image: "/projects/project2.jpg",
        capacity: "450 kW",
        year: "2022",
        description: "Complete rooftop solution for a 500-unit residential society, creating a self-sustaining green community."
    },
    {
        id: 3,
        title: "Agro-Solar Hybrid Farm",
        location: "Jodhpur, Rajasthan",
        category: "Agricultural",
        image: "/projects/project3.jpg",
        capacity: "2.5 MW",
        year: "2023",
        description: "Innovative dual-use solar installation allowing farming beneath panels, optimizing land use efficiency."
    },
    {
        id: 4,
        title: "Educational Institute Campus",
        location: "Bangalore, Karnataka",
        category: "Commercial",
        image: "/projects/project1.jpg",
        capacity: "800 kW",
        year: "2021",
        description: "A comprehensive solar grid for a university campus, including solar carports and rooftop panels."
    },
    {
        id: 5,
        title: "Tech Park Carport",
        location: "Hyderabad, Telangana",
        category: "Commercial",
        image: "/projects/project2.jpg",
        capacity: "1.5 MW",
        year: "2023",
        description: "Solar EV charging carport structure serving a major IT park, combining shade and power generation."
    },
    {
        id: 6,
        title: "Rural Electrification Project",
        location: "Kutch, Gujarat",
        category: "Government",
        image: "/projects/project3.jpg",
        capacity: "3.0 MW",
        year: "2020",
        description: "Government-backed initiative to provide 24/7 renewable power to 15 remote villages."
    }
];

const ScrollReveal = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.21, 1, 0.44, 1] }}
    >
        {children}
    </motion.div>
);

export default function ProjectsPage() {
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Industrial", "Residential", "Commercial", "Agricultural", "Government"];

    const filteredProjects = useMemo(() => {
        if (filter === "All") return projectsData;
        return projectsData.filter(p => p.category === filter);
    }, [filter]);

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue page-pt pb-24 transition-colors duration-300 relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Header Section */}
            <section className="relative mb-20">
                <div className="container-main relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-solarGreen/10 text-solarGreen text-sm font-bold tracking-widest uppercase mb-6">
                            Our Portfolio
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-premium-h1 mb-8"
                    >
                        Empowering the World <br />
                        <span className="text-solarGreen">One Project</span> at a Time
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light"
                    >
                        From residential rooftops to massive industrial solar parks, explore how we are shaping a sustainable future across the nation.
                    </motion.p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="mb-16">
                <div className="container-main">
                    <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-xl p-3 rounded-[30px] border border-slate-200 dark:border-white/10 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto shadow-2xl shadow-black/5">
                        {categories.map((cat, idx) => (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-3 rounded-2xl font-bold transition-all duration-500 whitespace-nowrap ${filter === cat
                                    ? "bg-solarGreen text-solarBlue shadow-lg shadow-solarGreen/20 scale-105"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-solarGreen"
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-32">
                <div className="container-main">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    key={project.id}
                                    className="group relative flex flex-col h-full"
                                >
                                    {/* Card Container */}
                                    <div className="bg-white dark:bg-white/5 rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl group-hover:shadow-2xl group-hover:border-solarGreen/30 transition-all duration-500 flex flex-col h-full">
                                        {/* Image Header */}
                                        <div className="relative h-72 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            />
                                            <div className="absolute top-6 left-6 z-20">
                                                <span className="px-4 py-1.5 bg-solarGreen text-solarBlue text-xs font-black rounded-full uppercase tracking-widest shadow-lg">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-6 left-6 right-6 z-20">
                                                <h3 className="text-2xl font-black text-white group-hover:text-solarGreen transition-colors duration-300">
                                                    {project.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content Body */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6 gap-2">
                                                <MapPin className="w-4 h-4 text-solarGreen" />
                                                {project.location}
                                            </div>

                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                                                {project.description}
                                            </p>

                                            {/* Stats Footer */}
                                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-white/10">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1 flex items-center gap-1">
                                                        <Zap className="w-3 h-3 text-solarGreen" /> Capacity
                                                    </span>
                                                    <span className="text-lg font-black text-slate-900 dark:text-white">{project.capacity}</span>
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1 flex items-center gap-1 justify-end">
                                                        <Calendar className="w-3 h-3 text-solarGreen" /> Year
                                                    </span>
                                                    <span className="text-lg font-black text-slate-900 dark:text-white">{project.year}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-32"
                        >
                            <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Filter className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No projects found</h3>
                            <p className="text-slate-500 dark:text-slate-400">Try selecting a different category.</p>
                            <button
                                onClick={() => setFilter("All")}
                                className="mt-8 text-solarGreen font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Consultation CTA */}
            <ScrollReveal>
                <div className="container-main">
                    <div className="relative rounded-[60px] overflow-hidden bg-slate-950 p-12 md:p-20 text-center shadow-3xl">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-solarGreen/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black text-white">
                                Ready for your own <br />
                                <span className="text-solarGreen text-glow">Solar Success Story?</span>
                            </h2>
                            <p className="text-white/70 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                                Join the hundreds of satisfied clients who have switched to clean,
                                sustainable energy with our expert engineering solutions.
                            </p>
                            <div className="pt-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-solarGreen hover:bg-solarGreen/90 text-solarBlue font-black rounded-full transition-all duration-300 shadow-xl shadow-solarGreen/20 transform hover:scale-105 active:scale-95"
                                >
                                    Get a Free Consultation <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}

