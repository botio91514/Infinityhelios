import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactForm } from "../api/contact";
import { MapPin, Phone, Mail, Send, ShieldCheck, Activity, AlertCircle } from "lucide-react";
import SEO from "../components/SEO";

const InputField = ({ label, name, type = "text", placeholder, required = true, value, onChange, error }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {error && (
        <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 animate-pulse">
          <AlertCircle className="w-3 h-3" /> {error}
        </span>
      )}
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-2xl px-5 py-3 text-sm font-bold text-slate-800 dark:text-white focus:ring-1 transition-all outline-none placeholder:opacity-30 shadow-inner
          ${error
          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
          : 'border-slate-200 dark:border-white/10 focus:border-solarGreen focus:ring-solarGreen'
        }`}
    />
  </div>
);

export default function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter valid 10-digit mobile number";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      // Shake form or show toast? Errors are already displayed
      return;
    }

    setIsSubmitting(true);

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
        setErrors({});
      } else {
        setSubmitStatus("error");
        console.error("CF7 Error Response:", response);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 8000);
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
    <section className="min-h-screen bg-white dark:bg-solarBlue pt-20 md:pt-28 pb-12 relative overflow-hidden">
      <SEO
        title="Contact Us | Infinity Helios"
        description="Get in touch with Infinity Helios for solar inquiries, support, and custom quotes. Start your sustainable future today."
      />
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-solarGreen/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-solarOrange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solarGreen/10 text-solarGreen font-bold text-xs uppercase tracking-widest mb-4"
          >
            <Activity className="w-3 h-3" /> Get in Touch
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white"
          >
            Let's Start Your <br className="hidden md:block" /> <span className="text-solarGreen">Sustainable Future</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-300 font-medium leading-relaxed"
          >
            Whether you have questions about residential panels or large-scale industrial projects, our solar experts are here to help you every step of the way.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-2">Contact Details</h2>

            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group p-6 rounded-[30px] bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 hover:border-solarGreen/30 transition-all shadow-lg flex items-center gap-6"
              >
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-xl flex items-center justify-center text-solarGreen shadow-inner group-hover:bg-solarGreen group-hover:text-solarBlue transition-all duration-500">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{info.title}</h3>
                  <p className="text-base font-black text-slate-900 dark:text-white mb-0 tracking-tight">{info.details}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">{info.subDetails}</p>
                </div>
              </motion.div>
            ))}

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-[30px] bg-slate-950 text-white shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-solarGreen/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-10 h-10 bg-solarGreen rounded-xl flex items-center justify-center text-solarBlue mb-4 shadow-lg shadow-solarGreen/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-black text-xs uppercase tracking-widest mb-2">Dedicated Support</h4>
                <p className="text-xs text-white/50 leading-relaxed font-medium">
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
            <div className="bg-white/80 dark:bg-slate-950/40 backdrop-blur-3xl p-8 md:p-10 rounded-[40px] border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-solarGreen/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <h2 className="text-2xl font-black mb-8 flex items-center gap-4 text-slate-900 dark:text-white tracking-tight">
                <div className="w-1.5 h-8 bg-solarGreen rounded-full shadow-[0_0_15px_rgba(100,255,153,0.5)]" />
                Send a Message
              </h2>

              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-8 p-6 bg-solarGreen/10 border border-solarGreen/20 text-solarGreen rounded-[20px] flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-solarGreen rounded-xl flex items-center justify-center text-solarBlue flex-shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest">Message Sent Successfully</p>
                      <p className="text-xs font-medium opacity-70 mt-1">Thank you for reaching out. We will contact you shortly.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-8 p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-[20px] flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest">Something Went Wrong</p>
                      <p className="text-xs font-medium opacity-70 mt-1">Please check your internet connection and try again.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="e.g. Rahul Sharma"
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="sharma.r@gmail.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                  />
                  <InputField
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    placeholder="e.g. Solar System Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-3">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    {errors.message && (
                      <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 animate-pulse">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </span>
                    )}
                  </div>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-[30px] px-6 py-4 text-sm font-bold text-slate-800 dark:text-white focus:ring-1 transition-all outline-none resize-none placeholder:opacity-30 shadow-inner
                        ${errors.message
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-slate-200 dark:border-white/10 focus:border-solarGreen focus:ring-solarGreen'
                      }`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-solarGreen text-solarBlue font-black rounded-xl shadow-lg shadow-solarGreen/20 uppercase tracking-widest text-[10px] transition-all disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-solarBlue/30 border-t-solarBlue rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-3 h-3" />
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
