import Razorpay from "razorpay";

/**
 * Razorpay payment gateway instance
 * Initialized with environment variables for key ID and secret
 */
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});
