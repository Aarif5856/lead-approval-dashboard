'use client';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalCheckoutProps {
    onSuccess: () => void;
}

export function PayPalCheckout({ onSuccess }: PayPalCheckoutProps) {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!clientId) {
        return <div className="text-red-500">Error: Missing PayPal Client ID</div>;
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
            <div className="text-center mb-6">
                <h3 className="text-xl font-display font-bold text-white mb-2">Unlock Premium Research</h3>
                <p className="text-slate-400 text-sm">
                    Get unlimited access to all verified leads and personalized details.
                </p>
                <div className="mt-4 text-3xl font-bold text-white">
                    $99.00
                </div>
            </div>

            <PayPalScriptProvider options={{ clientId, currency: "USD" }}>
                <PayPalButtons
                    style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value: "99.00",
                                    },
                                    description: "ResearchScoutAI Premium Access",
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        if (actions.order) {
                            await actions.order.capture();
                            onSuccess();
                        }
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
}
