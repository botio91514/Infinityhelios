import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "../context/ProductContext";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ShopByBrand from "../components/ShopByBrand";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  SlidersHorizontal,
  ArrowUpDown,
  Tag,
  LayoutGrid,
  Sun,
  Battery,
  Zap,
  Hammer,
  Package,
  Building2,
  Cable,
  Unplug,
  Gauge,
  HelpCircle
} from "lucide-react";

import SEO from "../components/SEO";

// Configuration for Big Category Icons
const CATEGORY_ITEMS = [
  { id: "All", label: "All Products", subLabel: "Browse Full Catalog", icon: LayoutGrid, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "Solar Panels", label: "Solar Panels", subLabel: "Modules, Mono, Bifacial", icon: Sun, color: "text-solarOrange", bg: "bg-solarOrange/10" },
  { id: "Inverters", label: "Inverters", subLabel: "String, Hybrid, Micro", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { id: "Battery", label: "Battery", subLabel: "Li-Ion, High Voltage, Stackable", icon: Battery, color: "text-green-500", bg: "bg-green-500/10" },
  { id: "Storage Package", label: "Storage Package", subLabel: "All-in-One, ESS Systems", icon: Package, color: "text-blue-600", bg: "bg-blue-600/10" },
  { id: "Charger", label: "Charger", subLabel: "EV Chargers, Fast Charge", icon: Zap, color: "text-green-600", bg: "bg-green-600/10" },
  { id: "Cable", label: "Cable", subLabel: "DC, AC, Earth Cables", icon: Cable, color: "text-red-500", bg: "bg-red-500/10" },
  { id: "Cable Connector", label: "Cable Connector", subLabel: "MC4, Branch, Tools", icon: Unplug, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { id: "Metering Device", label: "Metering Device", subLabel: "Smart Meters, CT Clamps", icon: Gauge, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { id: "Accessories", label: "Accessories", subLabel: "Isolators, Safety", icon: Hammer, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "Mounting Systems", label: "Mounting Systems", subLabel: "Rails, Clamps, Hooks", icon: Building2, color: "text-orange-600", bg: "bg-orange-600/10" },
  { id: "Others", label: "Others", subLabel: "Monitoring, Comms, Tech", icon: HelpCircle, color: "text-gray-500", bg: "bg-gray-500/10" },
];

// Configuration for Brands
const BRAND_ITEMS = [
  "Aiko", "Dmegc", "Emlite", "Enphase"
];

export default function ProductsPage() {
  const location = useLocation();
  // Data States
  const { products, loading } = useProducts();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All"); // New Brand State
  const [priceRange, setPriceRange] = useState(1000000); // Max price default high
  const [sortOption, setSortOption] = useState("default");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  // Sync Search & Category from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    const category = params.get("category");
    const brand = params.get("brand");

    if (search || category || brand) {
      setViewMode("list"); // Switch to list view if filters are present

      if (search) {
        setSearchQuery(decodeURIComponent(search));
      }

      if (category) {
        const decodedCategory = decodeURIComponent(category);
        const knownCategory = CATEGORY_ITEMS.find(c => c.id === decodedCategory || c.label === decodedCategory);
        if (knownCategory) {
          setSelectedCategory(knownCategory.id);
        } else {
          setSelectedCategory(decodedCategory);
        }
        setSelectedBrand("All");
      }

      if (brand) {
        const decodedBrand = decodeURIComponent(brand);
        setSelectedBrand(decodedBrand);
        if (!category) setSelectedCategory("All");
      }
    } else {
      // No params - default to Grid View
      setViewMode("grid");
      setSelectedCategory("All");
      setSelectedBrand("All");
      setSearchQuery("");
    }
  }, [location.search]);

  // Derived Values
  const [maxPrice, setMaxPrice] = useState(100000);

  // Update Max Price when products load
  useEffect(() => {
    if (products.length > 0) {
      const max = Math.max(...products.map(p => parseInt(p.price || 0)));
      setMaxPrice(max);
      setPriceRange(max);
    }
  }, [products]);

  // Extract Categories (Merging simpler string matching from Big Icons with actual WP categories)
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

    // 2. Category (Big Icon Logic with Aliases)
    if (selectedCategory !== "All") {
      const categoryAliases = {
        "Solar Panels": ["Solar Panel", "Solar Panels", "Solar Plate", "PV Module", "Module", "Plate", "Panel"],
        "Inverters": ["Inverter", "Inverters"],
        "Batteries": ["Battery", "Batteries", "Storage", "Powerwall", "Cell"],
        "Cables": ["Cable", "Cables"],
        "Connectors": ["Connector", "Connectors", "Cable Connector", "Cable Connectors"],
        "Metering": ["Meter", "Meters", "Smart Meter", "Metering Device", "Metering Devices"],
        "Mounting Systems": ["Mounting", "Mounting System", "Mounting Systems", "Rails", "Clamps", "Hooks", "K2"],
        "Accessories": ["Accessory", "Accessories"],
        "Others": ["Uncategorized", "Other", "Others"]
      };

      const aliases = categoryAliases[selectedCategory] || [selectedCategory];
      const lowerAliases = aliases.map(a => a.toLowerCase());

      result = result.filter(p => {
        // STRICT MODE: Check Categories ONLY
        // We check if the product has a category that EXACTLY matches one of our aliases (case-insensitive)
        const catMatch = p.categories?.some(c =>
          lowerAliases.some(alias => c.name.toLowerCase() === alias)
        );

        return catMatch;
      });
    }

    // 3. Brand Filter
    if (selectedBrand !== "All") {
      const brandQuery = selectedBrand.toLowerCase();
      result = result.filter(p =>
        // 1. Check Product Name
        p.name.toLowerCase().includes(brandQuery) ||
        // 2. Check Categories
        p.categories?.some(c => c.name.toLowerCase().includes(brandQuery)) ||
        // 3. Check Tags (if available)
        p.tags?.some(t => t.name.toLowerCase().includes(brandQuery)) ||
        // 4. Check Attributes (e.g. if 'Brand' attribute is set)
        p.attributes?.some(a => a.options?.some(o => o.toLowerCase().includes(brandQuery))) ||
        // 5. Check Short Description (often contains brand mentions)
        p.short_description?.toLowerCase().includes(brandQuery)
      );
    }

    // 4. Price
    result = result.filter(p => parseInt(p.price || 0) <= priceRange);

    // 5. Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, sortOption]);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
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
              Showing <span className="text-solarGreen font-bold">{filteredProducts.length}</span> premium products available for you.
            </p>
          </motion.div>
        </div>

        {/* Main Content Layout */}

        {/* VIEW MODE: GRID (Categories) */}
        {viewMode === "grid" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16"
          >
            {/* Show ALL Categories including "All Products" */}
            {CATEGORY_ITEMS.map((item) => {
              const Icon = item.icon;

              const count = products.filter(p => {
                if (item.id === "All") return true;

                const categoryAliases = {
                  "Solar Panels": ["Solar Panel", "Solar Panels", "Solar panels", "PV Module", "Module"],
                  "Inverters": ["Inverter", "Inverters"],
                  "Battery": ["Battery", "Batteries", "Storage", "Cell"],
                  "Storage Package": ["Storage Package", "Storage Packages"],
                  "Charger": ["Charger", "Chargers", "EV Charger"],
                  "Cable": ["Cable", "Cables"],
                  "Cable Connector": ["Cable Connector", "Connector", "Connectors"],
                  "Metering Device": ["Metering Device", "Meter", "Meters", "Smart Meter"],
                  "Mounting Systems": ["Mounting", "Mounting System", "Mounting Systems", "Rails", "Clamps", "Hooks", "K2"],
                  "Accessories": ["Accessories", "Accessory", "Clamp", "Eps Box"],
                  "Others": ["Uncategorized", "Other", "Others", "Display", "Dongle", "Reciver", "Stick", "Transmitter"]
                };
                const aliases = categoryAliases[item.id] || [item.id];
                const lowerAliases = aliases.map(a => a.toLowerCase());
                return p.categories?.some(c => lowerAliases.some(alias => c.name.toLowerCase() === alias));
              }).length;

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedCategory(item.id);
                    setViewMode("list"); // Switch to List View
                  }}
                  className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center transition-all duration-300 group shadow-lg"
                >
                  <div className={`w-32 h-32 rounded-full ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}>
                    <Icon className={`w-12 h-12 ${item.color} relative z-10`} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-solarGreen transition-colors">
                    {item.label}
                  </h3>

                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {item.subLabel.split(", ").map((sub, i) => (
                      <span key={i} className="block">{sub}</span>
                    ))}
                  </div>

                  <div className="mt-6 px-4 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:bg-solarGreen group-hover:text-solarBlue transition-colors">
                    {count} Products
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          /* product list mode */
          <div className="mb-8">
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedBrand("All");
                setViewMode("grid"); // Back to Grid View
                // Optional: Clear URL params here if needed? Not strictly required as state handles it.
              }}
              className="mb-8 flex items-center gap-3 px-6 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:bg-solarGreen hover:text-solarBlue hover:border-solarGreen transition-all duration-300 group"
            >
              <LayoutGrid className="w-5 h-5 group-hover:scale-110 transition-transform" /> Back to Categories
            </button>

            {/* Horizontal Scrollable Filter List Removed */}
            {/* <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide"> ... </div> */}
          </div>
        )}

        {/* 2. Product Grid (Only show if NOT in Overview Mode) */}
        {/* Product List Content - Only visible when NOT in Grid Mode */}
        {viewMode !== "grid" && (
          <>
            {/* Advanced Filters Toggle & Mobile Actions */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/10 rounded-xl font-bold shadow-sm border border-slate-200 dark:border-white/10 text-sm hover:bg-slate-50 dark:hover:bg-white/20 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {showMobileFilters ? "Hide Advanced Filters" : "Advanced Filters"}
              </button>
            </div>

            <div className="flex flex-col">

              {/* FILTER PANEL (Collapsible Top Section) */}
              <AnimatePresence>
                {showMobileFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                    animate={{ height: "auto", opacity: 1, marginBottom: 32 }}
                    exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[30px] p-6 shadow-xl relative z-10">

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Search */}
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block flex items-center gap-2">
                            <Search className="w-3 h-3 text-solarGreen" /> Search
                          </label>
                          <div className="relative group">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-solarGreen focus:ring-1 focus:ring-solarGreen transition-all placeholder:text-slate-400"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-solarGreen transition-colors" />
                          </div>
                        </div>

                        {/* Categories */}
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block flex items-center gap-2">
                            <Tag className="w-3 h-3 text-solarGreen" /> Categories
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                              <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`
                              px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border border-transparent
                              ${selectedCategory === cat
                                    ? "bg-solarGreen text-solarBlue shadow-md shadow-solarGreen/20"
                                    : "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-solarGreen/50 hover:bg-white dark:hover:bg-white/10"
                                  }
                            `}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price Range */}
                        <div>
                          <div className="flex justify-between items-end mb-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                              <Filter className="w-3 h-3 text-solarGreen" /> Budget
                            </label>
                            <span className="text-xs font-black text-solarGreen bg-solarGreen/10 px-2 py-1 rounded-md">
                              £{priceRange.toLocaleString()}
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            step="1000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-100 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-solarGreen"
                          />
                          <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>£0</span>
                            <span>£{maxPrice.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Sort Logic */}
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block flex items-center gap-2">
                            <ArrowUpDown className="w-3 h-3 text-solarGreen" /> Sort By
                          </label>
                          <div className="relative">
                            <select
                              value={sortOption}
                              onChange={(e) => setSortOption(e.target.value)}
                              className="w-full appearance-none bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm font-bold outline-none focus:border-solarGreen cursor-pointer text-slate-700 dark:text-white"
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>







              {/* MAIN CONTENT - GRID */}
              <div className="lg:col-span-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <div className="w-12 h-12 border-4 border-solarGreen border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Catalog...</p>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    <AnimatePresence>
                      {filteredProducts.map((product) => (
                        <motion.div
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
          </>
        )}
        {/* Brand Section - Only visible in Overview Mode */}
        {viewMode === "grid" && (
          <div className="mt-24">
            <ShopByBrand onBrandSelect={(brandId) => {
              setSelectedBrand(brandId);
              setSelectedCategory("All"); // Reset category to show all products for this brand
              setViewMode("list"); // Switch to list view
              window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
            }} />
          </div>
        )}

      </div>
    </div>
  );
}
