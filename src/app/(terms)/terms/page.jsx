// pages/terms-and-conditions.js

import Head from 'next/head';

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Terms and Conditions - IGNOU-X</title>
        <meta name="description" content="Terms and Conditions for IGNOU-X e-commerce platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

        <div className="bg-white rounded-md shadow-md p-6">
          <p className="mb-4">
            <strong>Contact Information:</strong>
            <br />
            Email: mynmss3@gmail.com<br />
            Secondary Email: i@sidsharma.in<br />
            Contact and WhatsApp Number: +91 6389680622<br />
            Address: Banshigarhi Bhattkherwa, Kakrabad, Lucknow, Uttar Pradesh, India, 226101
          </p>

          <p className="mb-4">
            <strong>Limitation of Liability and Disclaimer of Warranties:</strong>
            <br />
            IGNOU-X provides this website as a platform for sellers to offer products and services to buyers (students). While we strive to ensure the accuracy and reliability of the information provided on this website, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
          </p>

          <p className="mb-4">
            In no event shall IGNOU-X be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
          </p>

          <p className="mb-4">
            <strong>Rules of Conduct:</strong>
            <br />
            1. Users must not engage in any unlawful or fraudulent activities on this website.<br />
            2. Sellers must abide by the pricing restrictions set forth by IGNOU-X, ensuring that product prices are not less than 9 rupees.<br />
            3. Sellers must provide accurate and up-to-date bank details for payment processing.<br />
            4. Sellers must not include direct contact details such as email and mobile numbers in their profile's about section.<br />
            5. Sellers are responsible for the content they upload to the platform and must adhere to all applicable laws and regulations.<br />
            6. Users must not attempt to tamper with or disrupt the functionality of the website or its underlying systems.
          </p>

          <p className="mb-4">
            <strong>User Restrictions:</strong>
            <br />
            1. Users must be at least 15 years old to use this website.<br />
            2. Users must not use this website for any unlawful or prohibited purpose.<br />
            3. Users must not attempt to access areas of the website that are not intended for public access.<br />
            4. Users must not attempt to bypass any security measures implemented on the website.
          </p>
        </div>
      </div>
    </div>
  );
}
