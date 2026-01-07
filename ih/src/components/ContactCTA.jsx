import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { sendContactForm } from "../api/contact";
import { Check, Loader2 } from "lucide-react";

export default function ContactCTA() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) return;

    setStatus("loading");
    try {
      await sendContactForm({
        ...formData,
        subject: "Quick Quote Request (Footer CTA)",
        message: "Requesting a free quote via homepage CTA."
      });
      setStatus("success");
      setFormData({ name: "", phone: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

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

        <StaggerContainer className="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center" staggerDelay={0.1}>
          <StaggerItem>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full md:w-auto px-5 py-4 rounded-full text-black outline-none border-2 border-transparent focus:border-solarGreen transition-all"
            />
          </StaggerItem>
          <StaggerItem>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full md:w-auto px-5 py-4 rounded-full text-black outline-none border-2 border-transparent focus:border-solarGreen transition-all"
            />
          </StaggerItem>
          <StaggerItem>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={status === "loading" || status === "success"}
              className={`px-8 py-4 rounded-full font-semibold transition flex items-center gap-2 min-w-[180px] justify-center
                ${status === "success" ? "bg-green-500 text-white" : "bg-solarGreen text-solarBlue"}
              `}
            >
              {status === "loading" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : status === "success" ? (
                <>
                  <Check className="w-5 h-5" /> Sent!
                </>
              ) : (
                "Get Free Quote"
              )}
            </motion.button>
          </StaggerItem>
        </StaggerContainer>
        {status === "error" && <p className="text-red-400 mt-4 text-sm">Failed to send. Please try again.</p>}
      </div>
    </section>
  );
}
