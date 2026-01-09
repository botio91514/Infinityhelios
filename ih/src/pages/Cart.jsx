import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowRight,
  Trash2,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  ArrowLeft
} from "lucide-react";

export default function Cart() {
  const { cart, loading, removeItem, updateItem } = useCart();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-solarBlue flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-solarGreen/20 border-t-solarGreen rounded-full animate-spin mb-8"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading your cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-solarBlue flex flex-col items-center justify-center p-6 text-center pt-28 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-solarGreen/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-[30px] flex items-center justify-center mx-auto mb-6 border border-slate-200 dark:border-white/10 shadow-xl">
            <ShoppingBag className="w-8 h-8 text-slate-300 dark:text-white/20" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter text-slate-900 dark:text-white">Your Cart <span className="text-slate-400">is Empty</span></h2>
          <p className="text-base text-slate-500 font-light mb-8 max-w-sm mx-auto">Your shopping cart is currently empty. Explore our high-efficiency solar products to start your journey.</p>
          <Link to="/products" className="inline-flex items-center gap-3 px-8 py-3 bg-solarGreen text-solarBlue font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-solarGreen/20 hover:scale-105 active:scale-95 transition-all group">
            Shop Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-solarBlue pb-12 pt-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10 max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-solarGreen mb-3 transition-all group">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Back to Shop</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tighter text-slate-900 dark:text-white">Shopping <span className="text-solarGreen">Cart</span></h1>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-solarGreen rounded-full animate-pulse shadow-[0_0_8px_rgba(100,255,153,0.8)]" />
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">{cart.items.length} items in your collection</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* ITEMS LIST */}
          <div className="lg:col-span-8 space-y-3">
            <AnimatePresence>
              {cart.items.map((item) => (
                <motion.div
                  key={item.key}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-slate-50 dark:bg-white/5 p-4 md:p-5 rounded-[24px] border border-slate-200 dark:border-white/10 group hover:border-solarGreen/30 transition-all duration-500 shadow-lg"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-white dark:bg-slate-900 rounded-[20px] overflow-hidden flex-shrink-0 border border-slate-100 dark:border-white/5 flex items-center justify-center p-3 relative group-hover:scale-105 transition-transform duration-700 shadow-md">
                    <img
                      src={item.images?.[0]?.src}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                    <div className="absolute inset-0 bg-solarGreen/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-2">
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-black uppercase tracking-widest text-solarGreen">In Stock</span>
                      <h3 className="font-black text-base md:text-lg tracking-tighter text-slate-900 dark:text-white group-hover:text-solarGreen transition-colors line-clamp-2">{item.name}</h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Price: ₹{(item.prices.price / 100).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-2 bg-white dark:bg-white/5 w-fit mx-auto md:ml-0 p-1 rounded-xl border border-slate-200 dark:border-white/5 shadow-inner">
                      <button
                        onClick={() => updateItem(item.key, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-all outline-none disabled:opacity-20"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-black text-xs text-slate-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateItem(item.key, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-all outline-none"
                      >
                        <Plus className="w-3 h-3 text-solarGreen" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end justify-between self-stretch gap-4 pt-2 md:pt-0">
                    <div className="text-center md:text-right">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Item Total</p>
                      <p className="font-black text-xl text-slate-900 dark:text-white tracking-tighter">
                        ₹{(item.totals.line_total / 100).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="group/del flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-300"
                    >
                      <Trash2 className="w-3 h-3 transition-transform group-hover/del:scale-110" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Remove</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* TRANSACTION PROTOCOL */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-slate-950 text-white rounded-[24px] p-5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-solarGreen/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <h4 className="text-base font-black mb-4 tracking-tighter pb-3 border-b border-white/10 flex items-center justify-between">
                  Order Summary
                  <div className="w-1.5 h-1.5 bg-solarGreen rounded-full animate-pulse" />
                </h4>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-white/50">
                    <span className="text-[9px] font-black uppercase tracking-widest">Subtotal</span>
                    <span className="font-black text-white text-[10px] tracking-tight">₹{(cart.totals.total_price / 100).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/50">
                    <span className="text-[9px] font-black uppercase tracking-widest">Shipping</span>
                    <span className="font-black text-solarGreen text-[9px] tracking-widest uppercase">Calculated at Checkout</span>
                  </div>
                  <div className="flex justify-between items-center text-white/50">
                    <span className="text-[9px] font-black uppercase tracking-widest">Taxes</span>
                    <span className="font-black text-white text-[9px] tracking-widest uppercase">Inc. GST</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-6 py-4 border-y border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Total Amount</span>
                    <p className="text-[8px] text-solarGreen font-bold animate-pulse uppercase tracking-widest">Verified</p>
                  </div>
                  <span className="text-2xl font-black text-white tracking-tighter">₹{(cart.totals.total_price / 100).toLocaleString('en-IN')}</span>
                </div>

                <Link
                  to="/checkout"
                  className="group w-full flex items-center justify-between pl-6 pr-3 py-3 bg-solarGreen text-solarBlue rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-solarGreen/20 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10">{user ? "Proceed to Checkout" : "Login to Checkout"}</span>
                  <div className="relative z-10 w-10 h-10 bg-solarBlue text-solarGreen rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>

                <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-white/30 text-[8px] font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3 text-solarGreen" /> Secure Encryption Active
                  </div>
                  <div className="flex items-center gap-2 text-white/30 text-[8px] font-bold uppercase tracking-widest">
                    <Truck className="w-3 h-3 text-solarGreen" /> Fast Delivery Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
