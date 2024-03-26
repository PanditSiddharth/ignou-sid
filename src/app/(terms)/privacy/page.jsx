// pages/privacy-policy.js

import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Privacy Policy - IGNOU-X</title>
        <meta name="description" content="Privacy Policy for IGNOU-X e-commerce platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

        <div className="bg-white rounded-md shadow-md p-6">
          <p className="mb-4">
            At IGNOU-X, we value the privacy of our users and are committed to protecting it. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our website.
          </p>

          <p className="mb-4">
            <strong>Collection of Personal Information:</strong>
            <br />
            We collect personal information from you when you register on our website, place an order, subscribe to our newsletter, respond to a survey, fill out a form, or engage in other activities on our website. The personal information we collect may include your name, email address, mailing address, phone number, and payment information.
          </p>

          <div className="mb-4">
            <strong>Use of Personal Information:</strong>
            <br />
            We may use the personal information we collect from you to:
            <ul className="list-disc pl-6">
              <li>Process transactions</li>
              <li>Send periodic emails regarding your orders or other products and services</li>
              <li>Improve our website and customer service</li>
              <li>Administer contests, promotions, surveys, or other site features</li>
            </ul>
          </div>

          <p className="mb-4">
            <strong>Protection of Personal Information:</strong>
            <br />
            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
          </p>

          <p className="mb-4">
            <strong>Disclosure of Personal Information:</strong>
            <br />
            We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
          </p>

          <p className="mb-4">
            <strong>Changes to the Privacy Policy:</strong>
            <br />
            We reserve the right to update or change our Privacy Policy at any time. Any changes to this Privacy Policy will be reflected on this page.
          </p>

          <p className="mb-4">
            By using our website, you consent to our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
