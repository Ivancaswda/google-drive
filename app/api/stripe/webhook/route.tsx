// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { updateUserStorageLimit } from "@/lib/actions/user.actions";

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

const endpointSecret = process.env.NEXT_PUBLIC_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const rawBody = await req.arrayBuffer();
    const bodyBuffer = Buffer.from(rawBody);
    const sig = req.headers.get("stripe-signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(bodyBuffer, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook signature error:", err);
        return new NextResponse("Webhook Error", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('payment success     ugadshgafsh !!!')
        const userId = session.metadata?.userId;

        if (userId) {
            // до 2GB
            await updateUserStorageLimit(userId, 2 * 1024 * 1024 * 1024);
        }
    }

    return NextResponse.json({ received: true });
}
