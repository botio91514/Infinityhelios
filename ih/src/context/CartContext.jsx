import { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart, updateCartItem, processCheckout } from "../api/cart";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Hook into auth state

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  // Only load cart once on mount, not on every user change
  useEffect(() => {
    // Delay initial cart load to prioritize page content
    const timer = setTimeout(() => {
      loadCart();
    }, 100);
    return () => clearTimeout(timer);
  }, []); // Empty dependency - only run once

  // Reload cart when user logs in/out
  useEffect(() => {
    const handleUserChange = async () => {
      if (user) {
        // Wait 300ms for state/auth to settle before fetching
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      await loadCart();
    };

    handleUserChange();
  }, [user]);

  const addItem = async (productId, quantity = 1) => {
    const data = await addToCart(productId, quantity);
    setCart(data);
  };

  const removeItem = async (key) => {
    const data = await removeFromCart(key);
    setCart(data);
  };

  const updateItem = async (key, quantity) => {
    const data = await updateCartItem(key, quantity);
    setCart(data);
  };

  const checkout = async (billingData, paymentMethod = "cod") => {
    const data = await processCheckout(billingData, paymentMethod);
    return data;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        removeItem,
        updateItem,
        checkout,
        loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
