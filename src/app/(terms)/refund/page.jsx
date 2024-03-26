// pages/cancellation-and-refund.js

import Head from 'next/head';

export default function CancellationAndRefund() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Cancellation and Refund Policy - IGNOU-X</title>
        <meta name="description" content="Cancellation and Refund Policy for IGNOU-X e-commerce platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Cancellation and Refund Policy</h1>

        <div className="bg-white rounded-md shadow-md p-6">
          <p className="mb-4">
            We understand that sometimes you may need to cancel an order or request a refund. Please review our Cancellation and Refund Policy below for more information:
          </p>

          <p className="mb-4">
            <strong>Cancellation Policy:</strong>
            <br />
            Orders can be canceled before they are processed for delivery. Once an order has been processed, it cannot be canceled.
          </p>

          <p className="mb-4">
            <strong>Refund Policy:</strong>
            <br />
            We do not offer refunds on digital products such as online PDFs. All sales are final once the digital product has been delivered.
            However, if you encounter any serious issues with the digital product, you may contact us directly to request a refund. Refund requests will be reviewed on a case-by-case basis.
          </p>

          <p className="mb-4">
            If a refund is approved, it will be processed using the original method of payment. Please allow a reasonable amount of time for the refund to be processed.
          </p>

          <p className="mb-4">
            <strong>Exceptions:</strong>
            <br />
            In certain circumstances, we may make exceptions to our refund policy. These circumstances will be evaluated on a case-by-case basis.
          </p>

          <p className="mb-4">
            If you have any questions or concerns about our Cancellation and Refund Policy, please feel free to contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
