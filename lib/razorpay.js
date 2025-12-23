import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  // We only log a warning here so that the rest of the app can still run
  console.warn(
    "[Razorpay] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not set in environment variables."
  );
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});


