import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../api/woocommerce";
import { motion } from "framer-motion";
import { useLoader } from "../context/LoaderContext";
import html2pdf from "html2pdf.js";
import logoDark from "../assets/ihlogo-dark.png";

const Invoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();
    const [order, setOrder] = useState(null);
    const invoiceRef = useRef();

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

    const handleDownload = () => {
        const element = invoiceRef.current;
        const opt = {
            margin: [0, 0, 0, 0], // Zero margins to control layout via CSS padding
            filename: `Invoice_${order.id || 'InfinityHelios'}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 3, // Higher scale for crisper text
                useCORS: true,
                letterRendering: true,
                scrollY: 0,
                windowWidth: 1200 // Force desktop rendering width for PDF
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

    if (!order) return null;

    const subtotal = order.line_items.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
    // const taxTotal = parseFloat(order.total_tax) || 0; // Keeping if needed, but per request focusing on clean layout
    const total = parseFloat(order.total);

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-slate-950 pt-20 pb-12 px-4 flex justify-center items-start overflow-auto">
            <div className="w-full md:max-w-[210mm]">

                {/* Control Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 px-2 gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-3 text-neutral-500 hover:text-black transition-all text-xs font-bold uppercase tracking-widest py-3 px-4 -ml-4 rounded-lg hover:bg-neutral-100 cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </button>

                    <button
                        onClick={handleDownload}
                        className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-full flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all text-xs font-bold uppercase tracking-widest shadow-xl shadow-black/10 hover:shadow-black/20 transform hover:-translate-y-0.5"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        Download PDF
                    </button>
                </div>

                {/* INVOICE PAPER */}
                <div ref={invoiceRef} className="bg-white text-black w-full shadow-2xl overflow-hidden relative rounded-sm md:rounded-none">
                    <div className="p-6 md:p-[15mm] min-h-[auto] md:min-h-[297mm] flex flex-col relative">

                        {/* 1. Brand Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16 gap-8 md:gap-0">
                            <div className="w-full md:w-1/2">
                                <img src={logoDark} alt="Infinity Helios" className="h-12 md:h-16 w-auto object-contain mb-4 md:mb-6" />
                            </div>
                            <div className="text-left md:text-right w-full md:w-1/2">
                                <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-black mb-2 uppercase">Invoice</h1>
                                <p className="text-base font-medium text-neutral-900">#{order.id}</p>
                                <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">{new Date(order.date_created).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>

                        {/* 2. Addresses & Meta */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-12 mb-12 md:mb-20">
                            <div className="space-y-6 md:space-y-8">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 md:mb-4">Billed To</h3>
                                    <div className="text-sm font-medium leading-relaxed text-neutral-800">
                                        <p className="text-lg text-black mb-2">{order.billing.first_name} {order.billing.last_name}</p>
                                        <p>{order.billing.address_1}</p>
                                        <p>{order.billing.city}, {order.billing.state} {order.billing.postcode}</p>
                                        <p>{order.billing.country}</p>
                                        <p className="mt-2 text-neutral-500 break-all">{order.billing.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 md:space-y-8 text-left md:text-right">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 md:mb-4">Shipped To</h3>
                                    <div className="text-sm font-medium leading-relaxed text-neutral-800">
                                        <p className="text-lg text-black mb-2">{order.shipping.first_name} {order.shipping.last_name}</p>
                                        <p>{order.shipping.address_1}</p>
                                        <p>{order.shipping.city}, {order.shipping.state} {order.shipping.postcode}</p>
                                        <p>{order.shipping.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Line Items */}
                        <div className="flex-grow overflow-x-auto mb-8 md:mb-0">
                            <table className="w-full text-left border-collapse min-w-[500px] md:min-w-0">
                                <thead>
                                    <tr className="border-b border-black">
                                        <th className="py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black w-1/2">Description</th>
                                        <th className="py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black text-center w-1/6">Qty</th>
                                        <th className="py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black text-right w-1/6">Price</th>
                                        <th className="py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black text-right w-1/6">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.line_items.map((item) => (
                                        <tr key={item.id} className="border-b border-neutral-100">
                                            <td className="py-6 pr-4 align-top">
                                                <p className="font-semibold text-sm text-neutral-900 mb-1">{item.name}</p>
                                                {item.sku && <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Ref. {item.sku}</p>}
                                            </td>
                                            <td className="py-6 px-4 text-center align-top text-sm text-neutral-600 font-medium">
                                                {item.quantity}
                                            </td>
                                            <td className="py-6 px-4 text-right align-top text-sm text-neutral-600 font-medium">
                                                {order.currency_symbol}{parseFloat(item.price).toFixed(2)}
                                            </td>
                                            <td className="py-6 pl-4 text-right align-top text-sm font-bold text-neutral-900">
                                                {order.currency_symbol}{parseFloat(item.total).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 4. Financials */}
                        <div className="flex justify-end mt-4 md:mt-12 mb-12 md:mb-20">
                            <div className="w-full md:w-72 space-y-3">
                                <div className="flex justify-between items-center text-sm text-neutral-600">
                                    <span className="font-medium">Subtotal</span>
                                    <span>{order.currency_symbol} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-neutral-600">
                                    <span className="font-medium">Tax</span>
                                    <span>{order.currency_symbol} {(parseFloat(order.total_tax) || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-neutral-600">
                                    <span className="font-medium">Shipping</span>
                                    <span>{parseFloat(order.shipping_total) > 0 ? `${order.currency_symbol} ${parseFloat(order.shipping_total).toFixed(2)}` : 'Free'}</span>
                                </div>

                                <div className="h-px bg-black my-4"></div>

                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 pb-1">Total Due</span>
                                    <span className="text-2xl md:text-3xl font-light tracking-tight text-black">
                                        {order.currency_symbol} {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 5. Footer */}
                        <div className="mt-auto pt-8 md:pt-12 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-xs text-neutral-400">
                            <div className="space-y-1">
                                <p className="font-bold text-black uppercase tracking-widest text-[10px]">Infinity Helios Energy Solutions</p>
                                <p>Sustainable Power for the Future</p>
                            </div>
                            <div className="text-left md:text-right space-y-1">
                                <p>Generated on {new Date().toLocaleDateString()}</p>
                                <p>support@infinityhelios.com</p>
                            </div>
                        </div>

                    </div>

                    {/* Minimalist Watermark/Decoration */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-black"></div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
