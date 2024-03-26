// components/Footer.js
"use client"
import Link from "next/link";
import { FaTelegram } from "react-icons/fa6";
import { usePathname } from "next/navigation"; 
import { useEffect, useState } from "react";

const Footer = () => {
  const pathname = usePathname();
  const [hideit, setHideIt] = useState(/\/sellers.*|\/students.*|\/products/.test(pathname) ? true : false);
  
  useEffect(()=> {
    if (/\/sellers.*|\/students.*|\/products/.test(pathname))
      setHideIt(true);
    else 
      setHideIt(false);
  }, [pathname]);

  const shareText = encodeURIComponent("Check out this awesome website!");

  return (
    !hideit && (
      <footer className="bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-sky-900 bottom-0 antialiased">
        <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
          <span>
          &copy; 2024-2025 
          </span>
          <Link href="https://ignou.sidsharma.in/" target="_blank" className="hover:underline text-blue-500 pl-1">Sidsharma.in</Link>
          . All rights reserved.
        </p>
        <div className="flex justify-center items-center space-x-4 flex-col sm:flex-row">
          <Link href="/terms" passHref>
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer whitespace-nowrap">T & C</span>
          </Link>
          <Link href="/shipping" passHref>
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">Shipping</span>
          </Link>
          <Link href="/contact" passHref>
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">Contact</span>
          </Link>
          <Link href="/privacy" passHref>
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">Privacy</span>
          </Link>
          <Link href="/refund" passHref>
            <span className="text-gray-500 hover:text-gray-700 cursor-pointer">Refund</span>
          </Link>
          <Link href={`https://telegram.me/share/url?url=https://ignou.sidsharma.in&text=${shareText}`} target="_blank" passHref>
            <span className="text-gray-500 cursor-pointer"><FaTelegram /></span>
          </Link>
        </div>
      </footer>
    )
  );
};

export default Footer;
