// pages/about.js
"use client";
import { useLoadingStore } from '@/store';
import Head from 'next/head';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const About = () => {
  const setLoadingG = useLoadingStore(state => state.setLoadingG);
  
  useEffect(() => { 
    toast.dismiss();
    setLoadingG(false);
  }, []);

  return (
    <div>
      <Head>
        <title>About Us - IGNOU-X</title>
        <meta name="description" content="Learn about us and our mission at IGNOU-X." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-2xl px-4 py-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
          <div className="text-lg mb-6">
            At IGNOU-X, we understand the importance of reliable resources for students, especially in the academic world. That's why we've curated a specialized marketplace specifically tailored to cater to the needs of students seeking soft copies of PDFs for their educational pursuits, particularly focusing on IGNOU products such as project assignments and guess papers.
          </div>
          <div className="text-lg mb-6">
            <h4 className='text-2xl font-bold mb-2'>For Sellers</h4>
            <p>
              Joining our platform means joining a community committed to integrity and excellence. As a seller, you can showcase your expertise and offer your meticulously crafted educational materials with confidence, knowing that you're reaching a targeted audience of students eager for quality resources. With our robust security measures in place, you can trust that your transactions will be conducted smoothly and securely, eliminating any concerns about fraudulent activities.
            </p>
          </div>
          <div className="text-lg mb-6">
            <h4 className='text-2xl font-bold mb-2'>For Students</h4>
            <p>
              Finding reliable study materials has never been easier. Say goodbye to the uncertainties of sourcing educational materials from dubious sources. At IGNOU-X, you can browse through a vast array of soft copies of PDFs provided by trusted sellers, ensuring that you're investing in materials that will truly enhance your learning experience. Whether you're in need of project assignments, guess papers, or any other IGNOU-related resources, you'll find everything you need conveniently gathered in one place.
            </p>
          </div>
          <div className="text-lg">
            <h4 className='text-2xl font-bold mb-2'>Why Choose Us?</h4>
            <ul className="list-disc pl-6">
              <li>Trustworthy Platform: We prioritize the trust and security of both sellers and students, fostering a transparent and reliable marketplace.</li>
              <li>Specialized Focus: With a focus on IGNOU products, we provide a niche platform catering specifically to the needs of students in this academic domain.</li>
              <li>Convenience: Enjoy the ease of browsing, purchasing, and accessing educational materials from the comfort of your own home, saving you time and effort.</li>
            </ul>
            <p className="mt-4">
              Join us at IGNOU-X and experience the difference that trust and convenience can make in your educational journey. Whether you're a seller looking to reach a dedicated audience or a student in search of top-notch resources, we're here to facilitate your academic success every step of the way. Welcome to the future of educational commerce.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
