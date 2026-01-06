import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export default function ContactCTA() {
  return (
    <section className="section bg-solarBlue text-white">
      <div className="container-main text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-bold">
            Ready to Switch to <span className="text-solarGreen">Solar?</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-4 opacity-80 max-w-xl mx-auto">
            Get a free solar consultation and discover how Infinity Helios
            can power your home or business sustainably.
          </p>
        </ScrollReveal>

        <StaggerContainer className="mt-10 flex flex-col md:flex-row gap-4 justify-center" staggerDelay={0.1}>
          <StaggerItem>
            <input
              type="text"
              placeholder="Your Name"
              className="px-5 py-4 rounded-full text-black outline-none"
            />
          </StaggerItem>
          <StaggerItem>
            <input
              type="tel"
              placeholder="Phone Number"
              className="px-5 py-4 rounded-full text-black outline-none"
            />
          </StaggerItem>
          <StaggerItem>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-solarGreen font-semibold transition"
            >
              Get Free Quote
            </motion.button>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
