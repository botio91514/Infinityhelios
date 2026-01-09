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
import SEO from "../components/SEO";

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
    <section className="relative min-h-screen bg-white dark:bg-solarBlue pt-20 md:pt-28 pb-12 overflow-hidden">
      <SEO
        title="About Infinity Helios | Our Story & Vision"
        description="Learn about Infinity Helios, a leader in advanced solar solutions. We engineer high-performance renewable energy systems for a sustainable future."
      />
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10 max-w-7xl mx-auto px-6">
        {/* ================= HERO ================= */}
        <div className="max-w-4xl mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-solarGreen/10 text-solarGreen text-xs font-bold tracking-widest uppercase mb-4">
              Who We Are
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white"
          >
            Engineering the <br />
            <span className="text-solarGreen">Next Generation</span> <br />
            of Clean Energy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light"
          >
            Infinity Helios is a technology-driven solar energy company focused on
            designing intelligent, high-performance renewable power systems that
            scale from individual homes to global energy infrastructure.
          </motion.p>
        </div>

        {/* ================= IMAGE STORY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16 items-center">
          <ScrollReveal>
            <div className="relative group">
              <div className="absolute inset-0 bg-solarGreen/20 rounded-[30px] blur-2xl group-hover:blur-3xl transition-all duration-700 -z-10" />
              <img
                src="/about/solarfarm.jpg"
                alt="Solar Plant"
                className="rounded-[30px] shadow-xl w-full object-cover max-h-[400px] border border-white/10"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black leading-tight text-slate-900 dark:text-white">
                Built on Precision. <br />
                <span className="text-solarGreen">Driven by Purpose.</span>
              </h2>
              <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
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

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10">
                  <Zap className="w-4 h-4 text-solarGreen" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">High Efficiency</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10">
                  <ShieldCheck className="w-4 h-4 text-solarGreen" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Certified Quality</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ================= OUR JOURNEY ================= */}
        <div className="py-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-solarGreen font-bold tracking-widest uppercase text-xs mb-2 block">Our Evolution</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">The Road to <span className="text-solarGreen">Innovation</span></h2>
            </div>
          </ScrollReveal>

          <div className="space-y-12 md:space-y-16 max-w-5xl mx-auto">
            {/* STEP 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <ScrollReveal>
                <div className="space-y-4">
                  <span className="text-5xl font-black text-solarGreen/20">2018</span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                    Foundation & Vision
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
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
                    className="rounded-[20px] shadow-lg w-full max-h-[300px] object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* STEP 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <ScrollReveal>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-bl from-solarOrange/20 to-transparent blur-2xl rounded-full -z-10 opacity-50" />
                    <img
                      src="/about/journey2.png"
                      alt="Expansion"
                      className="rounded-[20px] shadow-lg w-full max-h-[300px] object-cover"
                    />
                  </div>
                </ScrollReveal>
              </div>

              <div className="order-1 lg:order-2">
                <ScrollReveal delay={0.2}>
                  <div className="space-y-4">
                    <span className="text-5xl font-black text-solarGreen/20">2021</span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                      Scaling Across Industries
                    </h3>
                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      We expanded into commercial and industrial solar projects,
                      delivering scalable solutions tailored to diverse operational
                      and environmental requirements.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <ScrollReveal>
                <div className="space-y-4">
                  <span className="text-5xl font-black text-solarGreen/20">2024</span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                    Intelligent Energy Systems
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
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
                    className="rounded-[20px] shadow-lg w-full max-h-[300px] object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ================= VALUES ================= */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Target className="w-8 h-8" />, title: "Mission", desc: "Deliver engineered solar solutions with long-term value and measurable impact." },
              { icon: <Eye className="w-8 h-8" />, title: "Vision", desc: "Lead the global transition to intelligent, self-sustaining renewable energy." },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Values", desc: "Integrity, innovation, sustainability, and absolute engineering excellence." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-xl p-8 rounded-[30px] border border-slate-200 dark:border-white/10 group hover:border-solarGreen/50 transition-colors duration-500 h-full">
                  <div className="w-16 h-16 bg-solarGreen/10 rounded-2xl flex items-center justify-center text-solarGreen mb-6 group-hover:bg-solarGreen group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ================= CLOSING ================= */}
        <ScrollReveal>
          <div className="relative rounded-[40px] overflow-hidden bg-slate-950 p-8 md:p-12 text-center mt-8">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-solarGreen/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-solarOrange/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Powering Progress. <br />
                <span className="text-solarGreen text-glow">Protecting Tomorrow.</span>
              </h3>
              <p className="text-white/70 leading-relaxed max-w-xl mx-auto text-base md:text-lg font-light">
                Infinity Helios partners with organizations that demand performance,
                responsibility, and innovation — delivering energy systems built for
                generations to come.
              </p>
              <div className="pt-4">
                <button className="px-8 py-4 bg-solarGreen hover:bg-solarGreen/90 text-white font-black rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-solarGreen/20 flex items-center gap-3 mx-auto text-sm tracking-widest uppercase">
                  Partner with Us <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

