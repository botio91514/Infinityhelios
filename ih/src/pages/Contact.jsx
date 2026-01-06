import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactForm } from "../api/contact";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, Activity } from "lucide-react";

export default function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (location.state?.results) {
      const { results, monthlyBill, roofSpace } = location.state;
      setFormData(prev => ({
        ...prev,
        subject: "Solar Quote Request",
        message: `I'm interested in a solar solution based on the following calculator results:\n\n` +
          `- Monthly Bill: ₹${monthlyBill}\n` +
          `- Available Roof Space: ${roofSpace} sq. ft.\n` +
          `- Recommended System Size: ${results.systemSize} kW\n` +
          `- Estimated Cost: ₹${parseInt(results.estimatedCost).toLocaleString('en-IN')}\n` +
          `- Projected 25-Year Savings: ₹${parseInt(results.twentyFiveYearSavings).toLocaleString('en-IN')}\n\n` +
          `Please contact me with more details.`
      }));
    }
  }, [location.state]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await sendContactForm(formData);

      if (response.status === "mail_sent" || response.success) {
        setSubmitStatus("success");
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        console.error("CF7 Error Response:", response);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Our Office",
      details: "123 Solar Street, Energy City",
      subDetails: "India 400001",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Number",
      details: "+91 90000 00000",
      subDetails: "Mon - Sat: 9:00 AM - 6:00 PM",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Address",
      details: "info@infinityhelios.com",
      subDetails: "We'll respond within 24 hours",
    },
  ];

  return (
    <section className="min-h-screen bg-white dark:bg-solarBlue page-pt pb-24 relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-solarGreen/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-solarOrange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-solarGreen/10 text-solarGreen font-black text-[10px] uppercase tracking-[0.4em] mb-8"
          >
            <Activity className="w-4 h-4" /> Get in Touch
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-premium-h1 mb-8"
          >
            Let's Start Your <br className="hidden md:block" /> <span className="text-solarGreen">Sustainable Future</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-300 font-medium leading-relaxed"
          >
            Whether you have questions about residential panels or large-scale industrial projects, our solar experts are here to help you every step of the way.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10 ml-4">Contact Details</h2>

            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group p-8 rounded-[40px] bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 hover:border-solarGreen/30 transition-all shadow-xl flex items-center gap-8"
              >
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl flex items-center justify-center text-solarGreen shadow-inner group-hover:bg-solarGreen group-hover:text-solarBlue transition-all duration-500">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">{info.title}</h3>
                  <p className="text-lg font-black text-slate-900 dark:text-white mb-1 tracking-tight">{info.details}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">{info.subDetails}</p>
                </div>
              </motion.div>
            ))}

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-10 rounded-[45px] bg-slate-950 text-white shadow-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-solarGreen/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-solarGreen rounded-2xl flex items-center justify-center text-solarBlue mb-6 shadow-2xl shadow-solarGreen/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-[0.3em] mb-4">Dedicated Support</h4>
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  We aim to respond to all inquiries within 4 business hours. You'll work directly with a certified solar specialist.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form Main Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="bg-white/80 dark:bg-slate-950/40 backdrop-blur-3xl p-10 md:p-16 rounded-[60px] border border-slate-200 dark:border-white/10 shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-solarGreen/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <h2 className="text-3xl font-black mb-12 flex items-center gap-6 text-slate-900 dark:text-white tracking-tighter">
                <div className="w-2 h-10 bg-solarGreen rounded-full shadow-[0_0_15px_rgba(100,255,153,0.5)]" />
                Send a Message
              </h2>

              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-12 p-8 bg-solarGreen/10 border border-solarGreen/20 text-solarGreen rounded-[30px] flex items-center gap-6"
                  >
                    <div className="w-12 h-12 bg-solarGreen rounded-2xl flex items-center justify-center text-solarBlue flex-shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-widest">Message Sent Successfully</p>
                      <p className="text-xs font-medium opacity-70 mt-1">Thank you for reaching out. We will contact you shortly.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-12 p-8 bg-red-500/10 border border-red-500/20 text-red-500 rounded-[30px] flex items-center gap-6"
                  >
                    <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-widest">Something Went Wrong</p>
                      <p className="text-xs font-medium opacity-70 mt-1">Please check your internet connection and try again.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl px-8 py-5 text-sm font-bold text-slate-800 dark:text-white focus:border-solarGreen focus:ring-1 focus:ring-solarGreen transition-all outline-none placeholder:opacity-30 shadow-inner"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sharma.r@gmail.com"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl px-8 py-5 text-sm font-bold text-slate-800 dark:text-white focus:border-solarGreen focus:ring-1 focus:ring-solarGreen transition-all outline-none placeholder:opacity-30 shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl px-8 py-5 text-sm font-bold text-slate-800 dark:text-white focus:border-solarGreen focus:ring-1 focus:ring-solarGreen transition-all outline-none placeholder:opacity-30 shadow-inner"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Solar System Inquiry"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl px-8 py-5 text-sm font-bold text-slate-800 dark:text-white focus:border-solarGreen focus:ring-1 focus:ring-solarGreen transition-all outline-none placeholder:opacity-30 shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Your Message</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[40px] px-8 py-8 text-sm font-bold text-slate-800 dark:text-white focus:border-solarGreen focus:ring-1 focus:ring-solarGreen transition-all outline-none resize-none placeholder:opacity-30 shadow-inner"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-6 bg-solarGreen text-solarBlue font-black rounded-2xl shadow-2xl shadow-solarGreen/20 uppercase tracking-[0.3em] text-[11px] transition-all disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-solarBlue/30 border-t-solarBlue rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
