import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";

import { sendContactForm } from "../api/contact";
import { Loader2, Check } from "lucide-react";

const Maintenance = () => {
    const [bookingData, setBookingData] = useState({
        name: "",
        phone: "",
        serviceType: "basic",
        address: "",
        preferredDate: ""
    });
    const [status, setStatus] = useState("idle");

    const services = [
        {
            id: "basic",
            name: "Eco Clean",
            price: "2,499",
            icon: "🧼",
            features: ["Panel Cleaning", "Debris Removal", "Visual Inspection"]
        },
        {
            id: "standard",
            name: "Pro Shield",
            price: "4,999",
            icon: "🛡️",
            features: ["Cleaning + Polishing", "Thermal Imaging", "Inverter Health Check"]
        },
        {
            id: "premium",
            name: "Annual Care",
            price: "8,999",
            icon: "👑",
            features: ["3 Visits / Year", "Priority Support", "Full System Tune-up"]
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        const selectedService = services.find(s => s.id === bookingData.serviceType);

        try {
            await sendContactForm({
                ...bookingData,
                subject: `Maintenance Booking: ${selectedService.name}`,
                message: `Service Plan: ${selectedService.name} (₹${selectedService.price})\nPreferred Date: ${bookingData.preferredDate}\nAddress: ${bookingData.address}`
            });
            setStatus("success");
            setBookingData({ name: "", phone: "", serviceType: "basic", address: "", preferredDate: "" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-28 pb-12 overflow-hidden">
            <div className="container-main relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-8">
                    <ScrollReveal>
                        <span className="inline-block px-3 py-1 rounded-full bg-solarGreen/10 text-solarGreen font-black text-[10px] uppercase tracking-widest mb-3">
                            After-Sales Service
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter text-slate-900 dark:text-white">
                            Solar <span className="text-solarGreen">Maintenance</span> Hub
                        </h1>
                        <p className="max-w-2xl mx-auto text-base opacity-60 text-slate-600 dark:text-slate-400">
                            A clean system is a powerful system. Boost your solar efficiency by up to 25% with our professional grooming services.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Why Maintenance Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "Peak Efficiency", desc: "Dust and pollution can block up to 30% of sunlight. We keep it crystal clear.", icon: "⚡" },
                        { title: "System Longevity", desc: "Early detection of hot spots and wiring issues prevents costly failures.", icon: "🏗️" },
                        { title: "Safety First", desc: "Our technicians perform rigorous electrical checks to ensure fire safety.", icon: "🔥" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-[30px] shadow-lg"
                        >
                            <div className="text-3xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-black mb-2 tracking-tight text-slate-900 dark:text-white">{item.title}</h3>
                            <p className="opacity-60 leading-relaxed text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* PRICING PLANS */}
                    <div className="lg:col-span-8 space-y-6">
                        <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">Select Your Service Plan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => setBookingData({ ...bookingData, serviceType: service.id })}
                                    className={`relative p-5 rounded-[30px] border-2 transition-all text-left flex flex-col h-full ${bookingData.serviceType === service.id
                                        ? "border-solarGreen bg-solarGreen/5 shadow-xl shadow-solarGreen/10"
                                        : "border-slate-200 dark:border-white/10"
                                        }`}
                                >
                                    <div className="text-2xl mb-3">{service.icon}</div>
                                    <h4 className="text-lg font-black mb-1 text-slate-900 dark:text-white">{service.name}</h4>
                                    <div className="text-xl font-black text-solarGreen mb-4">₹{service.price}</div>
                                    <ul className="space-y-2 mt-auto">
                                        {service.features.map((f, i) => (
                                            <li key={i} className="text-[10px] font-bold opacity-60 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                                <span className="w-1.5 h-1.5 bg-solarGreen rounded-full flex-shrink-0"></span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* BOOKING FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 bg-slate-900 text-white rounded-[30px] p-6 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-solarGreen/20 blur-3xl"></div>
                        <h3 className="text-xl font-black mb-6 relative z-10">Quick Booking</h3>
                        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            <div>
                                <label className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-1.5 block">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-solarGreen outline-none transition"
                                    placeholder="Enter your name"
                                    value={bookingData.name}
                                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-1.5 block">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-solarGreen outline-none transition"
                                    placeholder="+91 00000 00000"
                                    value={bookingData.phone}
                                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-1.5 block">Preferred Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-solarGreen outline-none transition color-scheme-dark"
                                    value={bookingData.preferredDate}
                                    onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-1.5 block">Site Address</label>
                                <textarea
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-solarGreen outline-none transition h-20 resize-none"
                                    placeholder="Address where panels are installed"
                                    value={bookingData.address}
                                    onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className={`w-full font-black py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-solarGreen/20 uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 mt-2
                                    ${status === "success" ? "bg-green-500 text-white" : "bg-solarGreen text-white"}
                                `}
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Scheduling...
                                    </>
                                ) : status === "success" ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Booking Confirmed
                                    </>
                                ) : (
                                    "Schedule Inspection"
                                )}
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Maintenance;
