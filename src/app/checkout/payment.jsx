"use server"
// pages/api/createOrder.js

import Razorpay from 'razorpay';

export default async function handler(req, res) {
  // Initialize Razorpay instance with your API key credentials
  const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
  });

  const options = {
    amount: 50000, // amount in the smallest currency unit (here it's paise)
    currency: 'INR',
    receipt: 'order_receipt_1',
    payment_capture: 1 // Auto capture
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create order' });
  }
}
