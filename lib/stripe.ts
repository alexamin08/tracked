import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    });
  }
  return _stripe;
}

// Lazy proxy so imports don't crash at build time without env vars
export const stripe: Stripe = new Proxy(
  {} as Stripe,
  {
    get(_, prop) {
      const instance = getStripe();
      return (instance as unknown as Record<string | symbol, unknown>)[prop];
    },
  }
);
