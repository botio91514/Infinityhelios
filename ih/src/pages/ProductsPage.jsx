import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "../api/woocommerce";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  SlidersHorizontal,
  ArrowUpDown,
  Tag
} from "lucide-react";

import SEO from "../components/SEO";

export default function ProductsPage() {
  const location = useLocation();
  // Data States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(1000000); // Max price default high
  const [sortOption, setSortOption] = useState("default");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync Search from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(decodeURIComponent(search));
    }
  }, [location.search]);

  // Derived Values
  const [maxPrice, setMaxPrice] = useState(100000);

  // Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);

        // Calculate max price for slider
        const max = data.length > 0 ? Math.max(...data.map(p => parseInt(p.price || 0))) : 100000;
        setMaxPrice(max);
        setPriceRange(max);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Extract Categories
  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    products.forEach(p => {
      p.categories?.forEach(c => cats.add(c.name));
    });
    return Array.from(cats);
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.short_description?.toLowerCase().includes(query) ||
        p.categories?.some(c => c.name.toLowerCase().includes(query))
      );
    }

    // 2. Category
    if (selectedCategory !== "All") {
      result = result.filter(p => p.categories?.some(c => c.name === selectedCategory));
    }

    // 3. Price
    result = result.filter(p => parseInt(p.price || 0) <= priceRange);

    // 4. Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, sortOption]);

  // Strip HTML helper
  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-28 pb-12 transition-colors duration-300 relative">
      <SEO
        title="Solar Marketplace | Infinity Helios"
        description="Browse our extensive catalog of high-efficiency solar panels, inverters, and accessories. Find the perfect energy solution for your needs."
      />
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-main max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-solarGreen/10 text-solarGreen text-xs font-bold tracking-widest uppercase mb-4">
              Our Collection
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Solar <span className="text-solarGreen">Marketplace</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Explore high-efficiency panels, inverters, and accessories for your energy needs.
            </p>
          </motion.div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/10 rounded-xl font-bold shadow-sm border border-slate-200 dark:border-white/10 w-full md:w-auto justify-center"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          {/* SIDEBAR - FILTERS */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              lg:block lg:col-span-1 space-y-8
              ${showMobileFilters ? "block" : "hidden"}
            `}
          >
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[30px] p-6 shadow-xl sticky top-28">

              {/* Search */}
              <div className="mb-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <Search className="w-3 h-3" /> Search
                </h3>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Find products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-solarGreen focus:ring-1 focus:ring-solarGreen transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-solarGreen transition-colors" />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Categories
                </h3>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-between
                        ${selectedCategory === cat
                          ? "bg-solarGreen text-solarBlue shadow-md shadow-solarGreen/20"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                        }
                      `}
                    >
                      {cat}
                      {selectedCategory === cat && <motion.div layoutId="sc" className="w-1.5 h-1.5 bg-solarBlue rounded-full" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Filter className="w-3 h-3" /> Max Price
                  </h3>
                  <span className="text-xs font-black text-solarGreen">£{priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-solarGreen"
                />
                <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400 uppercase">
                  <span>£0</span>
                  <span>£{maxPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Sort Logic */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <ArrowUpDown className="w-3 h-3" /> Sort By
                </h3>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full appearance-none bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm font-bold outline-none focus:border-solarGreen cursor-pointer text-slate-700 dark:text-white"
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

            </div>
          </motion.aside>

          {/* MAIN CONTENT - GRID */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-12 h-12 border-4 border-solarGreen border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Catalog...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={product.id}
                    >
                      <ProductCard
                        id={product.id}
                        title={product.name}
                        description={stripHtml(product.short_description || product.description)}
                        image={product.images?.[0]?.src}
                        price={product.price}
                        regular_price={product.regular_price}
                        sale_price={product.sale_price}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-24 bg-white/50 dark:bg-white/5 rounded-[30px] border border-slate-200 dark:border-white/10">
                <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-slate-300 dark:text-white/20" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No Products Found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xs mx-auto">
                  We couldn't find any products matching your current filters. Try adjusting your search or criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setPriceRange(maxPrice);
                  }}
                  className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
