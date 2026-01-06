import { motion } from "framer-motion";
import {
  Leaf,
  Globe,
  ShieldCheck,
  Zap,
  Target,
  Eye,
  Rocket,
  Building2,
  Cpu,
  ArrowRight
} from "lucide-react";

const ScrollReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 1, 0.44, 1] }}
  >
    {children}
  </motion.div>
);

export default function About() {
  return (
    <section className="relative min-h-screen bg-white dark:bg-solarBlue pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        {/* ================= HERO ================= */}
        <div className="max-w-5xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-solarGreen/10 text-solarGreen text-sm font-bold tracking-widest uppercase mb-6">
              Who We Are
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-premium-h1 mb-8"
          >
            Engineering the <br />
            <span className="text-solarGreen">Next Generation</span> <br />
            of Clean Energy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-light"
          >
            Infinity Helios is a technology-driven solar energy company focused on
            designing intelligent, high-performance renewable power systems that
            scale from individual homes to global energy infrastructure.
          </motion.p>
        </div>

        {/* ================= IMAGE STORY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 md:mb-32 items-center">
          <ScrollReveal>
            <div className="relative group">
              <div className="absolute inset-0 bg-solarGreen/20 rounded-[40px] blur-2xl group-hover:blur-3xl transition-all duration-700 -z-10" />
              <img
                src="/about/solarfarm.jpg"
                alt="Solar Plant"
                className="rounded-[40px] shadow-2xl w-full object-cover aspect-[4/3] border border-white/10"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <h2 className="text-premium-h2 leading-tight">
                Built on Precision. <br />
                <span className="text-solarGreen">Driven by Purpose.</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  We believe renewable energy should be engineered — not improvised.
                  Every Infinity Helios system is designed with precision, tested for
                  durability, and optimized for long-term performance.
                </p>
                <p>
                  Our expertise spans residential rooftops, commercial facilities, and
                  large-scale industrial installations across diverse environments.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10">
                  <Zap className="w-5 h-5 text-solarGreen" />
                  <span className="font-bold text-slate-900 dark:text-white">High Efficiency</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10">
                  <ShieldCheck className="w-5 h-5 text-solarGreen" />
                  <span className="font-bold text-slate-900 dark:text-white">Certified Quality</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ================= OUR JOURNEY ================= */}
        <div className="py-12 md:py-16">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-solarGreen font-bold tracking-widest uppercase text-sm mb-4 block">Our Evolution</span>
              <h2 className="text-premium-h2">The Road to <span className="text-solarGreen">Innovation</span></h2>
            </div>
          </ScrollReveal>

          <div className="space-y-20 md:space-y-32 max-w-6xl mx-auto">
            {/* STEP 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="space-y-6">
                  <span className="text-6xl font-black text-solarGreen/20">2018</span>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                    Foundation & Vision
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Infinity Helios was founded with a mission to deliver engineered,
                    high-efficiency solar solutions focused on reliability, safety,
                    and measurable performance.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-solarGreen/20 to-transparent blur-2xl rounded-full -z-10 opacity-50" />
                  <img
                    src="/about/journey.png"
                    alt="Journey Start"
                    className="rounded-[30px] shadow-xl w-full"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* STEP 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <ScrollReveal>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-bl from-solarOrange/20 to-transparent blur-2xl rounded-full -z-10 opacity-50" />
                    <img
                      src="/about/journey2.png"
                      alt="Expansion"
                      className="rounded-[30px] shadow-xl w-full"
                    />
                  </div>
                </ScrollReveal>
              </div>

              <div className="order-1 lg:order-2">
                <ScrollReveal delay={0.2}>
                  <div className="space-y-6">
                    <span className="text-6xl font-black text-solarGreen/20">2021</span>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                      Scaling Across Industries
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      We expanded into commercial and industrial solar projects,
                      delivering scalable solutions tailored to diverse operational
                      and environmental requirements.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="space-y-6">
                  <span className="text-6xl font-black text-solarGreen/20">2024</span>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                    Intelligent Energy Systems
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Today, Infinity Helios integrates smart monitoring, advanced
                    analytics, and automation to deliver intelligent energy systems
                    built for the future.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-solarGreen/20 to-solarOrange/20 blur-2xl rounded-full -z-10 opacity-50" />
                  <img
                    src="/about/journey3.png"
                    alt="Smart Energy"
                    className="rounded-[30px] shadow-xl w-full"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ================= VALUES ================= */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Target className="w-10 h-10" />, title: "Mission", desc: "Deliver engineered solar solutions with long-term value and measurable impact." },
              { icon: <Eye className="w-10 h-10" />, title: "Vision", desc: "Lead the global transition to intelligent, self-sustaining renewable energy." },
              { icon: <ShieldCheck className="w-10 h-10" />, title: "Values", desc: "Integrity, innovation, sustainability, and absolute engineering excellence." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-xl p-12 rounded-[40px] border border-slate-200 dark:border-white/10 group hover:border-solarGreen/50 transition-colors duration-500 h-full">
                  <div className="w-20 h-20 bg-solarGreen/10 rounded-3xl flex items-center justify-center text-solarGreen mb-8 group-hover:bg-solarGreen group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ================= CLOSING ================= */}
        <ScrollReveal>
          <div className="relative rounded-[60px] overflow-hidden bg-slate-950 p-10 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-solarGreen/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-solarOrange/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 space-y-8">
              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Powering Progress. <br />
                <span className="text-solarGreen text-glow">Protecting Tomorrow.</span>
              </h3>
              <p className="text-white/70 leading-relaxed max-w-2xl mx-auto text-lg md:text-xl font-light">
                Infinity Helios partners with organizations that demand performance,
                responsibility, and innovation — delivering energy systems built for
                generations to come.
              </p>
              <div className="pt-8">
                <button className="px-10 py-5 bg-solarGreen hover:bg-solarGreen/90 text-white font-black rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-solarGreen/20 flex items-center gap-3 mx-auto">
                  Partner with Us <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

