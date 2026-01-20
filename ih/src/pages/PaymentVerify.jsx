import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { placeSecureOrder } from "../api/cart";
import { useCart } from "../context/CartContext";

const PaymentVerify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loadCart } = useCart();
    const [status, setStatus] = useState("Verifying Payment...");

    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const verifyPayment = async () => {
            const paymentIntentId = searchParams.get("payment_intent");
            const redirectStatus = searchParams.get("redirect_status");

            if (!paymentIntentId) {
                navigate("/order-failed", { state: { error: "No payment detected." } });
                return;
            }

            if (redirectStatus === "failed") {
                navigate("/order-failed", { state: { error: "Payment was declined or cancelled." } });
                return;
            }

            if (redirectStatus === "succeeded") {
                try {
                    setStatus("Finalizing Order...");

                    // Recover checkout data from localStorage (saved in Checkout.jsx)
                    const savedData = localStorage.getItem("checkout_safe_data");
                    let billingData = {};
                    if (savedData) {
                        const parsed = JSON.parse(savedData);
                        billingData = parsed.billing_address || {};
                    }

                    // Place the order in WooCommerce
                    const order = await placeSecureOrder(billingData, paymentIntentId);

                    // Refresh cart (which should now be empty or needing update)
                    await loadCart();

                    // Success!
                    navigate("/order-success", { state: { order } });

                } catch (error) {
                    console.error("Order Creation Failed:", error);
                    // Payment succeeded, but order creation failed.
                    // Navigate to success but maybe with a warning? 
                    // Or failed? Technically the user PAID.
                    // Better to go to success but show "Manual Verification Needed".
                    // For now, let's treat as success fallback or specific error page.
                    // Let's go to failed but mention payment ID.
                    navigate("/order-failed", {
                        state: {
                            error: `Payment successful (ID: ${paymentIntentId}), but order creation failed. Please contact support.`
                        }
                    });
                }
            }
        };

        verifyPayment();
    }, [searchParams, navigate, loadCart]);

    return (
        <div className="min-h-screen bg-white dark:bg-solarBlue flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-solarGreen/30 border-t-solarGreen rounded-full animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest text-slate-400">{status}</p>
            </div>
        </div>
    );
};

export default PaymentVerify;
