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

  return (
    <div className="bg-white dark:bg-solarBlue min-h-screen page-pt pb-24 overflow-hidden relative">
      {/* Cinematic Background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[1000px] h-[1000px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-solarOrange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-solarGreen mb-12 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-solarGreen group-hover:text-solarBlue transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Core Catalog</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-32">
          {/* PRODUCT VISUALIZATION */}
          <div className="lg:col-span-6 sticky top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square bg-slate-50 dark:bg-white/5 backdrop-blur-2xl rounded-[60px] border border-slate-200 dark:border-white/10 p-12 md:p-20 flex items-center justify-center overflow-hidden group shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-solarGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              {product.images?.[0]?.src ? (
                <img
                  src={product.images[0].src}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-1000 ease-out relative z-10"
                />
              ) : (
                <div className="text-slate-300 dark:text-white/20 font-black uppercase tracking-widest text-center">Protocol: No Image Data</div>
              )}

              {product.on_sale && (
                <div className="absolute top-10 left-10 px-6 py-2 bg-solarGreen text-solarBlue text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl shadow-solarGreen/30 z-20">
                  Priority Access Offer
                </div>
              )}
            </motion.div>

            {/* HIGH-END TRUST METRICS */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { label: "25Y Performance", icon: <ShieldCheck className="w-5 h-5" />, color: "text-blue-500" },
                { label: "Tier 1 Certified", icon: <Zap className="w-5 h-5" />, color: "text-solarOrange" },
                { label: "Eco Infrastructure", icon: <Leaf className="w-5 h-5" />, color: "text-solarGreen" }
              ].map((badge, i) => (
                <div key={i} className="bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 text-center group hover:border-solarGreen/50 transition-all duration-500">
                  <div className={`mb-3 flex justify-center ${badge.color} group-hover:scale-110 transition-transform`}>{badge.icon}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-tight">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCT INTELLIGENCE */}
          <div className="lg:col-span-6 py-4">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="px-4 py-1.5 bg-solarGreen/10 text-solarGreen text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-solarGreen/20">
                  {product.categories?.[0]?.name || "ENERGY UNIT"}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-solarGreen rounded-full" />
                  MOD: {product.sku || "PRO-X-889"}
                </span>
              </div>

              <h1 className="text-premium-h1 mb-10 tracking-tighter">
                {product.name}
              </h1>

              <div className="flex items-end gap-6 mb-12 pb-12 border-b border-slate-200 dark:border-white/10">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">MSRP Value</p>
                  <div className="flex items-baseline gap-4">
                    <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">₹{price}</span>
                    {regularPrice && regularPrice !== price && (
                      <span className="text-2xl text-slate-400 line-through font-light opacity-50">₹{regularPrice}</span>
                    )}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-white/10 rounded text-[10px] font-black text-slate-500 uppercase tracking-widest">Incl. GST 18%</span>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}
                className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-16 max-w-xl"
              />

              {/* ACTION MATRIX */}
              <div className="space-y-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[45px] p-10 shadow-xl">
                <div className="flex flex-col sm:flex-row items-stretch gap-6">
                  {/* QTY CONTROL */}
                  <div className="flex items-center bg-white dark:bg-slate-900 rounded-3xl p-2 border border-slate-200 dark:border-white/10 shadow-inner">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-14 h-14 flex items-center justify-center rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all outline-none"
                      disabled={isAdding || isBuying}
                    >
                      <Minus className="w-5 h-5 text-slate-400" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      readOnly
                      className="w-16 text-center bg-transparent font-black text-2xl text-slate-900 dark:text-white"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-14 h-14 flex items-center justify-center rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all outline-none"
                      disabled={isAdding || isBuying}
                    >
                      <Plus className="w-5 h-5 text-solarGreen" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding || isBuying}
                    className="flex-1 px-8 py-5 bg-white dark:bg-slate-900 border-2 border-solarGreen text-solarGreen text-xs font-black uppercase tracking-widest rounded-3xl hover:bg-solarGreen hover:text-solarBlue transition-all duration-500 shadow-2xl shadow-solarGreen/10 flex items-center justify-center gap-3 active:scale-95 group"
                  >
                    <ShoppingCart className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                    {isAdding ? "PROCESSING..." : "REGISTER TO CART"}
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={isAdding || isBuying}
                  className="w-full py-6 bg-solarGreen text-solarBlue text-xs font-black uppercase tracking-[0.3em] rounded-3xl shadow-2xl shadow-solarGreen/30 hover:shadow-solarGreen/50 transition-all duration-500 flex items-center justify-center gap-4 relative overflow-hidden group active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10">{isBuying ? "INITIATING TRANSACTION..." : "EXECUTE PURCHASE"}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-2" />
                </button>

                <div className="flex items-center justify-center gap-8 pt-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Truck className="w-4 h-4 text-solarGreen" /> Priority Dispatch
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4 text-solarGreen" /> In Stock
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ANALYTICAL DATA TABS */}
        <section className="mt-32">
          <div className="flex items-center justify-between mb-16 border-b border-slate-200 dark:border-white/10 pb-2 overflow-x-auto no-scrollbar">
            <div className="flex gap-12 min-w-max">
              {[
                { id: "specs", label: "Protocol Specs", icon: <Zap className="w-4 h-4" /> },
                { id: "description", label: "Technical Narrative", icon: <FileText className="w-4 h-4" /> },
                { id: "resources", label: "Documentation Hub", icon: <Download className="w-4 h-4" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative flex items-center gap-3 ${activeTab === tab.id ? "text-solarGreen" : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="detailTab" className="absolute bottom-[-1px] left-0 w-full h-1 bg-solarGreen rounded-full shadow-[0_0_10px_rgba(100,255,153,0.5)]" />
                  )}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs font-bold text-slate-400/30">
              <span className="uppercase tracking-widest">Data Stream Active</span>
              <div className="w-2 h-2 bg-solarGreen rounded-full animate-pulse" />
            </div>
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "specs" && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  {product.attributes?.length > 0 ? (
                    product.attributes.map((attr, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[35px] p-8 hover:border-solarGreen/30 transition-all duration-500">
                        <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{attr.name}</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{attr.options?.join(", ")}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      {[
                        { label: "Conversion Rate", value: "21.8% Peak", unit: "PMax" },
                        { label: "Net Weight", value: "24.5", unit: "Kilograms" },
                        { label: "Matrix Material", value: "Monocrystalline", unit: "High-Grade Silicon" },
                        { label: "Cell Configuration", value: "144 Units", unit: "Half-cut Logic" }
                      ].map((spec, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[35px] p-8 hover:border-solarGreen/30 transition-all duration-500">
                          <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{spec.label}</span>
                          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{spec.value}</span>
                          <span className="block text-[9px] font-bold text-solarGreen mt-1 tracking-widest uppercase">{spec.unit}</span>
                        </div>
                      ))}
                    </>
                  )}
                </motion.div>
              )}

              {activeTab === "description" && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[50px] p-10 md:p-16"
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    className="prose prose-slate dark:prose-invert max-w-none prose-h3:font-black prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed text-lg"
                  />
                </motion.div>
              )}

              {activeTab === "resources" && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {[
                    { title: "Technical Datasheet", size: "2.4 MB", type: "PDF" },
                    { title: "Engineering Manual", size: "4.1 MB", type: "PDF" },
                    { title: "Warranty Protocol", size: "0.8 MB", type: "PDF" },
                    { title: "Infrastructure Guide", size: "1.2 MB", type: "PDF" }
                  ].map((file, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-8 flex items-center justify-between group cursor-pointer hover:border-solarGreen hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all duration-500 shadow-xl shadow-transparent hover:shadow-black/5">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-red-500/10 text-red-500 flex flex-col items-center justify-center rounded-2xl">
                          <FileText className="w-6 h-6" />
                          <span className="text-[8px] font-black mt-1">PDF</span>
                        </div>
                        <div>
                          <h6 className="font-black text-lg tracking-tight uppercase">{file.title}</h6>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{file.size}</span>
                            <div className="w-1 h-1 bg-slate-200 rounded-full" />
                            <span className="text-[9px] font-black text-solarGreen tracking-widest uppercase">Verified System</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-white dark:bg-white/10 flex items-center justify-center group-hover:bg-solarGreen group-hover:text-solarBlue transition-all duration-500">
                        <Download className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}

