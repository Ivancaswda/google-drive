import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
});

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "No session_id provided" }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        return NextResponse.json(session);
    } catch (err) {
        console.error("Ошибка при получении Stripe сессии:", err);
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
}
