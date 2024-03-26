// pages/shipping-and-delivery.js

import Head from 'next/head';
import Link from 'next/link';

export default function ShippingAndDelivery() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Shipping and Delivery Policy - IGNOU-X</title>
        <meta name="description" content="Shipping and Delivery Policy for IGNOU-X e-commerce platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Shipping and Delivery Policy</h1>

        <div className="bg-white rounded-md shadow-md p-6">
          <p className="mb-4">
            Our Shipping and Delivery Policy provides information about rules, timelines, and processes for delivering items purchased on IGNOU-X.
          </p>

          <p className="mb-4">
            <strong>Order Processing and Delivery:</strong>
            <br />
            Orders are processed immediately upon payment. Customers can download their purchased PDFs directly from our platform without any delay.
          </p>

          <p className="mb-4">
            <strong>Offline Purchase:</strong>
            <br />
            For offline purchases, customers need to contact the sellers individually. Sellers are required to pay a fee of 5 rupees to provide contact information to the buyer when buyer wants.
          </p>

          <p className="mb-4">
            If you have any questions or concerns about our Shipping and Delivery Policy, please feel free to <Link className='px-1 text-sky-600 hover:underline' href={"/contact"}>
            contact us.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
