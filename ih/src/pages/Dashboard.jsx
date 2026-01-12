import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { getProfile, getOrders, updateProfile } from "../api/customer";
import {
    LayoutDashboard,
    ShoppingBag,
    MapPin,
    Settings,
    LogOut,
    TrendingUp,
    CreditCard,
    Calendar,
    ArrowRight,
    FileText,
    Zap,
    User as UserIcon,
    ShieldCheck,
    Cpu,
    Activity,
    Box,
    Edit2,
    Save,
    X,
    Loader,
    ChevronDown,
    Truck
} from "lucide-react";

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
import SEO from "../components/SEO";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("overview");
    const [orders, setOrders] = useState([]);
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState({ totalOrders: 0, totalSpent: 0 });

    // Edit States
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null); // 'billing' | 'shipping' | null
    const [editForm, setEditForm] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [activeTab]);

    const fetchDashboardData = useCallback(async (isPolling = false) => {
        if (!user?.email) return;

        // Don't show global loader on polling or if profile already exists
        if (!isPolling && !profile) showLoader();

        try {
            const profileData = await getProfile(user.email);
            // Only update profile state if changed (deep check might be better but simple ref check is ok for now)
            // or just update it. React handles reconcile.
            setProfile(profileData);
            setEditForm({
                first_name: profileData.first_name,
                last_name: profileData.last_name,
                billing: profileData.billing,
                shipping: profileData.shipping
            });

            if (profileData.id) {
                // Pass email to catch guest orders or unlinked orders
                const ordersData = await getOrders(profileData.id, user.email);
                setOrders(ordersData);
                const total = ordersData.reduce((acc, order) => acc + parseFloat(order.total), 0);
                setStats({
                    totalOrders: ordersData.length,
                    totalSpent: total
                });
            }
        } catch (error) {
            console.error("Dashboard fetch error:", error);

            // Handle Stale Session: User exists in local storage but not in backend
            if (error.response && error.response.status === 404) {
                console.warn("User profile not found. Logging out...");
                logout();
                navigate("/login");
            }
        } finally {
            if (!isPolling) hideLoader();
        }
    }, [user, hideLoader, showLoader, logout, navigate, profile]); // removed profile from deps to prevent loop reset, handled logic inside

    useEffect(() => {
        // Initial Fetch
        fetchDashboardData(false);

        // Polling Strategy (Every 10 seconds)
        const interval = setInterval(() => {
            fetchDashboardData(true);
        }, 10000);

        return () => clearInterval(interval);
    }, [fetchDashboardData]);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            await updateProfile(profile.id, {
                first_name: editForm.first_name,
                last_name: editForm.last_name
            });
            await fetchDashboardData();
            setIsEditingProfile(false);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile. Please try again.");
            setIsSaving(false);
        }
    };

    const handleAddressChange = (type, field, value) => {
        setEditForm(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value
            }
        }));
    };

    const handleSaveAddress = async (type) => {
        setIsSaving(true);
        try {
            await updateProfile(profile.id, {
                [type]: editForm[type]
            });
            await fetchDashboardData();
            setEditingAddress(null);
        } catch (error) {
            console.error("Failed to update address", error);
            // alert("Failed to update address.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelAddressEdit = (type) => {
        setEditingAddress(null);
        // Reset form to original profile data
        setEditForm(prev => ({
            ...prev,
            [type]: profile[type]
        }));
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!user) return null;

    const tabs = [
        { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: "orders", label: "My Orders", icon: <ShoppingBag className="w-5 h-5" /> },
        { id: "addresses", label: "Addresses", icon: <MapPin className="w-5 h-5" /> },
        { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-20 md:pt-28 pb-12 relative overflow-hidden">
            <SEO
                title="My Dashboard | Infinity Helios"
                noindex={true}
            />
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[1000px] h-[1000px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-solarOrange/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-main relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

                    {/* SIDEBAR: NAVIGATION */}
                    <aside className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-white/80 dark:bg-slate-950/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[30px] p-6 sticky top-32 shadow-2xl space-y-6 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-solarGreen to-transparent opacity-20" />

                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="relative group/avatar">
                                    <div className="absolute inset-0 bg-solarGreen/30 rounded-[20px] blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
                                    <div className="relative w-16 h-16 rounded-[20px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-2xl font-black text-solarGreen shadow-inner overflow-hidden">
                                        {profile?.first_name?.[0] || user.username?.[0] || "U"}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-solarGreen/10 to-transparent" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-solarGreen rounded-xl border-2 border-white dark:border-solarBlue flex items-center justify-center shadow-lg">
                                        <ShieldCheck className="w-3 h-3 text-solarBlue" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight truncate max-w-full">
                                        {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : user.username}
                                    </h2>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 truncate max-w-[180px]">{user.email}</p>
                                </div>
                            </div>

                            <nav className="flex flex-col gap-1.5">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1 ml-3">User Menu</p>
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            group w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 relative overflow-hidden
                                            ${activeTab === tab.id
                                                ? 'bg-solarGreen text-solarBlue shadow-[0_10px_20px_rgba(100,255,153,0.15)]'
                                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-solarGreen'
                                            }
                                        `}
                                    >
                                        <span className={`transition-transform duration-500 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                            {tab.icon}
                                        </span>
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div layoutId="activeTabGlow" className="absolute right-3 w-1 h-1 bg-solarBlue rounded-full shadow-[0_0_8px_rgba(10,25,41,0.5)]" />
                                        )}
                                    </button>
                                ))}

                                <div className="h-px bg-slate-200 dark:bg-white/5 my-4 opacity-50" />

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/5 transition-all group"
                                >
                                    <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Sign Out
                                </button>
                            </nav>
                        </motion.div>
                    </aside>

                    {/* CONTENT AREA */}
                    <main className="lg:col-span-9">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* OVERVIEW TAB */}
                                {activeTab === 'overview' && (
                                    <div className="space-y-6">
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/5">
                                            <div>
                                                <div className="flex items-center gap-2 text-solarGreen font-black tracking-[0.3em] uppercase text-[9px] mb-2">
                                                    <Activity className="w-3 h-3" /> Account Activity
                                                </div>
                                                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Dashboard <span className="text-solarGreen">Overview</span></h1>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-white/5 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3 shadow-inner">
                                                <Calendar className="w-4 h-4 text-solarGreen" />
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-white/70">
                                                    {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {[
                                                { label: "Lifetime Spend", value: `₹${stats.totalSpent.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, icon: <TrendingUp className="w-5 h-5" />, color: "bg-solarGreen text-solarBlue", subtext: "Total transaction value" },
                                                { label: "My Orders", value: stats.totalOrders.toString().padStart(2, '0'), icon: <ShoppingBag className="w-5 h-5" />, color: "bg-slate-900 text-white dark:bg-white dark:text-solarBlue", subtext: "Total orders placed" },
                                                {
                                                    label: "Loyalty Tier",
                                                    value: stats.totalOrders >= 5 ? "Platinum" : stats.totalOrders >= 3 ? "Gold" : stats.totalOrders >= 1 ? "Silver" : "Bronze",
                                                    icon: <ShieldCheck className="w-5 h-5" />,
                                                    color: "bg-solarOrange text-white",
                                                    subtext: `Status: ${stats.totalOrders >= 5 ? "Platinum" : stats.totalOrders >= 3 ? "Gold" : stats.totalOrders >= 1 ? "Silver" : "Bronze"} Member`
                                                }
                                            ].map((item, i) => (
                                                <div key={i} className="bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[30px] p-6 shadow-xl flex flex-col justify-between h-full group transition-all hover:border-solarGreen/40 hover:-translate-y-1 duration-500">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-700 group-hover:rotate-[360deg] ${item.color}`}>
                                                            {item.icon}
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-solarGreen animate-pulse">Live</span>
                                                            <div className="w-1 h-1 bg-solarGreen rounded-full shadow-[0_0_8px_rgba(100,255,153,1)] mt-1.5" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{item.value}</h3>
                                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest pt-1 opacity-50">{item.subtext}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Recent Analytics Card */}
                                        <div className="bg-slate-950 rounded-[30px] p-8 md:p-10 overflow-hidden relative group shadow-2xl">
                                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-solarGreen/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-solarGreen/20 transition-colors duration-1000" />
                                            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-solarOrange/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                                            <div className="relative z-10">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h3 className="text-lg font-black text-white flex items-center gap-3">
                                                        <div className="w-1.5 h-6 bg-solarGreen rounded-full shadow-[0_0_15px_rgba(100,255,153,0.5)]" />
                                                        Recent Orders
                                                    </h3>
                                                </div>

                                                {orders.length > 0 ? (
                                                    <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex flex-col md:flex-row items-center justify-between gap-8 group/item hover:bg-white/10 transition-all duration-700">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-14 h-14 rounded-xl bg-solarGreen/10 border border-solarGreen/20 flex flex-col items-center justify-center text-solarGreen group-hover/item:bg-solarGreen group-hover/item:text-solarBlue transition-all duration-500 shadow-inner">
                                                                <span className="text-[8px] font-black opacity-50">ID</span>
                                                                <span className="text-base font-black">#{orders[0].id}</span>
                                                            </div>
                                                            <div>
                                                                <p className="text-lg font-black text-white tracking-tight mb-1">Solar Order Details</p>
                                                                <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em]">Placed on: {new Date(orders[0].date_created).toDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
                                                            <div className="text-left md:text-right">
                                                                <p className="text-3xl font-black text-solarGreen tabular-nums tracking-tighter">₹{parseFloat(orders[0].total).toLocaleString('en-IN')}</p>
                                                                <span className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 bg-solarGreen/10 text-solarGreen text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-solarGreen/20">
                                                                    <div className="w-1 h-1 bg-solarGreen rounded-full animate-pulse" />
                                                                    Status: {orders[0].status}
                                                                </span>
                                                            </div>
                                                            <button
                                                                onClick={() => setActiveTab("orders")}
                                                                className="group/btn relative px-8 py-4 bg-white text-solarBlue rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl overflow-hidden"
                                                            >
                                                                <div className="absolute inset-0 bg-solarGreen/20 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                                                                <span className="relative z-10 flex items-center gap-2">View Details <ArrowRight className="w-3 h-3" /></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-16 bg-white/5 rounded-[30px] border border-white/10">
                                                        <Box className="w-10 h-10 text-white/10 mx-auto mb-4" />
                                                        <p className="text-xs text-white/30 font-black uppercase tracking-[0.3em] italic">No active orders detected.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ORDERS TAB */}
                                {activeTab === 'orders' && (
                                    <div className="space-y-6">
                                        <div className="pb-6 border-b border-slate-100 dark:border-white/5">
                                            <div className="flex items-center gap-2 text-solarGreen font-black tracking-[0.3em] uppercase text-[9px] mb-2">
                                                <ShoppingBag className="w-3 h-3" /> My Orders
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Order <span className="text-solarGreen">History</span></h2>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5">
                                            {orders.length > 0 ? orders.map(order => (
                                                <div key={order.id} className="group bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[30px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:border-solarGreen/40 hover:bg-slate-50 dark:hover:bg-white/[0.08] duration-500">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-16 h-16 rounded-[20px] bg-slate-900 flex flex-col items-center justify-center text-white border border-white/10 group-hover:bg-solarGreen group-hover:text-solarBlue transition-all duration-700 shadow-xl">
                                                            <span className="text-[8px] font-black opacity-40 uppercase tracking-widest mb-1">ID</span>
                                                            <span className="text-lg font-black tabular-nums">#{order.id}</span>
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <div className="flex items-center gap-3">
                                                                <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Solar Equipment</h4>
                                                                <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] rounded-full border ${order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                                    order.status === 'processing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                                        'bg-solarOrange/10 text-solarOrange border-solarOrange/20'
                                                                    }`}>
                                                                    {order.status}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <p className="text-[9px] font-black text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                                                                    <Calendar className="w-3 h-3 text-solarGreen" />
                                                                    {new Date(order.date_created).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                                </p>
                                                                <div className="w-1 h-1 bg-slate-200 dark:bg-white/10 rounded-full" />
                                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{order.line_items.length} Items</p>
                                                            </div>
                                                            <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 line-clamp-1 uppercase tracking-tight opacity-60">{order.line_items.map(i => `${i.quantity}x ${i.name}`).join(' | ')}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 pt-6 md:pt-0 border-slate-100 dark:border-white/5">
                                                        <div className="flex-grow md:text-right">
                                                            <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">₹{parseFloat(order.total).toLocaleString('en-IN')}</p>
                                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">{order.payment_method_title}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => navigate('/track-order', { state: { orderId: order.id, email: user.email } })}
                                                            className="w-12 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-solarGreen hover:text-solarBlue transition-all shadow-xl group/btn mr-3"
                                                            title="Track Order"
                                                        >
                                                            <Truck className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/order/${order.id}/invoice`)}
                                                            className="w-12 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center hover:bg-solarGreen hover:text-solarBlue transition-all shadow-xl group/btn"
                                                            title="View Invoice"
                                                        >
                                                            <FileText className="w-5 h-5 transition-transform group-hover/btn:scale-125" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="bg-white/30 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-16 text-center">
                                                    <ShoppingBag className="w-16 h-16 text-slate-200 dark:text-white/5 mx-auto mb-6" />
                                                    <p className="text-lg font-light text-slate-400 italic">No order history found.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* ADDRESSES TAB */}
                                {activeTab === 'addresses' && (
                                    <div className="space-y-6">
                                        <div className="pb-6 border-b border-slate-100 dark:border-white/5">
                                            <div className="flex items-center gap-2 text-solarGreen font-black tracking-[0.3em] uppercase text-[9px] mb-2">
                                                <MapPin className="w-3 h-3" /> My Addresses
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Saved <span className="text-solarGreen">Locations</span></h2>
                                        </div>

                                        <div className="grid grid-cols-1 gap-8">
                                            {['billing', 'shipping'].map((type) => {
                                                const isEditing = editingAddress === type;
                                                const data = isEditing ? editForm[type] : (profile?.[type] || {});
                                                const label = type === 'billing' ? "Billing Address" : "Shipping Address";
                                                const icon = type === 'billing' ? <CreditCard className="w-5 h-5" /> : <MapPin className="w-5 h-5" />;

                                                return (
                                                    <div key={type} className="bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[30px] p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                                                        <div className="flex items-center justify-between mb-6">
                                                            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-4">
                                                                <div className="w-1.5 h-6 bg-solarGreen rounded-full shadow-[0_0_10px_rgba(100,255,153,0.3)]" />
                                                                {label}
                                                            </h3>
                                                            {!isEditing ? (
                                                                <button
                                                                    onClick={() => setEditingAddress(type)}
                                                                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-solarGreen hover:text-solarBlue transition-colors"
                                                                >
                                                                    <Edit2 className="w-3 h-3" /> Edit
                                                                </button>
                                                            ) : (
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        onClick={() => handleCancelAddressEdit(type)}
                                                                        className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                                                                        disabled={isSaving}
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleSaveAddress(type)}
                                                                        disabled={isSaving}
                                                                        className="flex items-center gap-2 px-4 py-2 bg-solarGreen text-solarBlue rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg disabled:opacity-50"
                                                                    >
                                                                        {isSaving ? <Loader className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                                                        Save
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {!isEditing ? (
                                                            <div className="space-y-6">
                                                                <div className="space-y-1.5">
                                                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Contact</p>
                                                                    <p className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tighter">
                                                                        {data.first_name || "--"} {data.last_name || "--"}
                                                                    </p>
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Full Address</p>
                                                                    <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-inner">
                                                                        <p className="text-sm font-black text-slate-600 dark:text-white/70 leading-relaxed uppercase tracking-tight">
                                                                            {data.company && <span className="opacity-50 block mb-1">{data.company}</span>}
                                                                            {data.address_1 || "No Address Set"}<br />
                                                                            {data.address_2 && <span>{data.address_2}<br /></span>}
                                                                            {data.city} {data.state} {data.postcode}<br />
                                                                            {data.country}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {type === 'billing' && (
                                                                    <div className="pt-6 border-t border-slate-100 dark:border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <p className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500"><span className="w-6 h-6 rounded-lg bg-solarGreen/10 flex items-center justify-center text-solarGreen italic">@</span> {data.email || "--"}</p>
                                                                        <p className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500"><span className="w-6 h-6 rounded-lg bg-solarGreen/10 flex items-center justify-center text-solarGreen">#</span> {data.phone || "--"}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                                <div className="space-y-1">
                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">First Name</label>
                                                                    <input type="text" value={data.first_name || ""} onChange={(e) => handleAddressChange(type, 'first_name', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-solarGreen outline-none" placeholder="First Name" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Last Name</label>
                                                                    <input type="text" value={data.last_name || ""} onChange={(e) => handleAddressChange(type, 'last_name', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-solarGreen outline-none" placeholder="Last Name" />
                                                                </div>

                                                                <div className="col-span-1 md:col-span-2 space-y-1">
                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Company (Optional)</label>
                                                                    <input type="text" value={data.company || ""} onChange={(e) => handleAddressChange(type, 'company', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-solarGreen outline-none" placeholder="Company Name" />
                                                                </div>

                                                                <div className="col-span-1 md:col-span-2 space-y-1">
                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Address Line 1</label>
                                                                    <input type="text" value={data.address_1 || ""} onChange={(e) => handleAddressChange(type, 'address_1', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-solarGreen outline-none" placeholder="House number and street name" />
                                                                </div>
                                                                <div className="col-span-1 md:col-span-2 space-y-1">
                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Address Line 2 (Optional)</label>
                                                                    <input type="text" value={data.address_2 || ""} onChange={(e) => handleAddressChange(type, 'address_2', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-solarGreen outline-none" placeholder="Apartment, suite, unit, etc." />
                                                                </div>

                                                                <div className="space-y-1">
                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">City</label>
                                                                    <input type="text" value={data.city || ""} onChange={(e) => handleAddressChange(type, 'city', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-solarGreen outline-none" placeholder="City" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">State</label>
                                                                    <div className="relative">
                                                                        <select
                                                                            value={data.state || ""}
                                                                            onChange={(e) => handleAddressChange(type, 'state', e.target.value)}
                                                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-solarGreen outline-none appearance-none cursor-pointer"
                                                                        >
                                                                            <option value="">Select State</option>
                                                                            {indianStates.map(st => (
                                                                                <option key={st.code} value={st.code}>{st.name}</option>
                                                                            ))}
                                                                        </select>
                                                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-1">
                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Postcode</label>
                                                                    <input type="text" value={data.postcode || ""} onChange={(e) => handleAddressChange(type, 'postcode', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-solarGreen outline-none" placeholder="PIN Code" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Country</label>
                                                                    <input type="text" value={data.country || "IN"} disabled className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold opacity-50 cursor-not-allowed" />
                                                                </div>

                                                                {type === 'billing' && (
                                                                    <>
                                                                        <div className="space-y-1">
                                                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                                                                            <input type="email" value={data.email || ""} onChange={(e) => handleAddressChange(type, 'email', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-solarGreen outline-none" placeholder="Email" />
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone</label>
                                                                            <input type="tel" value={data.phone || ""} onChange={(e) => handleAddressChange(type, 'phone', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold focus:border-solarGreen outline-none" placeholder="Phone" />
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* SETTINGS TAB */}
                                {activeTab === 'settings' && (
                                    <div className="space-y-6 max-w-3xl">
                                        <div className="pb-6 border-b border-slate-100 dark:border-white/5">
                                            <div className="flex items-center gap-2 text-solarGreen font-black tracking-[0.3em] uppercase text-[9px] mb-2">
                                                <Settings className="w-3 h-3" /> Account Settings
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Profile <span className="text-solarGreen">Details</span></h2>
                                        </div>

                                        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[30px] p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-solarGreen/5 rounded-full blur-[80px]" />

                                            <div className="flex items-center justify-between mb-6 relative z-10">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-solarGreen rounded-xl flex items-center justify-center text-solarBlue shadow-xl">
                                                        <UserIcon className="w-5 h-5" />
                                                    </div>
                                                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Personal Info</h3>
                                                </div>

                                                {!isEditingProfile ? (
                                                    <button
                                                        onClick={() => setIsEditingProfile(true)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-solarGreen hover:text-solarBlue transition-colors"
                                                    >
                                                        <Edit2 className="w-3 h-3" /> Edit
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => setIsEditingProfile(false)}
                                                            className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                                                            disabled={isSaving}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={handleSaveProfile}
                                                            disabled={isSaving}
                                                            className="flex items-center gap-2 px-4 py-2 bg-solarGreen text-solarBlue rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg disabled:opacity-50"
                                                        >
                                                            {isSaving ? <Loader className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                                            Save
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-6 relative z-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">First Name</label>
                                                        {isEditingProfile ? (
                                                            <input
                                                                type="text"
                                                                value={editForm.first_name || ""}
                                                                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                                                                className="w-full bg-white dark:bg-slate-900 border border-solarGreen rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-black uppercase tracking-tight text-base shadow-inner focus:outline-none"
                                                            />
                                                        ) : (
                                                            <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 px-6 py-4 rounded-2xl text-slate-900 dark:text-white font-black uppercase tracking-tight text-base shadow-inner">
                                                                {profile?.first_name || "NOT SET"}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">Last Name</label>
                                                        {isEditingProfile ? (
                                                            <input
                                                                type="text"
                                                                value={editForm.last_name || ""}
                                                                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                                                                className="w-full bg-white dark:bg-slate-900 border border-solarGreen rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-black uppercase tracking-tight text-base shadow-inner focus:outline-none"
                                                            />
                                                        ) : (
                                                            <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/10 px-6 py-4 rounded-2xl text-slate-900 dark:text-white font-black uppercase tracking-tight text-base shadow-inner">
                                                                {profile?.last_name || "NOT SET"}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1">Email Address</label>
                                                    <div className="bg-slate-100 dark:bg-white/5 border border-slate-100 dark:border-white/5 px-6 py-4 rounded-2xl text-slate-500 dark:text-white/50 font-black uppercase tracking-tight text-base shadow-inner truncate cursor-not-allowed">
                                                        {user.email} <span className="text-[8px] ml-2 opacity-50">(READ ONLY)</span>
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-solarOrange/5 border border-solarOrange/20 rounded-[20px] flex items-start gap-4 group">
                                                    <div className="w-10 h-10 rounded-xl bg-solarOrange/10 border border-solarOrange/20 flex items-center justify-center text-solarOrange flex-shrink-0 group-hover:scale-110 transition-transform">
                                                        <ShieldCheck className="w-5 h-5" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-black text-solarOrange uppercase tracking-[0.2em]">Secure Profile</p>
                                                        <p className="text-[10px] text-slate-500 dark:text-solarOrange/60 font-medium leading-relaxed">
                                                            Your profile information is protected. To update your email or sensitive details, please contact support.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
