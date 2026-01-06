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
import OrderSuccess from "./pages/OrderSuccess";
import OrderConfirmation from "./pages/OrderConfirmation";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import SolarCalculator from "./pages/SolarCalculator";
import Maintenance from "./pages/Maintenance";
import LearningHub from "./pages/LearningHub";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

function App() {
  // Start in dark mode by default, but respect saved preference / system setting
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;

    const saved = window.localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true;
    }

    return true; // default to dark
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem("theme", darkMode ? "dark" : "light");

    // Also sync with root html for Tailwind dark variants
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
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
                  <Route path="/order-success" element={<OrderSuccess />} />
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
  );
}

export default App;
