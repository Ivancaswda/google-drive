// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import {getCurrentUser} from "@/lib/actions/user.actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

export async function POST() {
    try {

    const currentUser = await getCurrentUser();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: process.env.STRIPE_PRICE_ID!, // Продукт с 2GB
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
        metadata: {
            userId: currentUser.$id, //  ID Appwrite пользователя
            email: currentUser.email || "",
        },
    });

    return NextResponse.json({ id: session.id });
    } catch (error) {
        console.error("Ошибка в create-checkout-session:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500, headers: { "Content-Type": "application/json" }});
    }
}
