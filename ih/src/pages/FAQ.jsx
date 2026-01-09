import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            category: "General",
            items: [
                {
                    q: "What benefits does solar energy provide?",
                    a: "Solar energy significantly reduces electricity bills, increases property value, and reduces your carbon footprint. Infinity Helios systems typically provide an ROI within 3-5 years."
                },
                {
                    q: "How long do solar panels last?",
                    a: "Our Tier-1 solar panels are designed to last 25-30 years with minimal degradation. We offer performance warranties ensuring 80% output even after 25 years."
                }
            ]
        },
        {
            category: "Installation & Technical",
            items: [
                {
                    q: "Is my roof suitable for solar?",
                    a: "Most roofs are suitable. We conduct a detailed site survey to assess structural integrity and sunlight exposure. South-facing roofs are ideal for maximum generation."
                },
                {
                    q: "What happens during a power outage?",
                    a: "Standard grid-tied systems will shut down for safety. However, if you opt for our Hybrid Systems with battery storage, you will have uninterrupted power backup."
                }
            ]
        },
        {
            category: "Financial & Subsidy",
            items: [
                {
                    q: "Is there a government subsidy available?",
                    a: "Yes, the Indian government offers subsidies for residential rooftop solar under the PM Surya Ghar Yojana. Our team handles all the paperwork for you."
                },
                {
                    q: "Do you offer financing options?",
                    a: "We partner with leading banks to offer solar loans at attractive interest rates with minimal down payment."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-28 pb-12 transition-colors duration-300 relative">
            <div className="container-main max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-widest mb-4"
                    >
                        <HelpCircle className="w-3 h-3 text-solarGreen" /> Support Center
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4"
                    >
                        Frequently Asked <span className="text-solarGreen">Questions</span>
                    </motion.h1>
                </div>

                {/* FAQ Grid */}
                <div className="max-w-3xl mx-auto space-y-8">
                    {faqs.map((section, sIndex) => (
                        <div key={sIndex}>
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg font-black text-slate-900 dark:text-white mb-4 pl-3 border-l-4 border-solarGreen"
                            >
                                {section.category}
                            </motion.h3>

                            <div className="space-y-3">
                                {section.items.map((item, i) => {
                                    const globalIndex = `${sIndex}-${i}`;
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * i }}
                                            key={i}
                                            className={`rounded-xl border transition-all duration-300 overflow-hidden ${isOpen
                                                ? "bg-slate-50 dark:bg-white/5 border-solarGreen/50"
                                                : "bg-white dark:bg-transparent border-slate-200 dark:border-white/10 hover:border-solarGreen/30"
                                                }`}
                                        >
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                className="w-full flex items-center justify-between p-4 text-left"
                                            >
                                                <span className={`font-bold text-sm transition-colors ${isOpen ? "text-solarGreen" : "text-slate-700 dark:text-slate-200"}`}>
                                                    {item.q}
                                                </span>
                                                <div className={`p-1.5 rounded-full transition-colors ${isOpen ? "bg-solarGreen text-solarBlue" : "bg-slate-100 dark:bg-white/5 text-slate-500"}`}>
                                                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-4 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-white/5 mx-4 mt-1">
                                                            {item.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-10"
                >
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Still have questions?</p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-solarGreen text-solarBlue px-6 py-2.5 rounded-xl font-bold hover:bg-white hover:text-black transition-all shadow-lg shadow-solarGreen/20 text-sm"
                    >
                        <MessageCircle className="w-4 h-4" /> Contact Support
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
