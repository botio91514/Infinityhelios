import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mail, Package, ArrowRight, Loader, AlertCircle, CheckCircle2, MapPin, Truck, Calendar } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../api/config";
import SEO from "../components/SEO";

const OrderTracking = () => {
    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setOrder(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/track-order`, {
                order_id: orderId,
                email: email
            });
            setOrder(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to find order. Please check your details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-16 px-4 flex flex-col items-center bg-slate-50 dark:bg-solarBlue relative overflow-hidden">
            <SEO
                title="Track Order | Infinity Helios"
                description="Track your order status securely."
            />
            {/* Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                {/* FORM SECTION */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-2 lg:order-1"
                >
                    <div className="bg-white dark:bg-slate-950/40 backdrop-blur-3xl rounded-[30px] p-6 md:p-10 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 rounded-full bg-solarGreen/10 text-solarGreen text-[10px] font-black tracking-widest uppercase mb-4">
                                Public Tracker
                            </span>
                            <h1 className="text-3xl font-black mb-3 tracking-tighter text-slate-900 dark:text-white">
                                Track Your <span className="text-solarGreen">Order</span>
                            </h1>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Enter your Order ID and the Email Address used during checkout to view current status.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-3">
                                    <Package className="w-3 h-3" /> Order ID
                                </label>
                                <input
                                    type="text"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-3.5 text-sm font-bold focus:outline-none focus:border-solarGreen focus:bg-white dark:focus:bg-white/10 transition-all shadow-inner"
                                    placeholder="e.g. 772"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-3">
                                    <Mail className="w-3 h-3" /> Billing Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-3.5 text-sm font-bold focus:outline-none focus:border-solarGreen focus:bg-white dark:focus:bg-white/10 transition-all shadow-inner"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group w-full flex items-center justify-between pl-6 pr-3 py-3 bg-solarGreen text-solarBlue rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-solarGreen/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:grayscale transition-all"
                            >
                                <span className="relative z-10">{isSubmitting ? "Searching..." : "Track Status"}</span>
                                <div className="w-10 h-10 bg-solarBlue text-solarGreen rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                </div>
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* RESULT SECTION */}
                <motion.div
                    className="order-1 lg:order-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <AnimatePresence mode="wait">
                        {!order ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key="placeholder"
                                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center opacity-30"
                            >
                                <Package className="w-24 h-24 mb-6 stroke-1" />
                                <h3 className="text-xl font-black uppercase tracking-widest mb-2">Ready to Track</h3>
                                <p className="text-sm max-w-xs mx-auto">Enter details to see real-time status updates.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                key="result"
                                className="bg-white dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[30px] p-8 shadow-2xl relative overflow-hidden"
                            >
                                {/* Status Header */}
                                <div className="flex justify-between items-start mb-10 pb-8 border-b border-slate-100 dark:border-white/5 relative z-10">
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Order Current Status</p>
                                        <div className="flex items-center gap-3">
                                            <span className={`w-3 h-3 rounded-full ${['completed'].includes(order.status) ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-solarGreen animate-pulse'}`} />
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{order.status.replace('-', ' ')}</h2>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Order Date</p>
                                        <p className="text-sm font-bold opacity-80">{new Date(order.date_created).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {/* Timeline Section */}
                                {['cancelled', 'refunded', 'failed', 'trash'].includes(order.status) ? (
                                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl mb-8 flex items-center gap-4 text-red-500">
                                        <AlertCircle className="w-8 h-8 shrink-0" />
                                        <div>
                                            <h3 className="font-black uppercase tracking-widest text-sm mb-1">Order {order.status}</h3>
                                            <p className="text-xs font-medium opacity-80">This order has been stopped. Please contact support for help.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-10 pl-4 relative space-y-8">
                                        {/* Timeline Line */}
                                        <div className="absolute top-2 left-[21px] bottom-2 w-0.5 bg-slate-100 dark:bg-white/5 z-0" />

                                        {[
                                            { step: 1, label: "Order Placed", icon: CheckCircle2, active: true }, // Always true if exists
                                            { step: 2, label: "Processing", icon: Package, active: ['processing', 'completed', 'on-hold'].includes(order.status) },
                                            { step: 3, label: "On Its Way", icon: Truck, active: ['completed'].includes(order.status) },
                                            { step: 4, label: "Delivered", icon: MapPin, active: ['completed'].includes(order.status) }
                                        ].map((item, index) => (
                                            <div key={index} className={`relative z-10 flex items-center gap-6 ${item.active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                                                <div className={`w-11 h-11 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${item.active ? 'bg-solarGreen border-solarGreen/20 text-solarBlue shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-white/5 text-slate-400'}`}>
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className={`text-sm font-black uppercase tracking-widest ${item.active ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{item.label}</h4>
                                                    {item.active && index === 0 && <p className="text-[10px] text-slate-500 mt-1">We have received your order.</p>}
                                                    {item.active && index === 1 && order.status === 'processing' && <p className="text-[10px] text-solarGreen mt-1 animate-pulse font-bold">Currently working on it...</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Order Details */}
                                <div className="space-y-6 bg-slate-50/50 dark:bg-black/20 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                                    {/* Items */}
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Items Ordered</p>
                                        <div className="space-y-3">
                                            {order.line_items.map(item => (
                                                <div key={item.id} className="flex justify-between text-xs font-bold p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-5 h-5 bg-slate-100 dark:bg-white/10 rounded-md flex items-center justify-center text-[10px] text-slate-500">{item.quantity}x</span>
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <span>{order.currency_symbol}{item.total}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="flex items-start gap-4 pt-4 border-t border-slate-200/50 dark:border-white/5">
                                        <div className="w-8 h-8 bg-slate-100 dark:bg-white/5 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Shipping To</p>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                                                {order.shipping.address_1}, {order.shipping.city}<br />
                                                {order.shipping.postcode}, {order.shipping.country}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-xs font-black uppercase tracking-widest opacity-40">Total Paid: {order.currency_symbol}{order.total}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderTracking;
