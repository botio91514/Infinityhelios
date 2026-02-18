import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import Stats from "../components/Stats";
import ProductCatalog from "../components/ProductCatalog";
import Technology from "../components/Technology";
import ContactCTA from "../components/ContactCTA";
import Testimonials from "../components/Testimonials";
import RollingBanner from "../components/RollingBanner";
import CategoryGrid from "../components/CategoryGrid";
import ShopByCategory from "../components/ShopByCategory";
import ShopByBrand from "../components/ShopByBrand";

import SEO from "../components/SEO";
import commercialImg from "../assets/products/commercial.jpg";

export default function Home() {
  return (
    <>
      <SEO
        title="Infinity Helios | Advanced Solar Solutions & Installation"
        description="Transform your energy future with Infinity Helios. We provide top-tier solar panels, inverters, and complete installation services for homes and businesses."
      />
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] md:min-h-[100vh] flex items-center overflow-hidden">
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={commercialImg}
            className="w-full h-full object-cover scale-105"
          >
            <source src="/hero/solar.mp4" type="video/mp4" />
          </video>
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-solarBlue via-solarBlue/60 to-transparent opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-solarBlue via-transparent to-transparent opacity-60"></div>
        </div>

        {/* HERO CONTENT */}
        <div className="container-main relative z-10 w-full pt-24 pb-20 md:pt-32 md:pb-32 lg:pb-48">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solarGreen/20 backdrop-blur-md border border-solarGreen/30"
            >
              <span className="w-2 h-2 rounded-full bg-solarGreen animate-pulse"></span>
              <span className="text-solarGreen text-xs font-bold tracking-widest uppercase">Premium Solar Hardware Marketplace</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-premium-h2 text-white mb-10"
            >
              The World's Best <br />
              <span className="text-solarGreen text-glow">Solar Components</span> <br />
              Direct to You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-xl md:text-2xl text-white/80 mb-12 font-light leading-relaxed"
            >
              Shop Tier-1 Modules, Inverters, Mounting Systems, and Batteries.
              High-efficiency hardware for every project size, delivered with speed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-6"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(100, 255, 153, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-6 py-3 md:px-10 md:py-5 rounded-full bg-solarGreen text-solarBlue font-black transition-all duration-300 flex items-center gap-3"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 md:px-10 md:py-5 rounded-full border-2 border-white/20 text-white bg-white/5 backdrop-blur-xl transition-all duration-300 flex items-center gap-3 font-bold"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Bulk Orders
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/20 flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-solarGreen rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= REST OF PAGE ================= */}
      <div className="bg-white dark:bg-solarBlue">
        <div className="relative z-20 -mt-10">
          <RollingBanner />
        </div>

        <Stats />
        <CategoryGrid />
        <ShopByCategory />
        <ShopByBrand limit={4} />
        <ProductCatalog limit={4} />
        <Technology />
        <Testimonials />
        <ContactCTA />
      </div>
    </>
  );
}
