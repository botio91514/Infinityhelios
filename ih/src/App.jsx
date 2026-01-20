import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { LoaderProvider } from "./context/LoaderContext";
import GlobalLoader from "./components/GlobalLoader";
import AxiosLoader from "./components/AxiosLoader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingActionButtons from "./components/FloatingActionButtons";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ProjectsPage from "./pages/ProjectsPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OrderTracking from "./pages/OrderTracking";
import OrderSuccess from "./pages/OrderSuccess";
import OrderFailed from "./pages/OrderFailed";
import PaymentVerify from "./pages/PaymentVerify";
import OrderConfirmation from "./pages/OrderConfirmation";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import SolarCalculator from "./pages/SolarCalculator";
import Maintenance from "./pages/Maintenance";
import LearningHub from "./pages/LearningHub";
import BlogPost from "./pages/BlogPost";
import PrivacyData from "./pages/PrivacyData";
import Compliance from "./pages/Compliance";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import ShippingPolicy from "./pages/ShippingPolicy";
import NotFound from "./pages/NotFound";

import SplashScreen from "./components/SplashScreen";

function App() {
  // Start in dark mode by default
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = window.localStorage.getItem("theme");
    return saved === "dark" || (!saved && true);
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", darkMode ? "dark" : "light");
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <AuthProvider>
        <LoaderProvider>
          <CartProvider>
            <BrowserRouter>
              <AxiosLoader />
              <ScrollToTop />
              <GlobalLoader />
              <FloatingActionButtons />
              <div className={darkMode ? "dark" : ""}>
                <div className="min-h-screen overflow-x-hidden bg-white dark:bg-solarBlue text-slate-900 dark:text-white transition-colors duration-300">
                  <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/track-order" element={<OrderTracking />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/order-failed" element={<OrderFailed />} />
                    <Route path="/payment-verify" element={<PaymentVerify />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/calculator" element={<SolarCalculator />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    <Route path="/learning-hub" element={<LearningHub />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/privacy-data" element={<PrivacyData />} />
                    <Route path="/compliance" element={<Compliance />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route
                      path="/order/:id/invoice"
                      element={
                        <ProtectedRoute>
                          <Invoice />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </div>
              </div>
            </BrowserRouter>
          </CartProvider>
        </LoaderProvider>
      </AuthProvider>
    </>
  );
}

export default App;
