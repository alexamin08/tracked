import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { createCheckoutSession } from "@/lib/stripe-helpers";

export async function POST() {
  const user = await getOrCreateUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  try {
    const session = await createCheckoutSession(
      user.stripeCustomerId,
      user.email,
      user.clerkId
    );
    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Could not create checkout session." },
      { status: 500 }
    );
  }
}
