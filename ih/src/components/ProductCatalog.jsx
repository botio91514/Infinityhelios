import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../api/woocommerce";
import { useCart } from "../context/CartContext";
import ScrollReveal from "./ScrollReveal";
import { ShoppingCart, ArrowRight } from "lucide-react";

function ProductCard({ product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product.id, 1);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col cursor-pointer relative"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="h-64 overflow-hidden bg-slate-50 dark:bg-slate-950 relative flex-shrink-0 border-b border-slate-100 dark:border-white/5">
        <img
          src={product.images?.[0]?.src || "/placeholder.jpg"}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Product Info */}
      <div className="p-8 flex flex-col flex-grow relative z-10 bg-white/50 dark:bg-transparent backdrop-blur-3xl">
        <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-solarGreen transition-colors duration-300 tracking-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-8 mt-auto flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>
          {product.regular_price && product.regular_price !== product.price && (
            <span className="text-xs text-red-500 font-black line-through opacity-50">
              ₹{Number(product.regular_price).toLocaleString('en-IN')}
            </span>
          )}
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block w-full mt-1">Inc. GST</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-auto group-hover:translate-y-0 translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 px-4 py-4 bg-solarGreen text-solarBlue rounded-2xl transition-all duration-300 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-solarGreen/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
          <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-solarGreen transition-colors">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductCatalog({ limit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(limit ? res.slice(0, limit) : res);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit]);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      let newItemsPerView = 4;
      if (window.innerWidth < 640) {
        newItemsPerView = 1;
      } else if (window.innerWidth < 1024) {
        newItemsPerView = 2;
      } else if (window.innerWidth < 1280) {
        newItemsPerView = 3;
      }

      setItemsPerView(newItemsPerView);
      setCurrentIndex(0);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(products.length / itemsPerView);

  // Auto-play
  useEffect(() => {
    if (totalSlides <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(intervalRef.current);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 6000);
    }
  };

  const getCurrentProducts = () => {
    const start = currentIndex * itemsPerView;
    return products.slice(start, start + itemsPerView);
  };

  return (
    <section className="relative pt-10 pb-12 bg-white dark:bg-solarBlue overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-main relative z-10">
        <ScrollReveal>
          <div className="mb-16 text-center max-w-4xl mx-auto">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-solarGreen px-5 py-2 bg-solarGreen/10 rounded-full mb-6 inline-block">
              Premium Range
            </span>
            <h2 className="text-premium-h2 mb-5">
              State of the Art <span className="text-solarGreen text-glow">Solar Solutions</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Engineered for efficiency, built for durability. Explore our top-tier renewables for a sustainable tomorrow.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        <div className="relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <div className="w-16 h-16 border-4 border-solarGreen border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Catalog...</p>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  {getCurrentProducts().map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots */}
              {totalSlides > 1 && (
                <div className="flex justify-center gap-4 mt-16">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentIndex
                        ? "w-12 bg-solarGreen shadow-[0_0_10px_rgba(100,255,153,0.5)]"
                        : "w-3 bg-slate-200 dark:bg-white/10 hover:bg-solarGreen/40"
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {limit && (
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-4 px-12 py-6 bg-slate-950 text-white rounded-[30px] font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl hover:bg-solarGreen hover:text-solarBlue transition-all duration-500 hover:scale-105 active:scale-95 group"
            >
              Explore Full Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
