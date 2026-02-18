import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";

function Counter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1500;
    const incrementTime = 20;
    const increment = end / (duration / incrementTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <h3
      ref={ref}
      className="text-3xl font-bold text-solarGreen"
    >
      {count}+
    </h3>
  );
}

export default function Stats() {
  const items = [
    { value: 10, label: "Years Experience" },
    { value: 25, label: "Countries Served" },
    { value: 1000, label: "Successfully Delivered" },
    { value: 99, label: "Customer Satisfaction" },
  ];

  return (
    <section className="relative pt-6 pb-6 px-10 bg-gradient-to-b from-slate-900 via-solarBlue to-slate-900 dark:from-slate-950 dark:via-solarBlue dark:to-slate-950">
      {/* Subtle ambient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-solarGreen/20 to-transparent"></div>

      {/* Subtle bottom glow for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent dark:from-slate-950/40 pointer-events-none"></div>

      <div className="container-main relative z-10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center" staggerDelay={0.15}>
          {items.map((item, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="glass glass-card rounded-2xl p-6 transition-all duration-700 border border-white/5 dark:border-slate-700/30 hover:border-solarGreen/30 relative"
              >
                <Counter value={item.value} />
                <p className="mt-2 opacity-80">{item.label}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
