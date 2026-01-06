import { useState, useEffect } from "react";
import { Search, AlertCircle, ShoppingBag, LayoutGrid } from "lucide-react";
import { useLoader } from "../context/LoaderContext";
import { motion, AnimatePresence } from "framer-motion";
import Products from "../components/Products";
import API_BASE_URL from "../api/config";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchProducts = async () => {
      showLoader();
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories
        const cats = ["All", ...new Set(data.flatMap((p) => p.categories.map((c) => c.name)))];
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        hideLoader();
      }
    };

    fetchProducts();
  }, [showLoader, hideLoader]);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter((p) =>
        p.categories.some((c) => c.name === selectedCategory)
      );
    }

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  return (
    <div className="min-h-screen bg-white dark:bg-solarBlue page-pt pb-32 relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-solarGreen/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-[800px] h-[800px] bg-solarOrange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Header Section */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-solarGreen font-black tracking-[0.4em] uppercase text-[10px] mb-6"
            >
              Quality Solar Solutions
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-premium-h1 tracking-tighter mb-8"
            >
              Our <span className="text-solarGreen">Products</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl"
            >
              Find high-quality solar products for your home or business. We offer everything from individual panels to complete solar systems.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex items-center gap-8 bg-slate-50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 p-8 rounded-[40px] shadow-2xl"
          >
            <div className="flex flex-col items-center gap-2">
              <LayoutGrid className="w-6 h-6 text-solarGreen" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Items</span>
              <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">{products.length.toString().padStart(2, '0')}</span>
            </div>
          </motion.div>
        </div>

        {/* Filter & Search Terminal */}
        <div className="bg-white/80 dark:bg-slate-950/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[50px] p-10 md:p-14 shadow-3xl mb-24 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-solarGreen/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="flex flex-col xl:flex-row gap-12 relative z-10">
            {/* Search Module */}
            <div className="xl:w-1/3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block ml-4">Search Products</label>
              <div className="relative group/search">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/search:text-solarGreen transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-3xl py-6 pl-16 pr-8 text-sm font-black uppercase tracking-widest focus:outline-none focus:border-solarGreen/40 transition-all shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="xl:w-2/3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block ml-4">Categories</label>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`
                                        px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 relative overflow-hidden
                                        ${selectedCategory === cat
                        ? "bg-solarGreen text-solarBlue shadow-[0_15px_30px_rgba(100,255,153,0.3)]"
                        : "bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                      }
                                    `}
                  >
                    {cat}
                    {selectedCategory === cat && (
                      <motion.div layoutId="catGlow" className="absolute bottom-0 left-0 w-full h-[2px] bg-solarBlue/20" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {filteredProducts.length > 0 ? (
              <Products products={filteredProducts} />
            ) : (
              <div className="py-40 text-center bg-slate-50 dark:bg-white/5 rounded-[60px] border border-dashed border-slate-200 dark:border-white/10">
                <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                  <AlertCircle className="w-10 h-10 text-slate-300 dark:text-white/20" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">No products found</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Try adjusting your search or category filters.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                  className="mt-10 px-10 py-5 bg-solarGreen text-solarBlue rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 bg-slate-950 rounded-[60px] p-16 md:p-24 overflow-hidden relative group text-center"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-solarGreen/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-solarGreen/20 transition-colors duration-1000" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-solarOrange/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-solarGreen rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-3xl shadow-solarGreen/20 rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <ShoppingBag className="w-10 h-10 text-solarBlue" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-none">
              Need a custom <br />
              <span className="text-solarGreen">solar solution?</span>
            </h2>
            <p className="text-lg text-white/50 font-medium mb-12 max-w-xl mx-auto">
              Our engineering team can design a bespoke solar infrastructure tailored specifically to your energy requirements and site conditions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto px-12 py-6 bg-solarGreen text-solarBlue rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl">
                Contact Experts
              </button>
              <button className="w-full sm:w-auto px-12 py-6 border border-white/10 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                View Projects
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
