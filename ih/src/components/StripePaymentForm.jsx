import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { ArrowRight, Lock } from "lucide-react";

export default function StripePaymentForm({ onSuccess, onError, billingDetails }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setMessage(submitError.message);
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                payment_method_data: {
                    billing_details: {
                        name: `${billingDetails.first_name} ${billingDetails.last_name}`,
                        email: billingDetails.email,
                        phone: billingDetails.phone,
                        address: {
                            line1: billingDetails.address_1,
                            line2: billingDetails.address_2,
                            city: billingDetails.city,
                            state: billingDetails.state,
                            postal_code: billingDetails.postcode,
                            country: billingDetails.country,
                        }
                    }
                },
                return_url: `${window.location.origin}/order-success`,
            },
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            onError(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment succeeded!");
            onSuccess(paymentIntent);
        } else {
            setMessage("Unexpected state");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />

            {message && (
                <div className="p-4 rounded-xl bg-red-50 text-red-500 text-xs font-bold">
                    {message}
                </div>
            )}

            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="group w-full flex items-center justify-between pl-8 pr-5 py-4 bg-solarGreen text-solarBlue rounded-[20px] font-black uppercase tracking-[0.3em] text-[10px] shadow-xl shadow-solarGreen/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
            >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-solarBlue/30 border-t-solarBlue rounded-full animate-spin" />
                    ) : (
                        <Lock className="w-3 h-3" />
                    )}
                    {isLoading ? "Processing..." : "Pay Now"}
                </span>

                <div className="relative z-10 w-8 h-8 bg-solarBlue text-solarGreen rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                </div>
            </button>
        </form>
    );
}
