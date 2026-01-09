import { useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogPosts";

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.id === id);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const headerY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
                <h1 className="text-4xl font-black mb-4">404</h1>
                <p className="mb-6">Article not found.</p>
                <Link to="/learning-hub" className="px-6 py-2 bg-solarGreen text-solarBlue rounded-lg font-bold">
                    Go Back
                </Link>
            </div>
        );
    }

    // Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": post.image,
        "datePublished": post.date, // Needs ISO format ideally, but this works for basic
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Infinity Helios",
            "logo": {
                "@type": "ImageObject",
                "url": "https://infinityhelios.com/logo.png"
            }
        },
        "description": post.excerpt
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-solarBlue transition-colors duration-300">
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.image}
                type="article"
                schema={articleSchema}
            />

            {/* PROGRESS BAR */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed top-0 left-0 right-0 h-1.5 bg-solarGreen z-50 origin-left"
            />

            {/* HEADER IMAGE */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-solarBlue via-solarBlue/60 to-transparent"></div>
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                    <div className="container-main max-w-4xl mx-auto">
                        <Link to="/learning-hub" className="inline-flex items-center gap-2 text-white/60 hover:text-solarGreen mb-6 transition-colors backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
                        </Link>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
                        >
                            {post.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-wrap items-center gap-6 text-white/80"
                        >
                            <span className="px-3 py-1 bg-solarGreen text-solarBlue text-[10px] font-black uppercase tracking-widest rounded-md">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                <Calendar className="w-4 h-4 text-solarGreen" />
                                {post.date}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                <Clock className="w-4 h-4 text-solarGreen" />
                                {post.readTime} Read
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="container-main max-w-4xl mx-auto px-6 py-16 relative">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT SIDEBAR (Share) */}
                    <div className="hidden lg:flex flex-col gap-4 sticky top-32 h-fit">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 rotate-180 writing-vertical-lr mb-4">Share this</span>
                        <div className="flex flex-col gap-4">
                            <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all">
                                <Facebook className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all">
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all">
                                <Linkedin className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(window.location.href)}
                                className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:bg-solarGreen hover:text-white hover:border-solarGreen transition-all"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* MAIN ARTICLE */}
                    <article className="flex-1">
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none 
                            prose-headings:font-black prose-headings:tracking-tight 
                            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 
                            prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                            prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-black
                            prose-a:text-solarGreen prose-a:no-underline hover:prose-a:underline
                            prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-ul:my-6"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* TAGS */}
                        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Related Topics</h4>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-solarGreen hover:text-white transition-colors cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* AUTHOR BOX */}
                        <div className="mt-12 p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-solarGreen flex items-center justify-center text-white font-black text-xl shrink-0">
                                {post.author[0]}
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Written By</span>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">{post.author}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                    Energy expert and sustainability advocate at Infinity Helios. Dedicated to making green energy accessible to everyone.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
