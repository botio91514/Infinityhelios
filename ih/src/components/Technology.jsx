import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function Technology() {
  const features = [
    {
      title: "High-Efficiency Cells",
      desc: "Advanced photovoltaic cells designed for maximum energy output.",
    },
    {
      title: "Smart Energy Monitoring",
      desc: "Real-time performance tracking with intelligent diagnostics.",
    },
    {
      title: "Sustainable Engineering",
      desc: "Built using eco-friendly materials and processes.",
    },
    {
      title: "Future-Ready Design",
      desc: "Optimized for scalability and next-generation energy systems.",
    },
  ];

  return (
    <section className="py-10 px-8">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <ScrollReveal yOffset={24} duration={1.2}>
            <h2 className="text-4xl font-bold mb-6">
              Technology that Powers the <span className="text-solarGreen">Future</span>
            </h2>

            <p className="opacity-80 leading-relaxed">
              At Infinity Helios, innovation is at the core of everything we build.
              Our solar technologies are engineered to deliver superior performance,
              long-term reliability, and a cleaner energy future.
            </p>
          </ScrollReveal>

          {/* RIGHT FEATURES */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.12}>
            {features.map((item, i) => (
              <StaggerItem key={i} yOffset={16}>
                <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800 transition-shadow duration-500 hover:shadow-lg">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
