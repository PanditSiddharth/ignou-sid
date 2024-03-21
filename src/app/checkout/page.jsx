

// RazorpayPayment.js
"use client"
import { useEffect, useState } from 'react';
import createOrder from './createOrder';
import { toast } from 'react-toastify';

const RazorpayPayment = () => {
    const [orderId, setOrderId] = useState(null);

        const loadScript = async () => {
            try {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                document.body.appendChild(script);
            } catch (error) {
                console.error(error);
            }
        }

        // Once the order is created, initiate payment
        const initiatePayment = async () => {
            try {
                await loadScript();
                const data = await createOrder({ amount: 4000 });

                const rzp = new window.Razorpay({
                    key: 'rzp_test_HvIq1U2N1F97SM',
                    amount: data.amount,
                    currency: 'INR',
                    
                    name: 'IGNOU-X',
                    description: 'Purchase Description',
                    order_id: data.id,
                    handler: function (response) {
                        // Handle successful payment
                      
                        toast.info('Payment successful. Payment ID: ' + response.razorpay_payment_id, {duration: 20000});
                        // You may want to redirect to a thank you page or perform further actions
                    },
                    prefill: {
                        name: 'User Name',
                        email: 'user@example.com',
                        contact: '9999999999'
                    }
                });
                rzp.open();
            } catch (error) {
                console.error(error);
                return { error: error.message }
            }
        }

    return (
        <div>
            <button className='w-full h-96 flex items-center justify-center dark:text-white' onClick={initiatePayment}>Pay Now</button>
        </div>
    );
};

export default RazorpayPayment;
