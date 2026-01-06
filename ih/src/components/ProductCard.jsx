import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, ArrowRight, Zap } from "lucide-react";

export default function ProductCard({
  id,
  title,
  description,
  image,
  price,
  regular_price,
  sale_price,
}) {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(id, 1);
  };

  const finalPrice =
    sale_price && sale_price !== ""
      ? Number(sale_price)
      : price && price !== ""
        ? Number(price)
        : 0;

  const originalPrice =
    sale_price && sale_price !== "" && regular_price
      ? Number(regular_price)
      : null;

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={handleCardClick}
      className="group h-full rounded-[40px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl hover:shadow-3xl overflow-hidden cursor-pointer relative"
    >
      {/* Premium Glass Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-solarGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

      {/* IMAGE CONTAINER */}
      <div className="h-64 overflow-hidden bg-slate-50 dark:bg-slate-950 relative border-b border-slate-100 dark:border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent opacity-20 z-10" />
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-white/10">
            <Zap className="w-12 h-12" />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-8 flex flex-col h-[calc(100%-16rem)] relative z-20 bg-white/50 dark:bg-transparent backdrop-blur-3xl">
        <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-solarGreen transition-colors line-clamp-2 tracking-tight">
          {title}
        </h3>

        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-8 line-clamp-2 leading-relaxed opacity-60">
          {description}
        </p>

        {/* PRICE & STATS */}
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">
                ₹{finalPrice.toLocaleString('en-IN')}
              </span>
              {originalPrice && (
                <span className="text-[10px] line-through text-red-500/50 font-black tabular-nums">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] opacity-60 font-black uppercase tracking-widest mt-1 block">Inc. GST</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black text-solarGreen uppercase tracking-widest bg-solarGreen/10 px-2 py-1 rounded-md">In Stock</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex items-center gap-4 group-hover:translate-y-0 translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-solarGreen text-solarBlue py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-solarGreen/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
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
