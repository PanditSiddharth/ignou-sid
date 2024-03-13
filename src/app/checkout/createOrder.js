"use server"
// pages/api/createOrder.js

import Razorpay from 'razorpay';

export default async function createOrder(req) {
  // Initialize Razorpay instance with your API key credentials
  const razorpay = new Razorpay({
    key_id: 'rzp_test_HvIq1U2N1F97SM',
    key_secret: 'ah7JNLlRfHYbGhddDgtRy2z6'
  });

  const options = {
    amount: req.amount, // amount in the smallest currency unit (here it's paise)
    currency: 'INR',
    payment_capture: 1 // Auto capture
  };

  try {
    const order = await razorpay.orders.create(options);
    return order
  } catch (error) {
    return { error: 'Unable to create order' }
  }
}
