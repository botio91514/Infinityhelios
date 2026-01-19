import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductById } from "../api/woocommerce";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ShieldCheck,
  Zap,
  Leaf,
  Truck,
  FileText,
  Download,
  ShoppingCart,
  ArrowRight,
  Minus,
  Plus,
  CheckCircle2
} from "lucide-react";

import SEO from "../components/SEO";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-solarBlue flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-solarGreen/20 border-t-solarGreen rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Initializing System Data...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <section className="page-pt pb-20 min-h-screen flex items-center justify-center">
        <div className="container-main text-center">
          <h2 className="text-premium-h2 mb-6 tracking-tighter">Product entity not found</h2>
          <Link to="/products" className="inline-flex items-center gap-2 text-solarGreen font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
            <ChevronLeft className="w-4 h-4" /> Return to Catalog
          </Link>
        </div>
      </section>
    );
  }

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    try {
      await addItem(product.id, quantity);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    setIsBuying(true);
    try {
      await addItem(product.id, quantity);
      navigate("/cart");
    } finally {
      setIsBuying(false);
    }
  };

  // Safe price parsing
  const price = Number(product.price).toLocaleString('en-IN');
  const regularPrice = product.regular_price ? Number(product.regular_price).toLocaleString('en-IN') : null;

  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="bg-white dark:bg-solarBlue min-h-screen pt-20 md:pt-28 pb-12 overflow-hidden relative">
      <SEO
        title={`${product.name} | Infinity Helios`}
        description={stripHtml(product.short_description || product.description).substring(0, 160)}
        image={product.images?.[0]?.src}
      />
      {/* Cinematic Background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[1000px] h-[1000px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-solarOrange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10 max-w-7xl mx-auto px-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-solarGreen mb-6 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-solarGreen group-hover:text-solarBlue transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Catalog</span>
        </Link>

        {/* COMPACT GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* LEFT: VISUALS (Compact) */}
          <div className="lg:col-span-5 sticky top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square bg-white dark:bg-[#0B1221] rounded-[40px] border border-slate-200 dark:border-white/10 p-8 flex items-center justify-center overflow-hidden group shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-solarGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              {product.images?.[0]?.src ? (
                <img
                  src={product.images[0].src}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out relative z-10 max-h-[400px]"
                />
              ) : (
                <div className="text-slate-300 dark:text-white/20 font-black uppercase tracking-widest text-center">No Signal</div>
              )}

              {product.on_sale && (
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-solarGreen text-solarBlue text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-solarGreen/20 z-20">
                  Offer Active
                </div>
              )}
            </motion.div>

            {/* Micro Trust Indicators */}
            <div className="flex justify-between gap-4 mt-6 px-2">
              {[
                { label: "25Y Warranty", icon: <ShieldCheck className="w-4 h-4" />, color: "text-blue-500" },
                { label: "Tier 1", icon: <Zap className="w-4 h-4" />, color: "text-solarOrange" },
                { label: "Eco-Ready", icon: <Leaf className="w-4 h-4" />, color: "text-solarGreen" }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
                  <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-white/5 ${badge.color} group-hover:bg-white/10 transition-colors`}>{badge.icon}</div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS (Compact) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-solarGreen/10 text-solarGreen text-[9px] font-black uppercase tracking-[0.2em] rounded-md border border-solarGreen/20">
                  {product.categories?.[0]?.name || "UNIT"}
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-500 rounded-full" />
                  ID: {product.sku || "N/A"}
                </span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
                {product.name}
              </h1>

              {/* Price Block */}
              <div className="flex items-center gap-6 mb-8 p-6 bg-slate-50 dark:bg-[#0F1629] rounded-[30px] border border-slate-100 dark:border-white/5 w-fit">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Price Point</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">£{price}</span>
                    {regularPrice && regularPrice !== price && (
                      <span className="text-lg text-slate-400 line-through font-medium opacity-50">£{regularPrice}</span>
                    )}
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10" />
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] font-bold text-solarGreen uppercase tracking-widest bg-solarGreen/10 px-2 py-1 rounded">In Stock</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">+18% GST</span>
                </div>
              </div>

              {/* Short Description */}
              <div className="mb-8 p-6 rounded-[20px] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <div
                  dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}
                  className="prose prose-sm prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed font-medium"
                />
              </div>

              {/* ACTION ROW */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <div className="flex items-center bg-white dark:bg-[#0F1629] rounded-2xl p-1.5 border border-slate-200 dark:border-white/10 w-fit">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"><Minus className="w-4 h-4" /></button>
                  <input type="number" value={quantity} readOnly className="w-12 text-center bg-transparent font-black text-lg" />
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"><Plus className="w-4 h-4 text-solarGreen" /></button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1 px-6 py-4 bg-white dark:bg-transparent border-2 border-solarGreen text-solarGreen hover:bg-solarGreen hover:text-solarBlue text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-4 h-4" /> {isAdding ? "Adding..." : "Add to Cart"}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={isBuying}
                  className="flex-[1.5] px-6 py-4 bg-solarGreen text-solarBlue text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-solarGreen/20 hover:shadow-solarGreen/40 transition-all flex items-center justify-center gap-3"
                >
                  {isBuying ? "Processing..." : "Buy Now"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* TABS (Inline) */}
              <div className="border-t border-slate-200 dark:border-white/10 pt-8">
                <div className="flex gap-8 mb-6 overflow-x-auto">
                  {[{ id: "specs", label: "Specs" }, { id: "description", label: "Details" }, { id: "resources", label: "Files" }].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-[10px] font-black uppercase tracking-[0.2em] pb-2 border-b-2 transition-colors ${activeTab === tab.id ? "border-solarGreen text-solarGreen" : "border-transparent text-slate-400 hover:text-white"}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="min-h-[200px] text-sm text-slate-400 leading-relaxed bg-white/5 p-6 rounded-2xl"
                  >
                    {activeTab === 'specs' && (
                      <div className="grid grid-cols-2 gap-4">
                        {product.attributes?.length > 0 ? product.attributes.map((a, i) => (
                          <div key={i}><span className="text-slate-500 block text-[9px] uppercase tracking-wider">{a.name}</span><span className="font-bold text-white">{a.options?.join(', ')}</span></div>
                        )) : <div className="text-xs italic opacity-50">Standard specification sheet unavailable. Refer to manual.</div>}
                      </div>
                    )}
                    {activeTab === 'description' && (
                      <div dangerouslySetInnerHTML={{ __html: product.description }} className="prose prose-invert prose-sm max-w-none" />
                    )}
                    {activeTab === 'resources' && (
                      <div className="flex gap-4">
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5 cursor-pointer hover:border-solarGreen transition-colors">
                          <FileText className="w-5 h-5 text-solarGreen" />
                          <div><div className="text-[10px] font-bold uppercase text-white">Datasheet.pdf</div><div className="text-[9px] text-slate-500">2.4 MB</div></div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

