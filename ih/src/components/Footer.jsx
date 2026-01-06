import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Instagram, Linkedin, Twitter, Facebook, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscription successful! Welcome to the Helios family.");
    setEmail("");
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/5 pt-24">
      <div className="container-main pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12">

          {/* BRAND AND INFO */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tighter flex items-center gap-2">
                Infinity <span className="text-solarGreen text-glow">Helios</span>
              </h3>
              <p className="text-lg text-slate-400 font-light leading-relaxed max-w-sm">
                Engineering a sustainable future through intelligent solar infrastructure and high-performance energy systems.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Join the Clean Revolution</h5>
              <form onSubmit={handleSubscribe} className="relative max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-solarGreen focus:bg-white/10 outline-none transition-all duration-300 pr-16"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 aspect-square bg-solarGreen text-solarBlue rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-solarGreen/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-slate-500 font-medium">By subscribing, you agree to our Terms of Technology.</p>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {[
                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Instagram className="w-5 h-5" />, href: "#" },
                { icon: <Facebook className="w-5 h-5" />, href: "#" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-solarGreen/50 hover:bg-white/10 text-white transition-all flex items-center justify-center group"
                >
                  <span className="group-hover:scale-110 group-hover:text-solarGreen transition-all">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="font-black text-white mb-8 text-xs uppercase tracking-[0.2em]">Engineering</h4>
            <ul className="space-y-4">
              {[
                { name: "Solar Panels", path: "/products" },
                { name: "ROI Calculator", path: "/calculator", highlight: true },
                { name: "Technical Specs", path: "/learning-hub" },
                { name: "Portfolio", path: "/projects" },
                { name: "Our Science", path: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-all duration-300 flex items-center gap-2 group ${link.highlight ? "text-solarGreen font-bold" : "text-slate-400 hover:text-white"
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
          <div className="lg:col-span-2">
            <h4 className="font-black text-white mb-8 text-xs uppercase tracking-[0.2em]">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/maintenance" className="text-slate-400 hover:text-white transition-colors">Monitoring Care</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">Client Dashboard</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Inquiry Support</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Privacy & Data</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Compliance</Link></li>
            </ul>
          </div>

          {/* CONTACT INFO CARD */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-solarGreen/5 rounded-full blur-2xl group-hover:bg-solarGreen/10 transition-colors" />

              <h4 className="font-black text-white mb-8 text-xs uppercase tracking-[0.2em]">Global Command</h4>
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-solarGreen tracking-widest">Headquarters</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    Solar Heights, Energy District,<br />New Delhi, India 110001
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-solarGreen tracking-widest">Contact Directly</span>
                  <a href="tel:+919000000000" className="block text-2xl font-black text-white hover:text-solarGreen transition-colors">
                    +91 90000 00000
                  </a>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-4 opacity-40">
                  <ShieldCheck className="w-6 h-6" />
                  <Zap className="w-6 h-6 text-solarGreen" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">ISO 9001 CERTIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-black/40">
        <div className="container-main py-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-white opacity-40">
              © {new Date().getFullYear()} INFINITY HELIOS ENERGY.
            </p>
            <p className="text-[10px] font-bold text-slate-600 tracking-widest">BUILT FOR AN INFINITE SUSTAINABLE FUTURE.</p>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/5">
              <div className="w-2 h-2 bg-solarGreen rounded-full animate-pulse shadow-[0_0_10px_rgba(100,255,153,0.8)]"></div>
              <span className="text-[10px] font-black tracking-widest text-white/50 uppercase">Grid Status: Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

