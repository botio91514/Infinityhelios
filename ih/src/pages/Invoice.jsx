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
    const total = parseFloat(order.total);
    const isPaid = order.status === 'completed' || order.status === 'processing';

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-slate-950 pt-20 pb-12 px-4 flex justify-center items-start overflow-auto">
            <div className="w-full md:max-w-[210mm]">

                {/* Control Bar */}
                {/* Control Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 px-0 sm:px-2 gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-neutral-600 hover:text-black hover:bg-white border border-neutral-200 hover:border-neutral-300 transition-all text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-full shadow-sm hover:shadow-md active:scale-95 duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </button>

                    <button
                        onClick={handleDownload}
                        className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all text-xs font-bold uppercase tracking-widest shadow-xl shadow-black/10 hover:shadow-black/20 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 duration-200"
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

                        {/* Top Accent */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-solarGreen to-solarBlue" />

                        {/* 1. Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8 pt-4">
                            <div className="w-full md:w-1/2">
                                <img src={logoDark} alt="Infinity Helios" className="h-10 md:h-12 w-auto object-contain mb-6" />
                                <div className="text-xs text-neutral-500 font-medium leading-relaxed">
                                    <p className="font-bold text-black uppercase tracking-widest mb-1">Infinity Helios Energy Solutions</p>
                                    <p>123 Solar Street, Green Valley</p>
                                    <p>London, UK, SW1A 1AA</p>
                                    <p>info.infinityhelios@gmail.com</p>
                                </div>
                            </div>
                            <div className="text-left md:text-right w-full md:w-1/2">
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-1 uppercase opacity-90">Invoice</h1>
                                <p className="text-lg font-medium text-solarBlue">#{order.id}</p>

                                <div className="mt-4 space-y-1 text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Date Issued</p>
                                    <p className="text-sm font-bold text-neutral-900">{new Date(order.date_created).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Billing & Shipping Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 p-8 bg-neutral-50 rounded-xl border border-neutral-100">
                            <div>
                                <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-solarBlue mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-solarBlue rounded-full"></span>
                                    Bill To
                                </h3>
                                <div className="text-sm font-medium leading-relaxed text-neutral-600">
                                    <p className="text-base font-bold text-black mb-1">{order.billing.first_name} {order.billing.last_name}</p>
                                    <p>{order.billing.company}</p>
                                    <p>{order.billing.address_1}</p>
                                    <p>{order.billing.address_2}</p>
                                    <p>{order.billing.city}, {order.billing.state} {order.billing.postcode}</p>
                                    <p>{order.billing.country}</p>
                                    <p className="mt-3 text-xs opacity-70">{order.billing.email}</p>
                                    <p className="text-xs opacity-70">{order.billing.phone}</p>
                                </div>
                            </div>

                            <div className="md:text-right">
                                <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-solarBlue mb-4 flex items-center gap-2 md:justify-end">
                                    <span className="w-1.5 h-1.5 bg-solarBlue rounded-full md:order-last"></span>
                                    Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">Payment Method</p>
                                        <p className="text-sm font-bold text-black">{order.payment_method_title}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">Order Status</p>
                                        <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${isPaid
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                            : 'bg-orange-50 text-orange-600 border-orange-200'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Line Items Table */}
                        <div className="flex-grow mb-8">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-black text-white">
                                    <tr>
                                        <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] rounded-l-lg w-1/2">Item Description</th>
                                        <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-center w-1/6">Qty</th>
                                        <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-right w-1/6">Price</th>
                                        <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-right rounded-r-lg w-1/6">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {order.line_items.map((item, index) => (
                                        <tr key={item.id} className={`border-b border-dashed border-neutral-200 ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}`}>
                                            <td className="py-5 px-4 align-top">
                                                <p className="font-bold text-neutral-900 mb-0.5">{item.name}</p>
                                                {item.sku && <p className="text-[10px] text-neutral-400 font-mono">SKU: {item.sku}</p>}
                                            </td>
                                            <td className="py-5 px-4 text-center align-top font-medium text-neutral-600">
                                                {item.quantity}
                                            </td>
                                            <td className="py-5 px-4 text-right align-top font-medium text-neutral-600">
                                                £{parseFloat(item.price).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="py-5 px-4 text-right align-top font-bold text-neutral-900">
                                                £{parseFloat(item.total).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 4. Financial Summary */}
                        <div className="flex justify-end mb-16">
                            <div className="w-full md:w-80 bg-neutral-50 p-6 rounded-xl border border-neutral-100">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs font-medium text-neutral-600">
                                        <span>Subtotal</span>
                                        <span>£{subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-medium text-neutral-600">
                                        <span>Tax (Included)</span>
                                        <span>£{(parseFloat(order.total_tax) || 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-medium text-neutral-600">
                                        <span>Shipping</span>
                                        <span>{parseFloat(order.shipping_total) > 0 ? `£${parseFloat(order.shipping_total).toLocaleString('en-GB', { minimumFractionDigits: 2 })}` : 'Free'}</span>
                                    </div>

                                    <div className="h-px bg-neutral-200 my-2"></div>

                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-solarBlue pb-1">Total</span>
                                        <span className="text-3xl font-black tracking-tight text-black">
                                            £{total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Footer */}
                        <div className="mt-auto pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-solarGreen rounded-full"></div>
                                <span>Thank you for your business</span>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-right">
                                <p>info.infinityhelios@gmail.com</p>
                                <p>www.infinityhelios.com</p>
                            </div>
                        </div>

                    </div>

                    {/* Decorative Bottom Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-black"></div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
