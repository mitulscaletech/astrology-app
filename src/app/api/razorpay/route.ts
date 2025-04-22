import { NextResponse } from "next/server";
import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay API keys are missing. Please check your environment variables.");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const payment = await razorpay.orders.create({
      amount: amount, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    return NextResponse.json(
      {
        orderId: payment.id,
        amount: payment.amount,
        currency: payment.currency
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: "Error creating payment order" }, { status: 500 });
  }
}
