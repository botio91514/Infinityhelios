import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, PoundSterling, Map, Sun, TrendingUp, Leaf, ArrowRight, Info } from "lucide-react";
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

const SolarCalculator = () => {
    const navigate = useNavigate();
    // Input States
    const [monthlyBill, setMonthlyBill] = useState(150); // in GBP
    const [roofSpace, setRoofSpace] = useState(500); // in sq ft
    const [sunlight, setSunlight] = useState(1); // 0.8: Low, 1: Average, 1.2: High

    // Result States
    const [results, setResults] = useState({
        systemSize: 0,
        estimatedCost: 0,
        monthlySavings: 0,
        annualSavings: 0,
        paybackYears: 0,
        carbonOffset: 0, // tones/year
        twentyFiveYearSavings: 0
    });

    // Pricing & Tech Constants (Average UK Market Rates)
    const UNIT_COST = 0.29; // Average cost per unit in GBP (approx 29p/kWh)
    const KW_COST = 1800; // Average cost per KW in GBP (including installation)
    const SPACE_PER_KW = 70; // ~6-7m² per kW = ~70 sq ft
    const UNITS_PER_KW_DAY = 2.8; // 1KW produces ~2.8 units per day (UK Annual Average)

    useEffect(() => {
        // 1. Calculate possible system size based on roof space
        const possibleSystemSize = roofSpace / SPACE_PER_KW;

        // 2. Calculate required system size based on bill
        const monthlyUnits = monthlyBill / UNIT_COST;
        const dailyUnits = monthlyUnits / 30;
        const requiredSystemSize = dailyUnits / UNITS_PER_KW_DAY;

        // Use the smaller of the two (Optimization)
        const optimizedSystemSize = Math.max(0.5, Math.min(possibleSystemSize, requiredSystemSize));

        // 3. Financials
        const totalInvestment = optimizedSystemSize * KW_COST;
        const monthlyGenerationUnits = optimizedSystemSize * UNITS_PER_KW_DAY * 30 * sunlight;
        const actualMonthlySavings = Math.min(monthlyBill, monthlyGenerationUnits * UNIT_COST);
        const annualSavings = actualMonthlySavings * 12;
        const payback = annualSavings > 0 ? totalInvestment / annualSavings : 0;
        const lifetimeSavings = (annualSavings * 25) - totalInvestment;

        // 4. Environmental
        const co2Saved = optimizedSystemSize * 1.5;

        setResults({
            systemSize: optimizedSystemSize.toFixed(1),
            estimatedCost: totalInvestment.toFixed(0),
            monthlySavings: actualMonthlySavings.toFixed(0),
            annualSavings: annualSavings.toFixed(0),
            paybackYears: payback.toFixed(1),
            carbonOffset: co2Saved.toFixed(1),
            twentyFiveYearSavings: lifetimeSavings.toFixed(0)
        });
    }, [monthlyBill, roofSpace, sunlight]);

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-24 md:pt-28 pb-12 relative overflow-hidden">
            <SEO
                title="Solar ROI Calculator | Infinity Helios"
                description="Calculate your potential savings with solar energy. Estimate system cost, payback period, and carbon offset instantly."
                keywords="solar calculator, solar cost estimator, solar roi, solar loan calculator, solar panel cost india"
            />
            {/* High-End Background Effects */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container-main relative z-10 max-w-7xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="max-w-4xl mb-8 md:mb-10">
                    <ScrollReveal>
                        <span className="inline-block px-3 py-1 rounded-full bg-solarGreen/10 text-solarGreen text-xs font-bold tracking-widest uppercase mb-4">
                            Savings Engine
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
                            Solar <span className="text-solarGreen">ROI Calculator</span>
                        </h1>
                        <p className="max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                            Calculate your potential energy savings and environmental impact in seconds. Our engine uses local market rates to provide accurate projections.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                    {/* LEFT CLOUMN: INPUT CONTROLS */}
                    <div className="lg:col-span-4 space-y-5 md:space-y-6">
                        <ScrollReveal>
                            <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-5 md:p-6 rounded-[30px] shadow-2xl space-y-5 md:space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-solarGreen rounded-xl flex items-center justify-center text-solarBlue">
                                        <Zap className="w-4 h-4 fill-current" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Parameters</h3>
                                </div>

                                {/* Bill Input */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Bill</label>
                                        <span className="text-xl font-black text-solarGreen">£{monthlyBill.toLocaleString('en-GB')}</span>
                                    </div>
                                    <div className="relative pt-2">
                                        <input
                                            type="range"
                                            min="50"
                                            max="1000"
                                            step="10"
                                            value={monthlyBill}
                                            onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                                            className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-solarGreen"
                                        />
                                        <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                            <span>£50</span>
                                            <span>£1,000+</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Roof Space Input */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Roof Area</label>
                                        <span className="text-xl font-black text-solarGreen">{roofSpace} <span className="text-xs font-bold opacity-50">Sq.Ft</span></span>
                                    </div>
                                    <div className="relative pt-2">
                                        <input
                                            type="range"
                                            min="100"
                                            max="2000"
                                            step="50"
                                            value={roofSpace}
                                            onChange={(e) => setRoofSpace(parseInt(e.target.value))}
                                            className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-solarGreen"
                                        />
                                        <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                            <span>100</span>
                                            <span>2,000+</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Sunlight Exposure */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Sun Exposure</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 0.8, label: 'Moderate', icon: '🌥️' },
                                            { id: 1, label: 'Average', icon: '☀️' },
                                            { id: 1.2, label: 'Excellent', icon: '🔥' }
                                        ].map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setSunlight(option.id)}
                                                className={`flex flex-col items-center gap-1.5 p-2 md:p-3 rounded-xl border transition-all duration-300 ${sunlight === option.id
                                                    ? 'bg-solarGreen border-solarGreen text-solarBlue shadow-md shadow-solarGreen/20'
                                                    : 'border-slate-200 dark:border-white/10 hover:border-solarGreen/50 text-slate-600 dark:text-slate-400'
                                                    }`}
                                            >
                                                <span className="text-lg md:text-xl">{option.icon}</span>
                                                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">{option.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-start gap-2">
                                    <Info className="w-4 h-4 text-solarGreen flex-shrink-0" />
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                        Calculations are based on current UK market averages of £0.29/kWh and standardized MCS installation costs.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* RIGHT COLUMN: RESULTS VISUALIZATION */}
                    <div className="lg:col-span-8 space-y-5 md:space-y-6">
                        {/* THE BIG SAVINGS HERO */}
                        <ScrollReveal delay={0.2}>
                            <div className="relative bg-slate-950 rounded-[30px] p-6 md:p-10 overflow-hidden group">
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-solarGreen/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-solarGreen/20 transition-colors duration-1000" />
                                <div className="relative z-10 space-y-1 md:space-y-4">
                                    <span className="block text-solarGreen font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px] mb-1">Lifetime 25-Year Projection</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl md:text-5xl font-black text-white/40">£</span>
                                        {/* OPTIMIZED FONT SIZE FOR MOBILE */}
                                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white text-glow leading-none tracking-tighter break-all sm:break-normal">
                                            {parseInt(results.twentyFiveYearSavings).toLocaleString('en-GB')}
                                        </h2>
                                    </div>
                                    <p className="text-base md:text-xl text-white/60 font-light max-w-xl">
                                        Your total projected savings after accounting for system cost and maintenance.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* STATS GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {[
                                {
                                    label: "Payback Period",
                                    value: results.paybackYears,
                                    unit: "Years",
                                    icon: <TrendingUp className="w-5 h-5" />,
                                    color: "bg-solarOrange/10 text-solarOrange",
                                    border: "group-hover:border-solarOrange/30"
                                },
                                {
                                    label: "System Size",
                                    value: results.systemSize,
                                    unit: "kW",
                                    icon: <Zap className="w-5 h-5" />,
                                    color: "bg-solarGreen/10 text-solarGreen",
                                    border: "group-hover:border-solarGreen/30"
                                },
                                {
                                    label: "Annual Savings",
                                    value: `£${parseInt(results.annualSavings).toLocaleString('en-GB')}`,
                                    unit: "",
                                    icon: <PoundSterling className="w-5 h-5" />,
                                    color: "bg-blue-500/10 text-blue-500",
                                    border: "group-hover:border-blue-500/30"
                                },
                                {
                                    label: "Carbon Equity",
                                    value: results.carbonOffset,
                                    unit: "Tones/Yr",
                                    icon: <Leaf className="w-5 h-5" />,
                                    color: "bg-emerald-500/10 text-emerald-500",
                                    border: "group-hover:border-emerald-500/30"
                                }
                            ].map((stat, i) => (
                                <ScrollReveal key={i} delay={0.3 + (i * 0.1)}>
                                    <div className={`group bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[24px] p-5 flex items-center justify-between transition-all duration-500 ${stat.border}`}>
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">{stat.label}</span>
                                            <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                                                {stat.value} <span className="text-xs font-bold opacity-40">{stat.unit}</span>
                                            </h4>
                                        </div>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${stat.color}`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* CTA SECTION */}
                        <ScrollReveal delay={0.7}>
                            <div className="bg-solarGreen p-6 md:p-8 rounded-[30px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-solarGreen/10">
                                <div className="space-y-1 text-center md:text-left">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-solarBlue/60">Estimated Total Investment</span>
                                    <h3 className="text-2xl md:text-3xl font-black text-solarBlue">£{parseInt(results.estimatedCost).toLocaleString('en-GB')}</h3>
                                    <p className="text-solarBlue/70 font-medium italic text-xs">Including high-precision engineering and installation.</p>
                                </div>
                                <button
                                    onClick={() => navigate("/contact", { state: { results, monthlyBill, roofSpace } })}
                                    className="w-full md:w-auto px-8 py-3.5 bg-solarBlue text-white rounded-full font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 text-xs"
                                >
                                    Unlock Custom Quote
                                    <ArrowRight className="w-4 h-4 text-solarGreen" />
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolarCalculator;

