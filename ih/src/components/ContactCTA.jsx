import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { sendContactForm } from "../api/contact";
import { Check, Loader2 } from "lucide-react";

export default function ContactCTA() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) return;

    setStatus("loading");
    setErrorMessage("");
    try {
      await sendContactForm({
        ...formData,
        subject: "Quick Quote Request (Footer CTA)",
        message: "Requesting a free quote via homepage CTA."
      });
      setStatus("success");
      setFormData({ name: "", email: "", phone: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Submission Failed:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Failed to send. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section className="py-10 bg-solarBlue text-white">
      <div className="container-main text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-bold">
            Need a <span className="text-solarGreen">Custom Quote?</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-4 opacity-80 max-w-xl mx-auto">
            Looking for specific components or bulk pricing?
            Tell us what you need, and our team will build a tailored package for you.
          </p>
        </ScrollReveal>

        <StaggerContainer className="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center" staggerDelay={0.1}>
          <StaggerItem>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name / Company"
              className="w-full md:w-auto px-5 py-4 rounded-full text-black outline-none border-2 border-transparent focus:border-solarGreen transition-all"
            />
          </StaggerItem>
          <StaggerItem>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full md:w-auto px-5 py-4 rounded-full text-black outline-none border-2 border-transparent focus:border-solarGreen transition-all"
            />
          </StaggerItem>
          <StaggerItem>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone / Requirements"
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
                  <Check className="w-5 h-5" /> Request Sent
                </>
              ) : (
                "Get Free Quote"
              )}
            </motion.button>
          </StaggerItem>
        </StaggerContainer>
        {status === "error" && (
          <p className="text-red-400 mt-4 text-sm font-medium animate-pulse">{errorMessage}</p>
        )}
      </div>
    </section>
  );
}
