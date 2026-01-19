import { motion } from "framer-motion";
import { CheckCircle, Award, Scale, AlertTriangle, FileCheck, ShieldCheck } from "lucide-react";

export default function Compliance() {
    const compliances = [
        {
            title: "MCS Certified",
            id: "MCS-PV-021",
            description: "Fully certified under the Microgeneration Certification Scheme (MCS), ensuring all installations qualify for the Smart Export Guarantee (SEG).",
            status: "Active",
            color: "text-green-500"
        },
        {
            title: "IEC 61215 & IEC 61730",
            id: "PV-IEC-STD-22",
            description: "International Electrotechnical Commission standards for PV module design qualification, type approval, and safety qualification.",
            status: "Verified",
            color: "text-blue-500"
        },
        {
            title: "UK Building Regulations",
            id: "PART-P-ELEC",
            description: "All electrical work complies with Part P of the Building Regulations, ensuring safety and efficiency in your home's electrical systems.",
            status: "Compliant",
            color: "text-orange-500"
        },
        {
            title: "G98 & G99 Compliant",
            id: "ENA-ER-G98",
            description: "Inverters and systems meet the Energy Networks Association (ENA) G98/99 standards for grid connection in the UK.",
            status: "Approved",
            color: "text-purple-500"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-28 pb-12 transition-colors duration-300 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-solarGreen/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="container-main relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-widest mb-4 border border-slate-200 dark:border-white/10"
                    >
                        <ShieldCheck className="w-3 h-3 text-solarGreen" /> Regulatory Adherence
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4"
                    >
                        Compliance & <span className="text-solarGreen">Standards</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 dark:text-slate-400"
                    >
                        We adhere to the highest international and national standards to ensure safety, reliability, and performance in every kilowatt we generate.
                    </motion.p>
                </div>

                {/* Certifications List */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {compliances.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index + 0.3 }}
                            className="group p-6 rounded-[20px] bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 hover:border-solarGreen/50 transition-all flex flex-col md:flex-row items-start md:items-center gap-6 shadow-lg shadow-black/5"
                        >
                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Award className="w-6 h-6 text-solarGreen" />
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white">{item.title}</h3>
                                    <span className="text-[10px] font-mono bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-slate-500">{item.id}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 bg-white/5 border border-white/10 ${item.color}`}>
                                <CheckCircle className="w-3 h-3" /> {item.status}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-10 pt-6 border-t border-slate-200 dark:border-white/5"
                >
                    <p className="text-slate-500 dark:text-slate-500 text-xs flex items-center justify-center gap-2">
                        <Scale className="w-3 h-3" /> All installation protocols verify with current Ofgem and RECC guidelines.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
