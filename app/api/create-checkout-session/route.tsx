// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import {getCurrentUser} from "@/lib/actions/user.actions";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

export async function POST() {
    try {

    const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!, // Продукт с 2GB
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/failed`,
        metadata: {
            userId: currentUser.accountId, //  ID Appwrite пользователя
            email: currentUser.email || "",
        },
    });
        console.log(session)
    return NextResponse.json({ id: session.id });
    } catch (error) {
        console.error("Ошибка в create-checkout-session:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { "Content-Type": "application/json" }});
    }
}
