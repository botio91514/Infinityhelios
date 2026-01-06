import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../api/woocommerce";
import { motion } from "framer-motion";
import { useLoader } from "../context/LoaderContext";

const Invoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            showLoader();
            try {
                const data = await getOrderById(id);
                setOrder(data);
            } catch (error) {
                console.error("Invoice fetch error:", error);
            } finally {
                hideLoader();
            }
        };

        if (id) fetchOrder();
    }, [id, showLoader, hideLoader]);

    const handlePrint = () => {
        window.print();
    };

    if (!order) return null;

    const subtotal = order.line_items.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
    const taxTotal = parseFloat(order.total_tax) || 0;
    const total = parseFloat(order.total);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-4 print:p-0 print:bg-white print:pt-0">
            <div className="max-w-4xl mx-auto print:max-w-none">

                {/* ACTIONS - HIDDEN ON PRINT */}
                <div className="flex justify-between items-center mb-8 print:hidden">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-solarBlue transition-colors font-bold"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </button>

                    <button
                        onClick={handlePrint}
                        className="bg-solarGreen text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-solarGreen/20 hover:scale-[1.02] active:scale-95 transition-all font-bold"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9v4a2 2 0 00-2 2v4zm2-2h2" />
                        </svg>
                        Download / Print Invoice
                    </button>
                </div>

                {/* INVOICE CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 shadow-2xl rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/10 print:shadow-none print:border-none print:rounded-none"
                >
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-solarBlue to-blue-900 p-12 text-white flex flex-col md:flex-row justify-between items-start gap-8 relative overflow-hidden print:from-slate-100 print:to-slate-100 print:text-black print:p-8">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl print:hidden"></div>

                        <div className="relative z-10">
                            <div className="text-3xl font-black tracking-tighter mb-2 flex items-center gap-2">
                                <span className="w-8 h-8 bg-solarGreen rounded-lg flex items-center justify-center text-white text-base">∞</span>
                                INFINITY<span className="text-solarGreen">HELIOS</span>
                            </div>
                            <p className="opacity-70 text-sm max-w-xs leading-relaxed print:text-xs">
                                Providing sustainable solar solutions for a greener, brighter future.
                            </p>
                        </div>

                        <div className="text-right relative z-10 flex flex-col items-end">
                            <h1 className="text-6xl font-black mb-1 opacity-20 print:text-black print:opacity-40">INVOICE</h1>
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold print:bg-slate-200 print:text-slate-800">
                                #{order.id}
                            </div>
                        </div>
                    </div>

                    <div className="p-12 print:p-8 print:pt-0">
                        {/* Meta Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 border-b border-slate-100 dark:border-white/5 pb-16 print:mb-8 print:pb-8">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">Billed To</label>
                                <div className="space-y-1">
                                    <p className="font-bold text-xl">{order.billing.first_name} {order.billing.last_name}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                        {order.billing.address_1}<br />
                                        {order.billing.city}, {order.billing.state} {order.billing.postcode}<br />
                                        {order.billing.country}
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm pt-2">{order.billing.email}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{order.billing.phone}</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">Shipping Address</label>
                                <div className="space-y-1">
                                    <p className="font-bold text-lg">{order.shipping.first_name} {order.shipping.last_name}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                        {order.shipping.address_1}<br />
                                        {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}<br />
                                        {order.shipping.country}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-8 md:col-start-2 lg:col-start-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Date Issued</label>
                                        <p className="font-bold text-sm">{new Date(order.date_created).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Order Status</label>
                                        <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-black uppercase tracking-wider">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Payment Method</label>
                                        <p className="font-bold text-sm">{order.payment_method_title}</p>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Currency</label>
                                        <p className="font-bold text-sm">{order.currency_symbol} {order.currency}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mb-12 overflow-hidden rounded-3xl border border-slate-100 dark:border-white/5 print:border-none print:rounded-none">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-white/5 print:bg-slate-100">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Qty</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Price</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {order.line_items.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-slate-800 dark:text-white mb-1">{item.name}</div>
                                                <div className="text-[10px] opacity-40 uppercase tracking-wider">SKU: {item.sku || 'N/A'}</div>
                                            </td>
                                            <td className="px-8 py-6 text-center font-bold text-slate-600 dark:text-slate-400">
                                                {item.quantity}
                                            </td>
                                            <td className="px-8 py-6 text-right font-bold text-slate-600 dark:text-slate-400">
                                                {order.currency_symbol} {(parseFloat(item.price)).toFixed(2)}
                                            </td>
                                            <td className="px-8 py-6 text-right font-black text-slate-800 dark:text-white">
                                                {order.currency_symbol} {(parseFloat(item.total)).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="flex flex-col md:flex-row justify-between gap-12 pt-8">
                            <div className="flex-1 max-w-sm">
                                <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-8 border border-slate-100 dark:border-white/5 print:bg-transparent print:p-0 print:border-none">
                                    <h4 className="font-black text-xs uppercase tracking-widest mb-4 opacity-40">Payment Info</h4>
                                    <p className="text-sm leading-relaxed opacity-70">
                                        Please keep this invoice for your records. All prices are inclusive of applicable taxes. For any queries regarding this order, please contact our support team at <span className="text-solarGreen font-bold">support@infinityhelios.com</span>
                                    </p>
                                </div>
                            </div>

                            <div className="md:w-72 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-50 font-bold uppercase tracking-wider text-[10px]">Subtotal</span>
                                    <span className="font-bold">{order.currency_symbol} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-50 font-bold uppercase tracking-wider text-[10px]">Tax Total</span>
                                    <span className="font-bold">{order.currency_symbol} {taxTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-50 font-bold uppercase tracking-wider text-[10px]">Shipping</span>
                                    <span className="font-bold text-solarGreen">FREE</span>
                                </div>
                                <div className="h-px bg-slate-100 dark:bg-white/10 my-4"></div>
                                <div className="flex justify-between items-center">
                                    <span className="font-black uppercase tracking-widest text-xs">Total Amount</span>
                                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-solarGreen to-blue-500">
                                        {order.currency_symbol} {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className="bg-solarGreen/10 border border-solarGreen/20 px-4 py-2 rounded-xl mt-6">
                                    <p className="text-[10px] font-black text-solarGreen text-center uppercase tracking-widest">
                                        Total Paid: {order.currency_symbol} {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-20 pt-10 border-t border-slate-50 dark:border-white/5 text-center print:mt-10">
                            <div className="inline-flex items-center gap-2 text-2xl font-black tracking-tighter opacity-10 mb-2">
                                INFINITY<span className="text-solarGreen">HELIOS</span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Thank you for choosing renewable energy</p>
                        </div>
                    </div>
                </motion.div>

                {/* Print Footer Hint */}
                <p className="text-center mt-8 text-xs opacity-40 print:hidden italic">
                    Tip: When printing, enable "Background Graphics" in your browser settings for the best result.
                </p>
            </div>
        </div>
    );
};

export default Invoice;
