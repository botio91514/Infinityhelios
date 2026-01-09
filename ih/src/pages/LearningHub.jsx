import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import { blogPosts } from "../data/blogPosts";

const categories = ["All", "Technical", "Financial", "Maintenance", "News"];

const LearningHub = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-28 pb-12 overflow-hidden">
            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-solarGreen/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="container-main relative z-10 max-w-7xl mx-auto px-6">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <ScrollReveal>
                        <span className="inline-block px-3 py-1.5 rounded-full bg-solarGreen/10 text-solarGreen font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                            Knowledge is Power
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-[1.1] text-slate-900 dark:text-white">
                            Helios <span className="text-solarGreen">Knowledge</span> Hub
                        </h1>
                        <p className="max-w-2xl mx-auto text-base opacity-60 font-medium text-slate-600 dark:text-slate-400">
                            Empowering you with the latest insights, technical guides, and financial strategies to master your energy transition.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 bg-slate-50 dark:bg-white/5 p-3 rounded-[24px] border border-slate-200 dark:border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? "bg-solarGreen text-white shadow-lg shadow-solarGreen/20"
                                    : "bg-white dark:bg-white/5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full lg:w-72">
                        <input
                            type="text"
                            placeholder="Find an insight..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-2.5 text-xs font-bold focus:border-solarGreen outline-none transition"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30 text-sm">🔍</span>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="flex flex-col gap-8">
                    <AnimatePresence mode="popLayout">
                        {/* FEATURED POST (First filtered post) */}
                        {filteredPosts.length > 0 && selectedCategory === "All" && searchQuery === "" && (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group relative"
                            >
                                <Link to={`/blog/${filteredPosts[0].id}`} className="block">
                                    <div className="bg-slate-950 dark:bg-white/5 rounded-[40px] overflow-hidden border border-white/10 hover:border-solarGreen/50 transition-all duration-700 shadow-2xl flex flex-col lg:flex-row h-full lg:h-[400px]">
                                        <div className="lg:w-1/2 overflow-hidden relative">
                                            <img
                                                src={filteredPosts[0].image}
                                                alt={filteredPosts[0].title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-1.5 bg-solarGreen text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                                                    Featured Insight
                                                </span>
                                            </div>
                                        </div>
                                        <div className="lg:w-1/2 p-8 md:p-10 flex flex-col justify-center text-white">
                                            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-4">
                                                <span>{filteredPosts[0].date}</span>
                                                <span className="w-1 h-1 bg-solarGreen rounded-full"></span>
                                                <span>{filteredPosts[0].readTime} Read</span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight tracking-tighter">
                                                {filteredPosts[0].title}
                                            </h2>
                                            <p className="opacity-60 text-base leading-relaxed mb-6 line-clamp-3">
                                                {filteredPosts[0].excerpt}
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-black text-[10px]">
                                                    {filteredPosts[0].author[0]}
                                                </div>
                                                <span className="text-xs font-bold opacity-60">Masterclass by {filteredPosts[0].author}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )}

                        {/* REMAINING POSTS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.slice(selectedCategory === "All" && searchQuery === "" ? 1 : 0).map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group flex flex-col h-full"
                                >
                                    <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                                        <div className="bg-slate-50 dark:bg-white/5 rounded-[30px] overflow-hidden border border-slate-200 dark:border-white/10 hover:border-solarGreen/50 transition-all duration-500 shadow-lg hover:shadow-xl flex flex-col h-full">
                                            <div className="aspect-[16/9] overflow-hidden relative">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full text-[8px] font-black uppercase tracking-widest">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-5 flex flex-col flex-grow">
                                                <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-40 mb-3">
                                                    <span>{post.date}</span>
                                                    <span className="w-1 h-1 bg-solarGreen rounded-full"></span>
                                                    <span>{post.readTime}</span>
                                                </div>
                                                <h3 className="text-lg font-black mb-3 leading-tight group-hover:text-solarGreen transition-colors line-clamp-2 text-slate-900 dark:text-white">
                                                    {post.title}
                                                </h3>
                                                <p className="opacity-60 text-[11px] leading-relaxed mb-6 line-clamp-3 text-slate-600 dark:text-slate-400">
                                                    {post.excerpt}
                                                </p>
                                                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                                    <span className="text-[9px] font-black uppercase tracking-widest opacity-40 text-slate-500 dark:text-slate-400">Read Full Story</span>
                                                    <div className="w-7 h-7 rounded-full bg-solarGreen/10 flex items-center justify-center text-solarGreen group-hover:bg-solarGreen group-hover:text-white transition-all text-sm">
                                                        →
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 opacity-40">
                        <span className="text-6xl block mb-4">📭</span>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">No articles found matching your criteria.</p>
                    </div>
                )}

                {/* Newsletter Box */}
                <div className="mt-16 p-8 bg-solarGreen rounded-[40px] relative overflow-hidden text-center text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rotate-45 translate-x-32 -translate-y-32"></div>
                    <div className="relative z-10">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] mb-2 block">Subscribe to Helios Weekly</span>
                        <h2 className="text-2xl md:text-4xl font-black mb-6 tracking-tighter">Get the energy insights <br /> before your neighbors do.</h2>
                        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Your best email"
                                className="bg-white/20 border border-white/30 rounded-xl px-6 py-3 text-sm placeholder:text-white/60 focus:bg-white/30 outline-none transition flex-grow text-white"
                            />
                            <button className="bg-white text-solarGreen font-black px-8 py-3 rounded-xl hover:scale-105 transition-all shadow-xl uppercase tracking-widest text-[10px]">
                                Ignite Me
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningHub;
