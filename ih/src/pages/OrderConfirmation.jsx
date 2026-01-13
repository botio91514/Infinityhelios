import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import API_BASE_URL from "../api/config";
import {
    ShieldCheck,
    ArrowRight,
    ChevronLeft,
    FileText,
    CreditCard,
    Truck,
    Clock,
    AlertCircle,
    CheckCircle2
} from "lucide-react";

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { checkout, loadCart, cart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);

    const checkoutData = location.state?.checkoutData;
    const paymentMethod = location.state?.paymentMethod;

    if (!checkoutData || !cart) {
        return (
            <div className="min-h-screen bg-white dark:bg-solarBlue page-pt flex items-center justify-center px-4">
                <div className="text-center space-y-8">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-premium-h2 tracking-tighter">Session <span className="text-red-500">Expired</span></h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Your session has timed out or data is missing.</p>
                    </div>
                    <Link to="/cart" className="inline-flex items-center gap-2 text-solarGreen font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all">
                        Return to Cart <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    const handleConfirmOrder = async () => {
        setIsProcessing(true);
        try {
            if (location.state?.customerId) {
                await fetch(`${API_BASE_URL}/api/user/update/${location.state.customerId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        billing: checkoutData,
                        shipping: checkoutData
                    })
                });
            }

            const response = await checkout(checkoutData, paymentMethod);
            if (response.payment_result?.status === "success" || response.order_id) {
                await loadCart();
                navigate("/order-success", { state: { order: response } });
            } else {
                alert("Order status: " + (response.payment_result?.payment_details?.[0]?.value || "Pending."));
            }
        } catch (error) {
            console.error("Place order error:", error);
            alert("Error placing order: " + (error.response?.data?.message || "Please try again."));
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-20 md:pt-28 pb-12 relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-main relative z-10 max-w-5xl mx-auto px-6">
                <div className="mb-10">
                    <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-slate-500 hover:text-solarGreen mb-6 transition-all group">
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Edit Details</span>
                    </button>
                    <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter text-slate-900 dark:text-white">
                        Order <span className="text-solarGreen">Confirmation</span>
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                            <FileText className="w-3 h-3 text-solarGreen" /> Final Review
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-3xl rounded-[30px] p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-solarGreen to-transparent opacity-30" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
                        {/* Audit Details */}
                        <div className="space-y-8">
                            <section>
                                <h3 className="text-[9px] font-black mb-6 flex items-center gap-3 uppercase tracking-[0.4em] text-slate-400">
                                    <div className="w-6 h-6 rounded-lg bg-solarGreen/10 text-solarGreen flex items-center justify-center">
                                        <Truck className="w-3 h-3" />
                                    </div>
                                    Shipping Details
                                </h3>
                                <div className="pl-9 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-solarGreen mt-0.5" />
                                        <div>
                                            <p className="text-base font-black tracking-tight text-slate-900 dark:text-white">{checkoutData.first_name} {checkoutData.last_name}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-white/5 shadow-inner">
                                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-tight">
                                            {checkoutData.address_1}<br />
                                            {checkoutData.address_2 && <>{checkoutData.address_2}<br /></>}
                                            {checkoutData.city}, {checkoutData.state} {checkoutData.postcode}<br />
                                            {checkoutData.country}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 pt-2">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <span className="opacity-20 uppercase tracking-[0.4em]">PHONE</span> {checkoutData.phone}
                                        </p>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 break-all">
                                            <span className="opacity-20 uppercase tracking-[0.4em] flex-shrink-0">EMAIL</span> {checkoutData.email}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-[9px] font-black mb-6 flex items-center gap-3 uppercase tracking-[0.4em] text-slate-400">
                                    <div className="w-6 h-6 rounded-lg bg-solarGreen/10 text-solarGreen flex items-center justify-center">
                                        <CreditCard className="w-3 h-3" />
                                    </div>
                                    Payment Method
                                </h3>
                                <div className="pl-9 flex items-center gap-3">
                                    <div className="px-5 py-2.5 bg-solarGreen text-solarBlue rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-lg shadow-solarGreen/20">
                                        {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                    </div>
                                    <div className="flex items-center gap-2 text-[9px] font-black opacity-30 uppercase tracking-widest italic">
                                        <Clock className="w-3 h-3" /> Awaiting Confirmation
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Order Manifest */}
                        <div>
                            <div className="bg-slate-950 text-white rounded-[30px] p-6 md:p-8 border border-white/10 shadow-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-solarGreen/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />

                                <h3 className="text-[9px] font-black mb-6 pb-4 border-b border-white/10 uppercase tracking-[0.4em] text-white/40 flex items-center justify-between">
                                    Order Summary
                                    <span className="w-1.5 h-1.5 bg-solarGreen rounded-full shadow-[0_0_8px_rgba(100,255,153,1)]" />
                                </h3>

                                <div className="space-y-4 mb-6 pr-2 max-h-[300px] overflow-y-auto no-scrollbar">
                                    {cart.items.map((item) => (
                                        <div key={item.key} className="flex justify-between items-start group/item">
                                            <div className="space-y-0.5">
                                                <span className="text-[9px] font-black uppercase tracking-tight text-white block group-hover/item:text-solarGreen transition-colors">{item.name}</span>
                                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Qty: {item.quantity}</span>
                                            </div>
                                            <span className="font-black text-xs tabular-nums text-white/80 group-hover/item:text-white transition-colors">₹{(item.totals.line_total / 100).toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-white/10 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-white/30 font-black text-[9px] uppercase tracking-widest">
                                            <span>Subtotal</span>
                                            <span>₹{(cart.totals.total_price / 100).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-solarGreen font-black text-[9px] uppercase tracking-widest">
                                            <span>Shipping</span>
                                            <span>FREE</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end pt-4 border-t border-white/5">
                                        <div>
                                            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">TOTAL AMOUNT</p>
                                        </div>
                                        <span className="text-3xl font-black text-white tabular-nums tracking-tighter">₹{(cart.totals.total_price / 100).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 justify-center">
                                <ShieldCheck className="w-3 h-3 text-solarGreen" />
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Secure Checkout • SSL Encrypted</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 pt-8 border-t border-slate-100 dark:border-white/5">
                        <button
                            onClick={handleConfirmOrder}
                            disabled={isProcessing}
                            className={`group relative flex-1 flex items-center justify-between pl-8 pr-5 py-3.5 bg-solarGreen text-solarBlue rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-solarGreen/20 transition-all overflow-hidden ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                            <span className="relative z-10 flex items-center gap-3">
                                {isProcessing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-solarBlue/30 border-t-solarBlue rounded-full animate-spin" />
                                        Processing Order...
                                    </>
                                ) : (
                                    "Confirm & Place Order"
                                )}
                            </span>
                            {!isProcessing && (
                                <div className="relative z-10 w-10 h-10 bg-solarBlue text-solarGreen rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            disabled={isProcessing}
                            className="px-8 py-3.5 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-400 rounded-[24px] font-black uppercase tracking-[0.2em] text-[9px] hover:bg-slate-200 dark:hover:bg-white/10 transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
