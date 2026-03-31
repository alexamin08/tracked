import { stripe } from "./stripe";
import { PLANS, SITE_URL } from "./constants";

export async function createCheckoutSession(
  customerId: string | null,
  customerEmail: string,
  clerkUserId: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: PLANS.starter.stripePriceId,
        quantity: 1,
      },
    ],
    ...(customerId
      ? { customer: customerId }
      : { customer_email: customerEmail }),
    subscription_data: {
      trial_period_days: 14,
      metadata: { clerk_user_id: clerkUserId },
    },
    success_url: `${SITE_URL}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/subscribe`,
    metadata: { clerk_user_id: clerkUserId },
  });

  return session;
}

export async function createPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${SITE_URL}`,
  });

  return session;
}
