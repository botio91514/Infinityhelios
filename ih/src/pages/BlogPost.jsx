import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const blogContent = {
    "mono-vs-poly": {
        title: "Monocrystalline vs. Polycrystalline: Which is Right for You?",
        category: "Technical",
        date: "Jan 12, 2026",
        author: "Dr. Solar",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1509391366360-fe5bb584850a?q=80&w=2070&auto=format&fit=crop",
        content: `
            <p className="lead">When you decide to go solar, one of the first technical decisions you'll face is choosing between Monocrystalline and Polycrystalline solar panels. Both technologies have been around for decades, but they offer significantly different performance profiles.</p>
            
            <h3>The Science Behind the Cells</h3>
            <p>Monocrystalline panels are made from a single, pure crystal of silicon. This gives them their characteristic dark, uniform look and rounded edges. Because the silicon is high-purity, electrons have more room to move, making these panels the most efficient on the market.</p>
            
            <p>Polycrystalline panels, on the other hand, are made from many different silicon fragments melted together. This creates a speckled, blue-ish appearance. While easier and cheaper to manufacture, the boundaries between the crystal fragments can slightly impede the flow of electricity.</p>
            
            <div className="bg-solarGreen/5 p-8 rounded-3xl border border-solarGreen/20 my-10">
                <h4 className="text-solarGreen font-black uppercase tracking-widest text-xs mb-4">Key Comparison</h4>
                <ul className="space-y-4">
                    <li className="flex gap-4"><strong>Efficiency:</strong> Mono (19-22%) vs Poly (15-18%)</li>
                    <li className="flex gap-4"><strong>Cost:</strong> Poly is generally 10-15% cheaper per watt.</li>
                    <li className="flex gap-4"><strong>Heat Tolerance:</strong> Mono performs better in extreme high temperatures.</li>
                    <li className="flex gap-4"><strong>Space:</strong> Mono produces more power per square foot.</li>
                 </ul>
            </div>

            <h3>Which should you choose?</h3>
            <p>If you have limited roof space, <strong>Monocrystalline</strong> is almost always the better choice. You need the highest power density possible to meet your energy needs. However, if you have a massive industrial roof and budget is the primary concern, <strong>Polycrystalline</strong> can still offer a fantastic Return on Investment (ROI) given the lower upfront cost.</p>
        `
    },
    "solar-subsidies-2026": {
        title: "2026 Solar Subsidy Guide: How to Claim up to 40% Back",
        category: "Financial",
        date: "Jan 05, 2026",
        author: "Amit Sharma",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1558444479-cdbf96d8bd60?q=80&w=2070&auto=format&fit=crop",
        content: `
            <p>The landscape of solar incentives in India has seen a massive shift in 2026. The government's push for 10 million households to go solar has led to streamlined processes and direct benefit transfers.</p>
            
            <h3>Understanding PM-Surya Ghar Scheme</h3>
            <p>Under the updated national portal, residential consumers can now receive a fixed subsidy based on the solar plant capacity. For a typical 3kW system, the subsidy can cover nearly 40% of the total project cost.</p>
            
            <h3>Step-by-Step Claim Process</h3>
            <ol>
                <li>Register on the National Portal with your consumer number.</li>
                <li>Wait for Feasibility Approval from your DISCOM.</li>
                <li>Choose a registered vendor (like Infinity Helios) to perform the installation.</li>
                <li>Submit the completion report and copy of the net-metering photo.</li>
                <li>The subsidy is transferred directly to your bank account within 30 days.</li>
            </ol>
        `
    }
};

const BlogPost = () => {
    const { id } = useParams();
    const post = blogContent[id];
    const [scrolled, setScrolled] = useState(0);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center p-6">
                <div>
                    <h1 className="text-4xl font-black mb-4">Post Not Found</h1>
                    <Link to="/learning-hub" className="text-solarGreen font-bold">Back to Hub</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pb-20 overflow-x-hidden">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-solarGreen z-[100] origin-left"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden flex items-end pb-24 md:pb-32">
                <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-solarBlue via-solarBlue/60 to-transparent"></div>

                <div className="container-main relative z-10 w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Breadcrumbs */}
                        <div className="flex items-center justify-center gap-2 mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                            <Link to="/" className="hover:text-solarGreen transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/learning-hub" className="hover:text-solarGreen transition-colors">Insights</Link>
                            <span>/</span>
                            <span className="text-solarGreen">{post.category}</span>
                        </div>

                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="px-5 py-2 bg-solarGreen text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-[1] max-w-5xl mx-auto">
                            {post.title}
                        </h1>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-10 border-t border-white/10 w-full max-w-3xl mx-auto">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-solarGreen/20 backdrop-blur-xl border border-white/20 flex items-center justify-center font-black text-xs text-white">
                                    {post.author[0]}
                                </div>
                                <div className="text-left">
                                    <div className="text-[9px] opacity-40 uppercase font-black text-white tracking-widest">Thought Leader</div>
                                    <div className="text-sm font-bold text-white">{post.author}</div>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-10 bg-white/10"></div>
                            <div className="flex flex-col items-center md:items-start">
                                <div className="text-[9px] opacity-40 uppercase font-black text-white tracking-widest">Estimated Read</div>
                                <div className="text-sm font-bold text-white">{post.readTime}</div>
                            </div>
                            <div className="hidden md:block w-px h-10 bg-white/10"></div>
                            <div className="flex flex-col items-center md:items-start">
                                <div className="text-[9px] opacity-40 uppercase font-black text-white tracking-widest">Release Date</div>
                                <div className="text-sm font-bold text-white">{post.date}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container-main pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none"
                    >
                        <div
                            className="blog-content text-slate-600 dark:text-slate-300 text-lg leading-[1.8]"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Social Share Call to Action */}
                        <div className="mt-20 p-10 bg-slate-50 dark:bg-white/5 rounded-[40px] border border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h4 className="text-xl font-black tracking-tight mb-2">Think this helps a friend?</h4>
                                <p className="text-sm opacity-60">Spread the light! Share this guide with your network.</p>
                            </div>
                            <div className="flex gap-4">
                                {["Share to LinkedIn", "Share to WhatsApp", "Twitter X"].map((plat, i) => (
                                    <button
                                        key={i}
                                        className="px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-solarGreen hover:text-solarGreen transition-all"
                                    >
                                        {plat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Back Link */}
                        <div className="mt-16 text-center">
                            <Link
                                to="/learning-hub"
                                className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-solarGreen transition-all"
                            >
                                <span>←</span> Back to Knowledge Hub
                            </Link>
                        </div>
                    </motion.div>

                    {/* Sidebar / Recommended */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="bg-slate-900 text-white rounded-[40px] p-10 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-solarGreen/20 blur-2xl"></div>
                            <h4 className="text-xl font-black mb-6 relative z-10">Start Your Journey</h4>
                            <p className="text-sm opacity-60 mb-8 leading-relaxed relative z-10">
                                Ready to calculate how much YOU can save with solar? Try our residential ROI tool.
                            </p>
                            <Link
                                to="/calculator"
                                className="w-full bg-solarGreen text-white font-black py-4 rounded-2xl flex items-center justify-center text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-solarGreen/20"
                            >
                                ROI Calculator
                            </Link>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-widest opacity-40 px-4">Latest Insights</h4>
                            {Object.entries(blogContent).filter(([key]) => key !== id).slice(0, 3).map(([key, item]) => (
                                <Link key={key} to={`/blog/${key}`} className="group block">
                                    <div className="flex gap-4 items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-3xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div>
                                            <div className="text-[8px] font-black uppercase tracking-widest text-solarGreen mb-1">{item.category}</div>
                                            <h5 className="text-sm font-bold leading-tight group-hover:text-solarGreen transition-colors line-clamp-2">{item.title}</h5>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogPost;
