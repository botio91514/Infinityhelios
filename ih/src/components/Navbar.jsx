import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, ChevronRight, LayoutDashboard, LogOut, Search } from "lucide-react";
import logo from "../assets/ihlogo.png";

export default function Navbar({ darkMode, setDarkMode }) {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const secondaryLinks = [
    { name: "Solar Care", path: "/maintenance" },
    { name: "Knowledge Hub", path: "/learning-hub" },
  ];

  return (
    <nav className={`
      fixed top-0 left-0 w-full z-[100]
      transition-all duration-700 ease-out
      ${isScrolled
        ? "py-3 bg-white/80 dark:bg-solarBlue/85 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/5 shadow-2xl shadow-black/5"
        : "py-6 bg-transparent border-b border-transparent"
      }
    `}>
      <div className="container-main flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-[110] group">
          <img
            src={logo}
            alt="Infinity Helios"
            className={`
              h-12 md:h-14 w-auto object-contain transition-all duration-500
              ${isScrolled ? "scale-95" : "scale-100"}
              group-hover:brightness-110 drop-shadow-2xl
            `}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  text-[13px] font-black uppercase tracking-widest transition-all duration-300
                  ${location.pathname === link.path
                    ? "text-solarGreen"
                    : "text-slate-600 dark:text-white/70 hover:text-solarGreen"
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />

          <div className="flex items-center gap-6">
            <Link
              to="/calculator"
              className="px-6 py-2.5 bg-solarGreen/10 text-solarGreen text-[11px] font-black rounded-full hover:bg-solarGreen hover:text-solarBlue transition-all uppercase tracking-[0.15em] border border-solarGreen/20 shadow-lg shadow-solarGreen/5"
            >
              Calculator
            </Link>

            {/* Icons Group */}
            <div className="flex items-center gap-5">

              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
              >
                <Search className="w-5 h-5 text-slate-800 dark:text-white group-hover:text-solarGreen transition-colors" />
              </button>

              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

              <Link to="/cart" className="relative group p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                <ShoppingCart className="w-5 h-5 text-slate-800 dark:text-white group-hover:text-solarGreen transition-colors" />
                {(cart?.items_count > 0 || cart?.item_count > 0) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 bg-solarOrange text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-lg"
                  >
                    {cart.items_count || cart.item_count}
                  </motion.span>
                )}
              </Link>

              {user ? (
                <div className="relative group">
                  <Link to="/dashboard" className="flex items-center gap-3 p-1 pr-4 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 hover:border-solarGreen/30 transition-all">
                    <div className="w-8 h-8 rounded-full bg-solarGreen flex items-center justify-center text-solarBlue font-black text-xs uppercase tracking-tighter">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
                      Dashboard
                    </span>
                  </Link>
                  <div className="absolute top-full right-0 mt-4 w-48 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
                    <div className="bg-white dark:bg-solarBlue border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden backdrop-blur-2xl">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors text-xs font-bold"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-8 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-solarBlue text-[11px] font-black rounded-full hover:shadow-2xl hover:shadow-solarGreen/20 transition-all uppercase tracking-widest"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4 relative z-[110]">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
          >
            <Search className="w-6 h-6 text-slate-800 dark:text-white" />
          </button>

          <Link to="/cart" className="relative group p-2">
            <ShoppingCart className="w-6 h-6 text-slate-800 dark:text-white" />
            {(cart?.items_count > 0 || cart?.item_count > 0) && (
              <span className="absolute top-1 right-1 bg-solarOrange text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                {cart.items_count || cart.item_count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-lg z-[150] lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-[300px] sm:w-[350px] bg-white dark:bg-solarBlue z-[160] lg:hidden p-8 pt-24 border-l border-slate-200 dark:border-white/10"
              >
                <div className="flex flex-col h-full">
                  <div className="space-y-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Main Navigation</p>
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="flex items-center justify-between text-2xl font-black text-slate-900 dark:text-white"
                      >
                        {link.name}
                        <ChevronRight className="w-5 h-5 text-solarGreen" />
                      </Link>
                    ))}
                  </div>

                  <div className="mt-12 space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Support & More</p>
                    {secondaryLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="block text-sm font-bold text-slate-600 dark:text-white/60 hover:text-solarGreen transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      to="/calculator"
                      className="block text-sm font-black text-solarGreen uppercase tracking-widest pt-2"
                    >
                      Solar ROI Calculator
                    </Link>
                  </div>

                  <div className="mt-auto pt-8 border-t border-slate-100 dark:border-white/10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Appearance</span>
                      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                    </div>

                    {user ? (
                      <div className="space-y-3">
                        <Link to="/dashboard" className="flex items-center gap-3 w-full px-6 py-4 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest">
                          <LayoutDashboard className="w-4 h-4 text-solarGreen" />
                          Dashboard
                        </Link>
                        <button onClick={logout} className="flex items-center gap-3 w-full px-6 py-4 border border-red-500/20 text-red-500 rounded-2xl font-black text-sm uppercase tracking-widest">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="w-full px-6 py-4 bg-solarGreen text-solarBlue font-black text-sm uppercase tracking-widest rounded-2xl text-center shadow-xl shadow-solarGreen/20"
                      >
                        Login / Register
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Global Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-8 h-8 text-slate-400" />
              </button>

              <div className="w-full max-w-3xl text-center space-y-8">
                <motion.div
                  initial={{ title: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                    Search <span className="text-solarGreen">Infinity</span>
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg">Find products, solutions, and resources.</p>
                </motion.div>

                <motion.form
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSearch}
                  className="relative"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type to search..."
                    className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 text-3xl md:text-5xl font-bold py-6 text-center outline-none focus:border-solarGreen transition-all placeholder:text-slate-300 dark:placeholder:text-white/10 text-slate-900 dark:text-white"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-4 bg-solarGreen text-solarBlue rounded-full hover:scale-110 transition-transform">
                    <Search className="w-6 h-6" />
                  </button>
                </motion.form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-slate-400"
                >
                  <span className="opacity-50 uppercase tracking-widest text-xs">Trending:</span>
                  {['Solar Panels', 'Inverters', 'Batteries', 'Controllers'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                        navigate(`/products?search=${tag}`);
                        setIsSearchOpen(false);
                      }}
                      className="px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-lg hover:text-solarGreen hover:bg-white dark:hover:bg-white/10 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

