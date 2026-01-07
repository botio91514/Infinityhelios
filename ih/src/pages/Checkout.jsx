import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
    ShieldCheck,
    CreditCard,
    Truck,
    ArrowRight,
    ChevronLeft,
    PackageCheck,
    AlertCircle,
    Info,
    CheckCircle2
} from "lucide-react";
import API_BASE_URL from "../api/config";

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, checkout, loadCart } = useCart();
    const { user } = useAuth();
    const cartItems = cart?.items || [];
    const cartTotal = cart?.totals?.total_price ? (cart.totals.total_price / 100) : 0;

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [errors, setErrors] = useState({});
    const [customerId, setCustomerId] = useState(null);
    const [formData, setFormData] = useState({
        billing_address: {
            first_name: "",
            last_name: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            postcode: "",
            country: "IN",
            email: "",
            phone: ""
        }
    });

    const indianStates = [
        { code: "AN", name: "Andaman and Nicobar Islands" },
        { code: "AP", name: "Andhra Pradesh" },
        { code: "AR", name: "Arunachal Pradesh" },
        { code: "AS", name: "Assam" },
        { code: "BR", name: "Bihar" },
        { code: "CH", name: "Chandigarh" },
        { code: "CT", name: "Chhattisgarh" },
        { code: "DN", name: "Dadra and Nagar Haveli" },
        { code: "DD", name: "Daman and Diu" },
        { code: "DL", name: "Delhi" },
        { code: "GA", name: "Goa" },
        { code: "GJ", name: "Gujarat" },
        { code: "HR", name: "Haryana" },
        { code: "HP", name: "Himachal Pradesh" },
        { code: "JK", name: "Jammu and Kashmir" },
        { code: "JH", name: "Jharkhand" },
        { code: "KA", name: "Karnataka" },
        { code: "KL", name: "Kerala" },
        { code: "LA", name: "Ladakh" },
        { code: "LD", name: "Lakshadweep" },
        { code: "MP", name: "Madhya Pradesh" },
        { code: "MH", name: "Maharashtra" },
        { code: "MN", name: "Manipur" },
        { code: "ML", name: "Meghalaya" },
        { code: "MZ", name: "Mizoram" },
        { code: "NL", name: "Nagaland" },
        { code: "OD", name: "Odisha" },
        { code: "PY", name: "Puducherry" },
        { code: "PB", name: "Punjab" },
        { code: "RJ", name: "Rajasthan" },
        { code: "SK", name: "Sikkim" },
        { code: "TN", name: "Tamil Nadu" },
        { code: "TS", name: "Telangana" },
        { code: "TR", name: "Tripura" },
        { code: "UP", name: "Uttar Pradesh" },
        { code: "UK", name: "Uttarakhand" },
        { code: "WB", name: "West Bengal" }
    ];

    useEffect(() => {
        // Load saved data first
        const savedData = localStorage.getItem("checkout_safe_data");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }

        const fetchProfile = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/user/profile?email=${user.email}`);
                    const data = await response.json();
                    if (response.ok && data.billing) {
                        setCustomerId(data.id);
                        const loadedState = data.billing.state || data.state || "";
                        const isValidState = indianStates.some(s => s.code === loadedState);
                        const safeState = isValidState ? loadedState : "";

                        // Merge profile data but prefer saved fields if user typed something
                        setFormData(prev => ({
                            billing_address: {
                                ...prev.billing_address,
                                first_name: prev.billing_address.first_name || data.billing.first_name || data.first_name || "",
                                last_name: prev.billing_address.last_name || data.billing.last_name || data.last_name || "",
                                address_1: prev.billing_address.address_1 || data.billing.address_1 || "",
                                address_2: prev.billing_address.address_2 || data.billing.address_2 || "",
                                city: prev.billing_address.city || data.billing.city || "",
                                state: prev.billing_address.state || safeState,
                                postcode: prev.billing_address.postcode || data.billing.postcode || "",
                                country: data.billing.country || "IN",
                                email: prev.billing_address.email || data.billing.email || user.email,
                                phone: prev.billing_address.phone || data.billing.phone || ""
                            }
                        }));
                    }
                } catch (err) {
                    console.log("Could not fetch profile, using auth defaults.");
                }
            }
        };
        fetchProfile();
    }, [user]);

    // Save form data on every change
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("checkout_safe_data", JSON.stringify(formData));
        }, 500);
        return () => clearTimeout(timeout);
    }, [formData]);

    const validateForm = () => {
        const newErrors = {};
        const b = formData.billing_address;

        if (!b.first_name.trim()) newErrors.first_name = "Required";
        if (!b.last_name.trim()) newErrors.last_name = "Required";
        if (!b.address_1.trim()) newErrors.address_1 = "Required";
        if (!b.city.trim()) newErrors.city = "Required";
        if (!b.state.trim()) newErrors.state = "Required";

        if (!b.postcode.trim()) {
            newErrors.postcode = "Required";
        } else if (!/^\d{6}$/.test(b.postcode.trim())) {
            newErrors.postcode = "Invalid (6 digits)";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!b.email.trim()) {
            newErrors.email = "Required";
        } else if (!emailRegex.test(b.email.trim())) {
            newErrors.email = "Invalid Email";
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = b.phone.trim().replace(/[-\s]/g, "");
        if (!b.phone.trim()) {
            newErrors.phone = "Required";
        } else if (!phoneRegex.test(cleanPhone)) {
            newErrors.phone = "Invalid Number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            billing_address: {
                ...prev.billing_address,
                [name]: value
            }
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        if (!validateForm()) {
            setFormError("Please fill in all required fields to proceed.");
            window.scrollTo({ top: 100, behavior: 'smooth' });
            return;
        }

        navigate("/order-confirmation", {
            state: {
                checkoutData: formData.billing_address,
                paymentMethod: paymentMethod,
                customerId: customerId
            }
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue page-pt pb-24 relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-solarGreen/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container-main relative z-10">
                <div className="mb-20">
                    <Link to="/cart" className="inline-flex items-center gap-2 text-slate-500 hover:text-solarGreen mb-8 transition-all group">
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Back to Cart</span>
                    </Link>
                    <h1 className="text-premium-h1 mb-4 tracking-tighter">
                        Secure <span className="text-solarGreen">Checkout</span>
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                            <ShieldCheck className="w-4 h-4 text-solarGreen" /> SSL Encrypted Connection
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* BILLING FORM */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-50 dark:bg-white/5 backdrop-blur-3xl rounded-[50px] p-8 md:p-14 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-solarGreen to-transparent opacity-20" />

                            <h2 className="text-xl font-black mb-12 flex items-center justify-between uppercase tracking-widest text-slate-900 dark:text-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-solarGreen text-solarBlue flex items-center justify-center text-xs font-black">01</div>
                                    Shipping Details
                                </div>
                            </h2>

                            <AnimatePresence mode="wait">
                                {formError && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="mb-10 p-6 bg-red-500/5 border border-red-500/20 text-red-500 rounded-[30px] flex items-center gap-4"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{formError}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} noValidate className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                                            First Name {errors.first_name && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.billing_address.first_name}
                                            onChange={handleChange}
                                            className={`w-full bg-white dark:bg-slate-900 border ${errors.first_name ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-3xl px-8 py-5 text-sm font-bold focus:border-solarGreen outline-none transition-all shadow-inner`}
                                            placeholder="e.g. Rahul"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                                            Last Name {errors.last_name && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.billing_address.last_name}
                                            onChange={handleChange}
                                            className={`w-full bg-white dark:bg-slate-900 border ${errors.last_name ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-3xl px-8 py-5 text-sm font-bold focus:border-solarGreen outline-none transition-all shadow-inner`}
                                            placeholder="e.g. Sharma"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                                        Address Line 1 {errors.address_1 && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type="text"
                                        name="address_1"
                                        value={formData.billing_address.address_1}
                                        onChange={handleChange}
                                        placeholder="House number and street name"
                                        className={`w-full bg-white dark:bg-slate-900 border ${errors.address_1 ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-3xl px-8 py-5 text-sm font-bold focus:border-solarGreen outline-none transition-all shadow-inner placeholder:text-slate-300 dark:placeholder:text-white/10`}
                                    />
                                    <input
                                        type="text"
                                        name="address_2"
                                        value={formData.billing_address.address_2}
                                        onChange={handleChange}
                                        placeholder="Apartment, suite, unit, etc. (optional)"
                                        className="w-full mt-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl px-8 py-5 text-sm font-bold focus:border-solarGreen outline-none transition-all shadow-inner placeholder:text-slate-300 dark:placeholder:text-white/10"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                                            Town / City {errors.city && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.billing_address.city}
                                            onChange={handleChange}
                                            className={`w-full bg-white dark:bg-slate-900 border ${errors.city ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-3xl px-8 py-5 text-sm font-bold focus:border-solarGreen outline-none transition-all shadow-inner`}
                                            placeholder="e.g. Mumbai"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                                            State {errors.state && <span className="text-red-500">*</span>}
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="state"
                                                value={formData.billing_address.state}
                                                onChange={handleChange}
                                                className={`w-full bg-white dark:bg-slate-900 border ${errors.state ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-3xl px-8 py-5 text-sm font-bold focus:border-solarGreen outline-none transition-all shadow-inner appearance-none cursor-pointer`}
                                            >
                                                <option value="" className="text-slate-900">Select State</option>
                                                {indianStates.map(st => (
                                                    <option key={st.code} value={st.code} className="text-slate-900">{st.name}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                <ChevronLeft className="w-4 h-4 -rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                                            Postcode / ZIP {errors.postcode && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type="text"
                                            name="postcode"
                                            value={formData.billing_address.postcode}
                                            onChange={handleChange}
                                            placeholder="6-digit PIN code"
                                            className={`w-full bg-white dark:bg-slate-900 border ${errors.postcode ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-3xl px-8 py-5 text-sm font-bold focus:border-solarGreen outline-none transition-all shadow-inner placeholder:text-slate-300 dark:placeholder:text-white/10`}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value="India"
                                            readOnly
                                            className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl px-8 py-5 text-sm font-black opacity-40 cursor-not-allowed uppercase tracking-widest"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-4">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                                            Email Address {errors.email && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.billing_address.email}
                                            onChange={handleChange}
                                            className={`w-full bg-white dark:bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-3xl px-8 py-5 text-sm font-bold focus:border-solarGreen outline-none transition-all shadow-inner`}
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 flex items-center gap-2">
                                            Phone {errors.phone && <span className="text-red-500">*</span>}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-black opacity-20 pr-4 border-r border-slate-200 dark:border-white/10">+91</span>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.billing_address.phone}
                                                onChange={handleChange}
                                                placeholder="10-digit mobile"
                                                className={`w-full bg-white dark:bg-slate-900 border ${errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-3xl pl-20 pr-8 py-5 text-sm font-bold focus:border-solarGreen outline-none transition-all shadow-inner placeholder:text-slate-300 dark:placeholder:text-white/10`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* PAYMENT SELECTION */}
                                <div className="pt-10 border-t border-slate-200 dark:border-white/10">
                                    <h2 className="text-xl font-black mb-12 flex items-center justify-between uppercase tracking-widest text-slate-900 dark:text-white">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-solarGreen text-solarBlue flex items-center justify-center text-xs font-black">02</div>
                                            Payment Method
                                        </div>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when your items arrive', icon: <PackageCheck className="w-5 h-5" /> },
                                            { id: 'bacs', label: 'Bank Transfer', sub: 'Pay directly via bank transition', icon: <CreditCard className="w-5 h-5" /> }
                                        ].map(method => (
                                            <label
                                                key={method.id}
                                                className={`group flex flex-col gap-4 p-8 rounded-[40px] border-2 cursor-pointer transition-all duration-500 relative overflow-hidden ${paymentMethod === method.id
                                                    ? 'border-solarGreen bg-white dark:bg-white/5 shadow-2xl shadow-solarGreen/10 translate-y-[-4px]'
                                                    : 'border-slate-100 dark:border-white/5 bg-white dark:bg-transparent hover:border-solarGreen/30'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between relative z-10">
                                                    <div className={`p-4 rounded-2xl transition-all duration-500 ${paymentMethod === method.id ? 'bg-solarGreen text-solarBlue' : 'bg-slate-50 dark:bg-white/5 text-slate-400 group-hover:text-solarGreen'}`}>
                                                        {method.icon}
                                                    </div>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? 'border-solarGreen bg-solarGreen' : 'border-slate-200 dark:border-white/10'}`}>
                                                        {paymentMethod === method.id && <div className="w-2 h-2 bg-solarBlue rounded-full" />}
                                                    </div>
                                                </div>
                                                <div className="relative z-10">
                                                    <span className="font-black text-sm uppercase tracking-widest block mb-1">{method.label}</span>
                                                    <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tighter">{method.sub}</p>
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value={method.id}
                                                    checked={paymentMethod === method.id}
                                                    onChange={() => setPaymentMethod(method.id)}
                                                    className="hidden"
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={cartItems.length === 0}
                                    className="group w-full flex items-center justify-between pl-10 pr-6 py-6 mt-20 bg-solarGreen text-solarBlue rounded-[35px] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-solarGreen/20 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden disabled:opacity-50"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                                    <span className="relative z-10 font-black">Proceed to Review</span>
                                    <div className="relative z-10 w-14 h-14 bg-solarBlue text-solarGreen rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="lg:col-span-4 h-fit">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-950 text-white rounded-[50px] p-10 border border-white/10 shadow-3xl sticky top-32 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-solarGreen/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />

                            <h2 className="text-xl font-black mb-12 flex items-center justify-between pb-6 border-b border-white/5 relative z-10">
                                Order Summary
                                <div className="w-2 h-2 bg-solarGreen rounded-full animate-pulse shadow-[0_0_8px_rgba(100,255,153,1)]" />
                            </h2>

                            <div className="space-y-8 mb-12 max-h-[450px] overflow-y-auto no-scrollbar relative z-10 pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.key} className="flex gap-6 items-center group">
                                        <div className="w-20 h-20 rounded-[25px] overflow-hidden bg-white/5 flex-shrink-0 p-3 border border-white/10 group-hover:border-solarGreen/30 transition-colors">
                                            <img src={item.images?.[0]?.src} alt={item.name} className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-grow space-y-1">
                                            <h3 className="font-black text-xs leading-tight line-clamp-2 uppercase tracking-tight">{item.name}</h3>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Qty: {item.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-black text-sm text-white tracking-widest">₹{(item.prices.price / 100 * item.quantity).toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                ))}
                                {cartItems.length === 0 && (
                                    <div className="py-12 text-center space-y-4 opacity-50">
                                        <Info className="w-8 h-8 mx-auto" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em]">No items in cart</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-10 border-t border-white/10 space-y-6 relative z-10">
                                <div className="space-y-4 mb-4">
                                    <div className="flex justify-between items-center text-white/40">
                                        <span className="text-[10px] font-black uppercase tracking-widest">Subtotal</span>
                                        <span className="font-black text-white text-sm">₹{cartTotal.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-white/40">
                                        <span className="text-[10px] font-black uppercase tracking-widest">Taxes</span>
                                        <span className="text-white font-black text-[10px] tracking-widest">INC. GST</span>
                                    </div>
                                    <div className="flex justify-between items-center text-white/40">
                                        <span className="text-[10px] font-black uppercase tracking-widest">Shipping</span>
                                        <span className="text-solarGreen font-black text-[10px] tracking-widest">FREE</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end pt-8 border-t border-white/5 font-black">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Total Amount</span>
                                    </div>
                                    <span className="text-4xl text-white tracking-tighter">₹{cartTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="mt-12 space-y-4">
                                <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-[0.2em] text-white/20">
                                    <ShieldCheck className="w-3.5 h-3.5 text-solarGreen" /> Secure SSL Encryption
                                </div>
                                <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-[0.2em] text-white/20">
                                    <Truck className="w-3.5 h-3.5 text-solarGreen" /> Free Fast Delivery Active
                                </div>
                            </div>

                            <Link
                                to="/cart"
                                className="block text-center mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-solarGreen hover:tracking-[0.5em] transition-all relative z-10"
                            >
                                ← Return to Cart
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
