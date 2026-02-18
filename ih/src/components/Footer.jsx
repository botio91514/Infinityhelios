import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Instagram, Linkedin, Twitter, Facebook, ArrowRight, ShieldCheck, Zap, Loader2, Check } from "lucide-react";
import { sendContactForm } from "../api/contact";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await sendContactForm({
        name: "Subscriber",
        email,
        phone: "N/A",
        subject: "Newsletter Subscription",
        message: "User subscribed to newsletter via footer."
      });
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/5 pt-12">
      <div className="container-main pb-8 lg:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">

          {/* BRAND AND INFO */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <div>
              <h3 className="text-2xl font-black text-white mb-3 tracking-tighter flex items-center justify-center lg:justify-start gap-2">
                Infinity <span className="text-solarGreen text-glow">Helios</span>
              </h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
                Your premier digital marketplace for authentic, Tier-1 solar hardware.
                Connecting installers and businesses with global manufacturers for seamless procurement.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Get Wholesale Alerts</h5>
              <form onSubmit={handleSubscribe} className="relative max-w-sm mx-auto lg:mx-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-solarGreen focus:bg-white/10 outline-none transition-all duration-300 pr-12"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`absolute right-1.5 top-1.5 bottom-1.5 aspect-square rounded-lg flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-solarGreen/20 
                    ${status === "success" ? "bg-green-500 text-white" : status === "error" ? "bg-red-500 text-white" : "bg-solarGreen text-solarBlue"}`}
                >
                  {status === "loading" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : status === "success" ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                </button>
              </form>
              <p className="text-[10px] text-slate-500 font-medium">
                Subscribe for exclusive bulk deals and inventory updates.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex justify-center lg:justify-start gap-3">
              {[
                { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/company/infinityhelios" },
                { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com/infinityhelios" },
                { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com/infinityhelios" },
                { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com/infinityhelios" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-solarGreen/50 hover:bg-white/10 text-white transition-all flex items-center justify-center group"
                >
                  <span className="group-hover:scale-110 group-hover:text-solarGreen transition-all">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 lg:ml-auto text-center lg:text-left">
            <h4 className="font-black text-white mb-4 text-xs uppercase tracking-[0.2em]">Marketplace</h4>
            <ul className="space-y-2">
              {[
                { name: "Solar Panels", path: "/products?category=Solar Panels" },
                { name: "Inverters", path: "/products?category=Inverters" },
                { name: "Batteries", path: "/products?category=Batteries" },
                { name: "Track Order", path: "/track-order", highlight: true },
                { name: "Bulk Quotes", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-xs transition-all duration-300 flex items-center justify-center lg:justify-start gap-2 group ${link.highlight ? "text-solarGreen font-bold" : "text-slate-400 hover:text-white"
                      }`}
                  >
                    <ArrowRight className={`w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${link.highlight ? "opacity-100 translate-x-0" : ""}`} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <h4 className="font-black text-white mb-4 text-xs uppercase tracking-[0.2em]">Customer Support</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/maintenance" className="text-slate-400 hover:text-white transition-colors block lg:inline">Maintenance Services</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors block lg:inline">My Account</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-white transition-colors block lg:inline">Help Center & FAQ</Link></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-white transition-colors block lg:inline">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" className="text-slate-400 hover:text-white transition-colors block lg:inline">Shipping & Returns</Link></li>
              <li><Link to="/privacy-data" className="text-slate-400 hover:text-white transition-colors block lg:inline">Privacy Policy</Link></li>
              <li><Link to="/compliance" className="text-slate-400 hover:text-white transition-colors block lg:inline">Compliance</Link></li>
            </ul>
          </div>

          {/* CONTACT INFO CARD */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group text-center lg:text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-solarGreen/5 rounded-full blur-2xl group-hover:bg-solarGreen/10 transition-colors" />

              <h4 className="font-black text-white mb-6 text-xs uppercase tracking-[0.2em]">Contact Us</h4>
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-solarGreen tracking-widest">Global Headquarters</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Solar Heights, Energy District,<br />New Delhi, India 110001
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-solarGreen tracking-widest">Sales & Support</span>
                  <a href="tel:+919000000000" className="block text-lg font-black text-white hover:text-solarGreen transition-colors">
                    +91 90000 00000
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-3 opacity-40 justify-center">
                  <ShieldCheck className="w-5 h-5" />
                  <Zap className="w-5 h-5 text-solarGreen" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Authorized Distributor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-black/40">
        <div className="container-main py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-[9px] uppercase font-black tracking-[0.4em] text-white opacity-40">
              © {new Date().getFullYear()} INFINITY HELIOS ENERGY.
            </p>
            <p className="text-[9px] font-bold text-slate-600 tracking-widest">BUILT FOR AN INFINITE SUSTAINABLE FUTURE.</p>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
              <div className="w-1.5 h-1.5 bg-solarGreen rounded-full animate-pulse shadow-[0_0_10px_rgba(100,255,153,0.8)]"></div>
              <span className="text-[9px] font-black tracking-widest text-white/50 uppercase">Design & Developed by Gatistwam</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

