import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import API_BASE_URL from "../api/config";
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
    Box
} from "lucide-react";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("overview");
    const [orders, setOrders] = useState([]);
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState({ totalOrders: 0, totalSpent: 0 });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [activeTab]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user?.email) return;

            showLoader();
            try {
                const profileRes = await fetch(`${API_BASE_URL}/api/user/profile?email=${user.email}`);
                const profileData = await profileRes.json();

                if (profileRes.ok) {
                    setProfile(profileData);
                    if (profileData.id) {
                        const ordersRes = await fetch(`${API_BASE_URL}/api/user/orders?customer_id=${profileData.id}`);
                        const ordersData = await ordersRes.json();
                        if (ordersRes.ok) {
                            setOrders(ordersData);
                            const total = ordersData.reduce((acc, order) => acc + parseFloat(order.total), 0);
                            setStats({
                                totalOrders: ordersData.length,
                                totalSpent: total
                            });
                        }
                    }
                }
            } catch (error) {
                console.error("Dashboard fetch error:", error);
            } finally {
                hideLoader();
            }
        };

        fetchDashboardData();
    }, [user, showLoader, hideLoader]);

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
        <div className="min-h-screen bg-white dark:bg-solarBlue pt-24 md:pt-32 pb-24 relative overflow-hidden">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[1000px] h-[1000px] bg-solarGreen/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-solarOrange/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-main relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* SIDEBAR: NAVIGATION */}
                    <aside className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-white/80 dark:bg-slate-950/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[40px] p-8 sticky top-32 shadow-3xl space-y-8 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-solarGreen to-transparent opacity-20" />

                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="relative group/avatar">
                                    <div className="absolute inset-0 bg-solarGreen/30 rounded-[30px] blur-2xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
                                    <div className="relative w-24 h-24 rounded-[30px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-3xl font-black text-solarGreen shadow-inner overflow-hidden">
                                        {profile?.first_name?.[0] || user.username?.[0] || "U"}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-solarGreen/10 to-transparent" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-solarGreen rounded-2xl border-4 border-white dark:border-solarBlue flex items-center justify-center shadow-xl">
                                        <ShieldCheck className="w-4 h-4 text-solarBlue" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter truncate max-w-full">
                                        {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : user.username}
                                    </h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">{user.email}</p>
                                </div>
                            </div>

                            <nav className="flex flex-col gap-2">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1 ml-4">User Menu</p>
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            group w-full flex items-center gap-4 px-5 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 relative overflow-hidden
                                            ${activeTab === tab.id
                                                ? 'bg-solarGreen text-solarBlue shadow-[0_15px_30px_rgba(100,255,153,0.2)]'
                                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-solarGreen'
                                            }
                                        `}
                                    >
                                        <span className={`transition-transform duration-500 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                            {tab.icon}
                                        </span>
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div layoutId="activeTabGlow" className="absolute right-4 w-1.5 h-1.5 bg-solarBlue rounded-full shadow-[0_0_8px_rgba(10,25,41,0.5)]" />
                                        )}
                                    </button>
                                ))}

                                <div className="h-px bg-slate-200 dark:bg-white/5 my-8 opacity-50" />

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-5 px-6 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/5 transition-all group"
                                >
                                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                                    <div className="space-y-12">
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100 dark:border-white/5">
                                            <div>
                                                <div className="flex items-center gap-3 text-solarGreen font-black tracking-[0.4em] uppercase text-[10px] mb-3">
                                                    <Activity className="w-4 h-4" /> Account Activity
                                                </div>
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">Dashboard <span className="text-solarGreen">Overview</span></h1>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-white/5 px-8 py-4 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center gap-4 shadow-inner">
                                                <Calendar className="w-5 h-5 text-solarGreen" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-white/70">
                                                    {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {[
                                                { label: "Lifetime Spend", value: `₹${stats.totalSpent.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, icon: <TrendingUp className="w-6 h-6" />, color: "bg-solarGreen text-solarBlue", subtext: "Total transaction value" },
                                                { label: "My Orders", value: stats.totalOrders.toString().padStart(2, '0'), icon: <ShoppingBag className="w-6 h-6" />, color: "bg-slate-900 text-white dark:bg-white dark:text-solarBlue", subtext: "Total orders placed" },
                                                {
                                                    label: "Loyalty Tier",
                                                    value: stats.totalOrders >= 5 ? "Platinum" : stats.totalOrders >= 3 ? "Gold" : stats.totalOrders >= 1 ? "Silver" : "Bronze",
                                                    icon: <ShieldCheck className="w-6 h-6" />,
                                                    color: "bg-solarOrange text-white",
                                                    subtext: `Status: ${stats.totalOrders >= 5 ? "Platinum" : stats.totalOrders >= 3 ? "Gold" : stats.totalOrders >= 1 ? "Silver" : "Bronze"} Member`
                                                }
                                            ].map((item, i) => (
                                                <div key={i} className="bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[40px] p-8 shadow-2xl flex flex-col justify-between h-full group transition-all hover:border-solarGreen/40 hover:-translate-y-2 duration-500">
                                                    <div className="flex items-center justify-between mb-8">
                                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:rotate-[360deg] ${item.color}`}>
                                                            {item.icon}
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-solarGreen animate-pulse">Live</span>
                                                            <div className="w-1.5 h-1.5 bg-solarGreen rounded-full shadow-[0_0_8px_rgba(100,255,153,1)] mt-2" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">{item.label}</p>
                                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{item.value}</h3>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pt-2 opacity-50">{item.subtext}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Recent Analytics Card */}
                                        <div className="bg-slate-950 rounded-[40px] p-10 md:p-12 overflow-hidden relative group shadow-3xl">
                                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-solarGreen/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-solarGreen/20 transition-colors duration-1000" />
                                            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-solarOrange/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                                            <div className="relative z-10">
                                                <div className="flex items-center justify-between mb-8">
                                                    <h3 className="text-xl font-black text-white flex items-center gap-4">
                                                        <div className="w-2 h-8 bg-solarGreen rounded-full shadow-[0_0_15px_rgba(100,255,153,0.5)]" />
                                                        Recent Orders
                                                    </h3>
                                                </div>

                                                {orders.length > 0 ? (
                                                    <div className="bg-white/5 border border-white/10 rounded-[30px] p-8 flex flex-col md:flex-row items-center justify-between gap-10 group/item hover:bg-white/10 transition-all duration-700">
                                                        <div className="flex items-center gap-8">
                                                            <div className="w-16 h-16 rounded-2xl bg-solarGreen/10 border border-solarGreen/20 flex flex-col items-center justify-center text-solarGreen group-hover/item:bg-solarGreen group-hover/item:text-solarBlue transition-all duration-500 shadow-inner">
                                                                <span className="text-[9px] font-black opacity-50">ID</span>
                                                                <span className="text-lg font-black">#{orders[0].id}</span>
                                                            </div>
                                                            <div>
                                                                <p className="text-xl font-black text-white tracking-tight mb-1">Solar Order Details</p>
                                                                <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em]">Placed on: {new Date(orders[0].date_created).toDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
                                                            <div className="text-left md:text-right">
                                                                <p className="text-4xl font-black text-solarGreen tabular-nums tracking-tighter">₹{parseFloat(orders[0].total).toLocaleString('en-IN')}</p>
                                                                <span className="inline-flex items-center gap-2 mt-3 px-5 py-2 bg-solarGreen/10 text-solarGreen text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-solarGreen/20">
                                                                    <div className="w-1.5 h-1.5 bg-solarGreen rounded-full animate-pulse" />
                                                                    Status: {orders[0].status}
                                                                </span>
                                                            </div>
                                                            <button
                                                                onClick={() => setActiveTab("orders")}
                                                                className="group/btn relative px-10 py-5 bg-white text-solarBlue rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl overflow-hidden"
                                                            >
                                                                <div className="absolute inset-0 bg-solarGreen/20 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                                                                <span className="relative z-10 flex items-center gap-3">View Details <ArrowRight className="w-4 h-4" /></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-20 bg-white/5 rounded-[40px] border border-white/10">
                                                        <Box className="w-12 h-12 text-white/10 mx-auto mb-6" />
                                                        <p className="text-sm text-white/30 font-black uppercase tracking-[0.3em] italic">No active orders detected.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ORDERS TAB */}
                                {activeTab === 'orders' && (
                                    <div className="space-y-12">
                                        <div className="pb-8 border-b border-slate-100 dark:border-white/5">
                                            <div className="flex items-center gap-3 text-solarGreen font-black tracking-[0.4em] uppercase text-[10px] mb-3">
                                                <ShoppingBag className="w-4 h-4" /> My Orders
                                            </div>
                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">Order <span className="text-solarGreen">History</span></h2>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            {orders.length > 0 ? orders.map(order => (
                                                <div key={order.id} className="group bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[40px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-all hover:border-solarGreen/40 hover:bg-slate-50 dark:hover:bg-white/[0.08] duration-500">
                                                    <div className="flex items-center gap-8">
                                                        <div className="w-20 h-20 rounded-[30px] bg-slate-900 flex flex-col items-center justify-center text-white border border-white/10 group-hover:bg-solarGreen group-hover:text-solarBlue transition-all duration-700 shadow-2xl">
                                                            <span className="text-[8px] font-black opacity-40 uppercase tracking-widest mb-1">ID</span>
                                                            <span className="text-xl font-black tabular-nums">#{order.id}</span>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-4">
                                                                <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Solar Equipment</h4>
                                                                <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border ${order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                                    order.status === 'processing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                                        'bg-solarOrange/10 text-solarOrange border-solarOrange/20'
                                                                    }`}>
                                                                    {order.status}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-6">
                                                                <p className="text-[10px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                                                                    <Calendar className="w-4 h-4 text-solarGreen" />
                                                                    {new Date(order.date_created).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                                </p>
                                                                <div className="w-1.5 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full" />
                                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.line_items.length} Items</p>
                                                            </div>
                                                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 line-clamp-1 uppercase tracking-tight opacity-60">{order.line_items.map(i => `${i.quantity}x ${i.name}`).join(' | ')}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-10 w-full md:w-auto border-t md:border-t-0 pt-8 md:pt-0 border-slate-100 dark:border-white/5">
                                                        <div className="flex-grow md:text-right">
                                                            <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">₹{parseFloat(order.total).toLocaleString('en-IN')}</p>
                                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">{order.payment_method_title}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => navigate(`/order/${order.id}/invoice`)}
                                                            className="w-16 h-16 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center hover:bg-solarGreen hover:text-solarBlue transition-all shadow-2xl group/btn"
                                                        >
                                                            <FileText className="w-7 h-7 transition-transform group-hover/btn:scale-125" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="bg-white/30 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[60px] p-24 text-center">
                                                    <ShoppingBag className="w-20 h-20 text-slate-200 dark:text-white/5 mx-auto mb-8" />
                                                    <p className="text-xl font-light text-slate-400 italic">No order history found.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* ADDRESSES TAB */}
                                {activeTab === 'addresses' && (
                                    <div className="space-y-12">
                                        <div className="pb-8 border-b border-slate-100 dark:border-white/5">
                                            <div className="flex items-center gap-3 text-solarGreen font-black tracking-[0.4em] uppercase text-[10px] mb-3">
                                                <MapPin className="w-4 h-4" /> My Addresses
                                            </div>
                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">Saved <span className="text-solarGreen">Locations</span></h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {[
                                                { label: "Billing Address", data: profile?.billing, icon: <CreditCard className="w-6 h-6" /> },
                                                { label: "Shipping Address", data: profile?.shipping, icon: <MapPin className="w-6 h-6" /> }
                                            ].map((box, i) => (
                                                <div key={i} className="bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[40px] p-10 shadow-3xl group hover:border-solarGreen/30 transition-all duration-500">
                                                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8 flex items-center justify-between">
                                                        <span className="flex items-center gap-5">
                                                            <div className="w-2 h-8 bg-solarGreen rounded-full shadow-[0_0_10px_rgba(100,255,153,0.3)]" />
                                                            {box.label}
                                                        </span>
                                                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 flex items-center justify-center text-solarGreen shadow-inner group-hover:scale-110 transition-transform">
                                                            {box.icon}
                                                        </div>
                                                    </h3>
                                                    {box.data ? (
                                                        <div className="space-y-8">
                                                            <div className="space-y-2">
                                                                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Contact</p>
                                                                <p className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">{box.data.first_name} {box.data.last_name}</p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Full Address</p>
                                                                <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 shadow-inner">
                                                                    <p className="text-base font-black text-slate-600 dark:text-white/70 leading-relaxed uppercase tracking-tight">
                                                                        {box.data.company && <span className="opacity-50">{box.data.company}<br /></span>}
                                                                        {box.data.address_1}<br />
                                                                        {box.data.city}, {box.data.state} {box.data.postcode}<br />
                                                                        {box.data.country}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {box.label.includes("Billing") && (
                                                                <div className="pt-8 border-t border-slate-100 dark:border-white/5 grid grid-cols-1 gap-5">
                                                                    <p className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"><span className="w-8 h-8 rounded-xl bg-solarGreen/10 flex items-center justify-center text-solarGreen italic">@</span> {box.data.email}</p>
                                                                    <p className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"><span className="w-8 h-8 rounded-xl bg-solarGreen/10 flex items-center justify-center text-solarGreen">#</span> {box.data.phone}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-10 opacity-30 italic">
                                                            <p className="text-sm font-black uppercase tracking-widest">No address data found.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* SETTINGS TAB */}
                                {activeTab === 'settings' && (
                                    <div className="space-y-12 max-w-3xl">
                                        <div className="pb-8 border-b border-slate-100 dark:border-white/5">
                                            <div className="flex items-center gap-3 text-solarGreen font-black tracking-[0.4em] uppercase text-[10px] mb-3">
                                                <Settings className="w-4 h-4" /> Account Settings
                                            </div>
                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">Profile <span className="text-solarGreen">Details</span></h2>
                                        </div>

                                        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[40px] p-10 md:p-12 shadow-3xl space-y-10 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-solarGreen/5 rounded-full blur-[80px]" />

                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 bg-solarGreen rounded-2xl flex items-center justify-center text-solarBlue shadow-2xl">
                                                        <UserIcon className="w-7 h-7" />
                                                    </div>
                                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Personal Info</h3>
                                                </div>
                                                <div className="flex items-center gap-3 px-5 py-2 bg-slate-950 text-white rounded-full">
                                                    <div className="w-1.5 h-1.5 bg-solarGreen rounded-full shadow-[0_0_8px_rgba(100,255,153,1)]" />
                                                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">SECURE</span>
                                                </div>
                                            </div>

                                            <div className="space-y-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-2">First Name</label>
                                                        <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 px-8 py-6 rounded-3xl text-slate-900 dark:text-white font-black uppercase tracking-tight text-lg shadow-inner">
                                                            {profile?.first_name || "NOT SET"}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-2">Last Name</label>
                                                        <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/10 px-8 py-6 rounded-3xl text-slate-900 dark:text-white font-black uppercase tracking-tight text-lg shadow-inner">
                                                            {profile?.last_name || "NOT SET"}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-2">Email Address</label>
                                                    <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 px-8 py-6 rounded-3xl text-slate-900 dark:text-white font-black uppercase tracking-tight text-lg shadow-inner truncate">
                                                        {user.email}
                                                    </div>
                                                </div>

                                                <div className="p-8 bg-solarOrange/5 border border-solarOrange/20 rounded-[40px] flex items-start gap-6 group">
                                                    <div className="w-12 h-12 rounded-2xl bg-solarOrange/10 border border-solarOrange/20 flex items-center justify-center text-solarOrange flex-shrink-0 group-hover:scale-110 transition-transform">
                                                        <ShieldCheck className="w-6 h-6" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[11px] font-black text-solarOrange uppercase tracking-[0.2em]">Secure Profile</p>
                                                        <p className="text-[12px] text-slate-500 dark:text-solarOrange/60 font-medium leading-relaxed">
                                                            Your profile information is protected. To update your core account details, please contact our support team.
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
