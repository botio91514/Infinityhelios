import { motion } from "framer-motion";
import { FileText, ChevronRight, Scale, AlertCircle } from "lucide-react";

export default function Terms() {
    const lastUpdated = "January 1, 2026";

    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services."
        },
        {
            title: "2. Service Description",
            content: "Infinity Helios provides solar energy solutions, including consultation, installation, and maintenance. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice."
        },
        {
            title: "3. User Responsibilities",
            content: "You agree to provide accurate, current, and complete information during the registration or inquiry process. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
            title: "4. Intellectual Property",
            content: "All content included on this site, such as text, graphics, logos, button icons, images, and software, is the property of Infinity Helios or its content suppliers and protected by international copyright laws."
        },
        {
            title: "5. Warranty & Liability",
            content: "Solar panels and inverters are subject to manufacturer warranties. Infinity Helios provides a workmanship warranty as specified in your installation contract. We are not liable for indirect, incidental, or consequential damages."
        },
        {
            title: "6. Payment Terms",
            content: "Payment schedules for installations are defined in individual contracts. For online store purchases, payment is required at the time of order unless Cash on Delivery (COD) is selected."
        },
        {
            title: "7. Governing Law",
            content: "These terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in London, UK."
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-28 pb-12 transition-colors duration-300 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-solarBlue -z-10" />

            <div className="container-main relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-widest mb-4"
                    >
                        <Scale className="w-3 h-3 text-solarGreen" /> Legal Agreement
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4"
                    >
                        Terms & <span className="text-solarGreen">Conditions</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 dark:text-slate-400"
                    >
                        Please read these terms carefully before using our services. Last updated on {lastUpdated}.
                    </motion.p>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto space-y-5">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index + 0.3 }}
                            className="bg-white dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-solarGreen/30 transition-colors"
                        >
                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                                {section.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="max-w-4xl mx-auto mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex gap-4"
                >
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                    <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                        <strong>Note:</strong> These terms constitute a legally binding agreement between you and Infinity Helios. If you do not agree to these terms, please do not use our services.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
