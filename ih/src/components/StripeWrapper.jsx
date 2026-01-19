import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

// Initialize Stripe outside of component to avoid recreating object on renders
const stripeKey = "pk_test_51SrCafBVpS9xUVqzCtuZIvJlqstV9CbFRChzutDsIWnpZsQxymHk91FRU2erOdlac1IwKdp7yNJSMCdpGr58gnt700e2qWPxm1";
// Start with 'pk_test_' and use the SAME account as your Secret Key.
// You used: sk_test_51SrCaf... so you MUST use pk_test_51SrCaf... from the SAME dashboard.
if (!stripeKey) console.error("Stripe Publishable Key is missing");
const stripePromise = loadStripe(stripeKey);

const StripeWrapper = ({ children, clientSecret, options = {} }) => {
    // If we don't have a clientSecret yet (loading), we can't render Elements
    if (!clientSecret && !options.mode) {
        return <div className="p-4 text-center text-sm text-gray-500 animate-pulse">Loading secure payment server...</div>;
    }

    const appearance = {
        theme: 'flat',
        variables: {
            colorPrimary: '#22c55e',
            colorBackground: '#ffffff',
            colorText: '#0f172a',
            colorDanger: '#ef4444',
            fontFamily: '"Inter", system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '12px',
        },
        rules: {
            '.Input': {
                border: '1px solid #e2e8f0',
                boxShadow: 'none',
            },
            '.Input:focus': {
                border: '1px solid #22c55e',
                boxShadow: 'none',
            }
        }
    };

    if (!stripePromise) {
        return <div className="p-4 text-center text-red-500 font-bold">Stripe Configuration Error: Missing Public Key</div>;
    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance, ...options }}>
            {children}
        </Elements>
    );
};

export default StripeWrapper;
