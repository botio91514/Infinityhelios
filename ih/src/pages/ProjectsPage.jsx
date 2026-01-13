import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Zap, Calendar, Filter, Search } from "lucide-react";
import SEO from "../components/SEO";

// Project Data
const projectsData = [
    {
        id: 1,
        title: "1.2MW Industrial Rooftop",
        location: "Ahmedabad, Gujarat",
        category: "Industrial",
        image: "/images/projects/project1.jpg",
        capacity: "1.2 MW",
        year: "2023",
        description: "Large-scale industrial solar installation powering a major textile manufacturing unit, reducing carbon footprint by 40%."
    },
    {
        id: 2,
        title: "Green Valley Residential Complex",
        location: "Pune, Maharashtra",
        category: "Residential",
        image: "/images/projects/project2.jpg",
        capacity: "450 kW",
        year: "2022",
        description: "Complete rooftop solution for a 500-unit residential society, creating a self-sustaining green community."
    },
    {
        id: 3,
        title: "Agro-Solar Hybrid Farm",
        location: "Jodhpur, Rajasthan",
        category: "Agricultural",
        image: "/images/projects/project3.jpg",
        capacity: "2.5 MW",
        year: "2023",
        description: "Innovative dual-use solar installation allowing farming beneath panels, optimizing land use efficiency."
    },
    {
        id: 4,
        title: "Educational Institute Campus",
        location: "Bangalore, Karnataka",
        category: "Commercial",
        image: "/images/projects/project1.jpg",
        capacity: "800 kW",
        year: "2021",
        description: "A comprehensive solar grid for a university campus, including solar carports and rooftop panels."
    },
    {
        id: 5,
        title: "Tech Park Carport",
        location: "Hyderabad, Telangana",
        category: "Commercial",
        image: "/images/projects/project2.jpg",
        capacity: "1.5 MW",
        year: "2023",
        description: "Solar EV charging carport structure serving a major IT park, combining shade and power generation."
    },
    {
        id: 6,
        title: "Rural Electrification Project",
        location: "Kutch, Gujarat",
        category: "Government",
        image: "/images/projects/project3.jpg",
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
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["All", "Industrial", "Residential", "Commercial", "Agricultural", "Government"];

    const filteredProjects = useMemo(() => {
        let projects = projectsData;

        if (filter !== "All") {
            projects = projects.filter(p => p.category === filter);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            projects = projects.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.location.toLowerCase().includes(query)
            );
        }

        return projects;
    }, [filter, searchQuery]);

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-20 md:pt-28 pb-12 transition-colors duration-300 relative">
            <SEO
                title="Our Projects | Infinity Helios"
                description="Explore our portfolio of successful solar installations across residential, commercial, and industrial sectors."
            />
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Header Section */}
            <section className="relative mb-8">
                <div className="container-main relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-solarGreen/10 text-solarGreen text-xs font-bold tracking-widest uppercase mb-4">
                            Our Portfolio
                        </span>
                    </motion.div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white"
                            >
                                Empowering the World <br />
                                <span className="text-solarGreen">One Project</span> at a Time
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="max-w-2xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light"
                            >
                                From residential rooftops to massive industrial solar parks, explore how we are shaping a sustainable future across the nation.
                            </motion.p>
                        </div>

                        {/* Search Input */}
                        <div className="w-full md:w-auto relative group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full md:w-64 pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-solarGreen focus:ring-1 focus:ring-solarGreen transition-all font-bold text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-solarGreen transition-colors" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="mb-8">
                <div className="container-main max-w-7xl mx-auto px-6">
                    <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-xl p-2 rounded-[20px] border border-slate-200 dark:border-white/10 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto shadow-lg shadow-black/5">
                        {categories.map((cat, idx) => (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${filter === cat
                                    ? "bg-solarGreen text-solarBlue shadow-md shadow-solarGreen/20 scale-105"
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
            <section className="pb-12">
                <div className="container-main max-w-7xl mx-auto px-6">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                                    <div className="bg-white dark:bg-white/5 rounded-[30px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg group-hover:shadow-xl group-hover:border-solarGreen/30 transition-all duration-500 flex flex-col h-full">
                                        {/* Image Header */}
                                        <div className="relative h-56 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-3 py-1 bg-solarGreen text-solarBlue text-[10px] font-black rounded-full uppercase tracking-widest shadow-md">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4 z-20">
                                                <h3 className="text-xl font-black text-white group-hover:text-solarGreen transition-colors duration-300 leading-tight">
                                                    {project.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content Body */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4 gap-2 font-bold">
                                                <MapPin className="w-3.5 h-3.5 text-solarGreen" />
                                                {project.location}
                                            </div>

                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                                                {project.description}
                                            </p>

                                            {/* Stats Footer */}
                                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-white/10">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-0.5 flex items-center gap-1">
                                                        <Zap className="w-3 h-3 text-solarGreen" /> Capacity
                                                    </span>
                                                    <span className="text-base font-black text-slate-900 dark:text-white">{project.capacity}</span>
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-0.5 flex items-center gap-1 justify-end">
                                                        <Calendar className="w-3 h-3 text-solarGreen" /> Year
                                                    </span>
                                                    <span className="text-base font-black text-slate-900 dark:text-white">{project.year}</span>
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
                            className="text-center py-20"
                        >
                            <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Filter className="w-6 h-6 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">No projects found</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Try selecting a different category.</p>
                            <button
                                onClick={() => setFilter("All")}
                                className="mt-4 text-solarGreen font-bold hover:underline text-sm"
                            >
                                Clear all filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Consultation CTA */}
            <ScrollReveal>
                <div className="container-main max-w-7xl mx-auto px-6">
                    <div className="relative rounded-[40px] overflow-hidden bg-slate-950 p-8 md:p-12 text-center shadow-2xl mt-8">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-solarGreen/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black text-white">
                                Ready for your own <br />
                                <span className="text-solarGreen text-glow">Solar Success Story?</span>
                            </h2>
                            <p className="text-white/70 max-w-xl mx-auto text-base font-light leading-relaxed">
                                Join the hundreds of satisfied clients who have switched to clean,
                                sustainable energy with our expert engineering solutions.
                            </p>
                            <div className="pt-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-solarGreen hover:bg-solarGreen/90 text-solarBlue font-black rounded-full transition-all duration-300 shadow-lg shadow-solarGreen/20 transform hover:scale-105 active:scale-95 text-sm uppercase tracking-widest"
                                >
                                    Get a Free Consultation <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}

