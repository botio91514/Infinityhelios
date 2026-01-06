import { motion } from "framer-motion";

export default function RollingBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden bg-slate-900 dark:bg-slate-950 border-b border-slate-800/50 h-20 flex items-center"
      style={{
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="flex whitespace-nowrap animate-marquee text-base font-medium text-slate-300 dark:text-slate-400">
        <span className="mx-10">☀️ Clean Energy Solutions</span>
        <span className="mx-10">⚡ High-Efficiency Solar Panels</span>
        <span className="mx-10">🌍 Renewable Energy Experts</span>
        <span className="mx-10">🔋 Smart Solar Technology</span>
        <span className="mx-10">♻️ Sustainable Future</span>

        {/* duplicate for smooth loop */}
        <span className="mx-10">☀️ Clean Energy Solutions</span>
        <span className="mx-10">⚡ High-Efficiency Solar Panels</span>
        <span className="mx-10">🌍 Renewable Energy Experts</span>
        <span className="mx-10">🔋 Smart Solar Technology</span>
        <span className="mx-10">♻️ Sustainable Future</span>
      </div>
    </motion.div>
  );
}
