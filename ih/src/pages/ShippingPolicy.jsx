import { motion } from "framer-motion";
import { Truck, RotateCcw, PackageCheck, Clock } from "lucide-react";

export default function ShippingPolicy() {
    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-28 pb-12 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-solarGreen/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="container-main max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-widest mb-4"
                    >
                        <Truck className="w-3 h-3 text-solarGreen" /> Logistics
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4"
                    >
                        Shipping & <span className="text-solarGreen">Returns</span>
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Shipping Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-5"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">
                                <PackageCheck className="w-6 h-6 text-solarGreen" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">Shipping Policy</h2>
                        </div>

                        <div className="prose dark:prose-invert">
                            <h4 className="font-bold flex items-center gap-2 text-sm"><Clock className="w-3 h-3" /> Processing Time</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.
                            </p>

                            <h4 className="font-bold mt-4 text-sm">Shipping Rates</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                We offer free standard shipping on all solar system kits above ₹50,000. For smaller components, shipping charges will be calculated at checkout based on weight and location.
                            </p>

                            <h4 className="font-bold mt-4 text-sm">Delivery Estimates</h4>
                            <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1">
                                <li>Metro Cities: 3-5 Business Days</li>
                                <li>Rest of India: 5-7 Business Days</li>
                                <li>Remote Locations: 7-10 Business Days</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Returns Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-5 md:border-l md:border-slate-200 md:dark:border-white/10 md:pl-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">
                                <RotateCcw className="w-6 h-6 text-orange-500" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">Returns & Refunds</h2>
                        </div>

                        <div className="prose dark:prose-invert">
                            <h4 className="font-bold text-sm">Return Window</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it.
                            </p>

                            <h4 className="font-bold mt-4 text-sm">Non-Returnable Items</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Custom-designed solar structures, opened electronic components (inverters/batteries) where seals are broken, and installation services once commenced are non-refundable.
                            </p>

                            <h4 className="font-bold mt-4 text-sm">Refund Process</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Once we receive your item, we will inspect it and notify you on the status of your refund. If approved, we will initiate a refund to your credit card (or original method of payment) within 5-7 days.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
