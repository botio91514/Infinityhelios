import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Server, Globe } from "lucide-react";

export default function PrivacyData() {
    const sections = [
        {
            icon: <Eye className="w-6 h-6 text-solarGreen" />,
            title: "Data Collection",
            content: "We collect essential information to provide our solar services, including energy usage patterns, roof specifications, and contact details. This data is used exclusively to engineer the optimal solar solution for your needs."
        },
        {
            icon: <Lock className="w-6 h-6 text-solarGreen" />,
            title: "Security & Encryption",
            content: "All client data is protected by military-grade AES-256 encryption. Our servers are housed in Tier-4 data centers with 24/7 physical and digital security monitoring."
        },
        {
            icon: <Server className="w-6 h-6 text-solarGreen" />,
            title: "Data Storage",
            content: "Your personal information is stored on secure, isolated servers located within India, complying with the Digital Personal Data Protection Act (DPDP) 2023."
        },
        {
            icon: <Globe className="w-6 h-6 text-solarGreen" />,
            title: "Third-Party Sharing",
            content: "Infinity Helios does not sell your data. We only share necessary information with certified installation partners and government bodies for subsidy processing."
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue page-pt pb-24 transition-colors duration-300 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="container-main relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solarGreen/10 text-solarGreen font-bold text-xs uppercase tracking-widest mb-6"
                    >
                        <Shield className="w-4 h-4" /> Legal & Trust
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6"
                    >
                        Privacy & <span className="text-solarGreen">Data Protection</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400"
                    >
                        Transparency and security are at the core of our technology. We are committed to protecting your privacy and ensuring your data is handled with the utmost care.
                    </motion.p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index + 0.3 }}
                            className="p-8 rounded-[40px] bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 hover:border-solarGreen/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-solarGreen/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {section.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{section.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Legal Text Block */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="prose prose-lg dark:prose-invert mx-auto max-w-4xl bg-slate-50 dark:bg-white/5 p-10 rounded-[40px] border border-slate-200 dark:border-white/5"
                >
                    <h3 className="flex items-center gap-3 text-solarGreen font-bold uppercase tracking-widest text-sm mb-6">
                        <FileText className="w-5 h-5" /> Official Policy Statement
                    </h3>
                    <p className="text-sm md:text-base opacity-80 mb-6">
                        By using the Infinity Helios platform and services, you consent to the data practices described in this statement. We reserve the right to change this policy at any time. Significant changes will be communicated via email or prominent notice on our website.
                    </p>
                    <p className="text-sm md:text-base opacity-80">
                        Last Updated: January 1, 2026. For any privacy-related concerns, please contact our Data Protection Officer at <span className="text-solarGreen font-bold">privacy@infinityhelios.com</span>.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
