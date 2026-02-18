import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function Technology() {


  return (
    <section className="py-10 px-8">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <ScrollReveal yOffset={24} duration={1.2}>
            <h2 className="text-4xl font-bold mb-6">
              Your Trusted Source for <span className="text-solarGreen">Solar Hardware</span>
            </h2>

            <p className="opacity-80 leading-relaxed">
              At Infinity Helios, we supply only the highest quality solar components to installers,
              businesses, and homeowners. We simplify the supply chain so you can focus on building.
            </p>
          </ScrollReveal>

          {/* RIGHT FEATURES */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.12}>
            {[
              { title: "Authentic Tier-1 Brands", desc: "100% genuine products from global market leaders." },
              { title: "Fast & Secure Shipping", desc: "Reliable logistics partners for safe, on-time delivery worldwide." },
              { title: "Technical Support", desc: "Access our experts for compatibility checks and system sizing." },
              { title: "Manufacturer Warranty", desc: "Full warranty coverage on all modules, inverters, and storage." }
            ].map((item, i) => (
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
