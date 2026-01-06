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
      <div className="min-h-screen bg-white dark:bg-solarBlue flex flex-col items-center justify-center p-6 text-center page-pt relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-solarGreen/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-solarOrange/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-[40px] flex items-center justify-center mx-auto mb-10 border border-slate-200 dark:border-white/10 shadow-2xl">
            <ShoppingBag className="w-10 h-10 text-slate-300 dark:text-white/20" />
          </div>
          <h2 className="text-premium-h2 mb-4 tracking-tighter">Your Cart <span className="text-slate-400">is Empty</span></h2>
          <p className="text-lg text-slate-500 font-light mb-12 max-w-md mx-auto">Your shopping cart is currently empty. Explore our high-efficiency solar products to start your journey.</p>
          <Link to="/products" className="inline-flex items-center gap-4 px-12 py-5 bg-solarGreen text-solarBlue font-black uppercase tracking-[0.2em] text-xs rounded-3xl shadow-2xl shadow-solarGreen/20 hover:scale-105 active:scale-95 transition-all group">
            Shop Products
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-solarBlue pb-24 page-pt relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        <div className="mb-20">
          <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-solarGreen mb-8 transition-all group">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Back to Shop</span>
          </Link>
          <h1 className="text-premium-h1 mb-4 tracking-tighter">Shopping <span className="text-solarGreen">Cart</span></h1>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-solarGreen rounded-full animate-pulse shadow-[0_0_8px_rgba(100,255,153,0.8)]" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{cart.items.length} items in your collection</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* ITEMS LIST */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {cart.items.map((item) => (
                <motion.div
                  key={item.key}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 dark:bg-white/5 p-8 rounded-[45px] border border-slate-200 dark:border-white/10 group hover:border-solarGreen/30 transition-all duration-500 shadow-xl"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-slate-900 rounded-[35px] overflow-hidden flex-shrink-0 border border-slate-100 dark:border-white/5 flex items-center justify-center p-6 relative group-hover:scale-105 transition-transform duration-700 shadow-lg">
                    <img
                      src={item.images?.[0]?.src}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-solarGreen/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-solarGreen">In Stock</span>
                      <h3 className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white group-hover:text-solarGreen transition-colors line-clamp-2">{item.name}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Price: ₹{(item.prices.price / 100).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-4 bg-white dark:bg-white/5 w-fit mx-auto md:ml-0 p-2 rounded-2xl border border-slate-200 dark:border-white/5 shadow-inner">
                      <button
                        onClick={() => updateItem(item.key, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all outline-none disabled:opacity-20"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-black text-lg text-slate-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateItem(item.key, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all outline-none"
                      >
                        <Plus className="w-4 h-4 text-solarGreen" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end justify-between self-stretch gap-8 pt-4 md:pt-0">
                    <div className="text-center md:text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Item Total</p>
                      <p className="font-black text-3xl text-slate-900 dark:text-white tracking-tighter">
                        ₹{(item.totals.line_total / 100).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="group/del flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4 transition-transform group-hover/del:scale-110" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Remove</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* TRANSACTION PROTOCOL */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-slate-950 text-white rounded-[50px] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-solarGreen/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <h4 className="text-xl font-black mb-10 tracking-tighter pb-6 border-b border-white/10 flex items-center justify-between">
                  Order Summary
                  <div className="w-2 h-2 bg-solarGreen rounded-full animate-pulse" />
                </h4>

                <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-center text-white/50">
                    <span className="text-[10px] font-black uppercase tracking-widest">Subtotal</span>
                    <span className="font-black text-white text-sm tracking-tight">₹{(cart.totals.total_price / 100).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/50">
                    <span className="text-[10px] font-black uppercase tracking-widest">Shipping</span>
                    <span className="font-black text-solarGreen text-xs tracking-widest uppercase">Calculated at Checkout</span>
                  </div>
                  <div className="flex justify-between items-center text-white/50">
                    <span className="text-[10px] font-black uppercase tracking-widest">Taxes</span>
                    <span className="font-black text-white text-xs tracking-widest uppercase">Inc. GST</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-12 py-10 border-y border-white/5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Total Amount</span>
                    <p className="text-xs text-solarGreen font-bold animate-pulse uppercase tracking-widest">Verified</p>
                  </div>
                  <span className="text-4xl font-black text-white tracking-tighter">₹{(cart.totals.total_price / 100).toLocaleString('en-IN')}</span>
                </div>

                <Link
                  to="/checkout"
                  className="group w-full flex items-center justify-between pl-8 pr-4 py-4 bg-solarGreen text-solarBlue rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-solarGreen/20 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10">{user ? "Proceed to Checkout" : "Login to Checkout"}</span>
                  <div className="relative z-10 w-12 h-12 bg-solarBlue text-solarGreen rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>

                <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-white/30 text-[9px] font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-solarGreen" /> Secure Encryption Active
                  </div>
                  <div className="flex items-center gap-3 text-white/30 text-[9px] font-bold uppercase tracking-widest">
                    <Truck className="w-4 h-4 text-solarGreen" /> Fast Delivery Available
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
