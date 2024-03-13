"use client"
import Link from "next/link";
import { FaTelegram } from "react-icons/fa6";
import { usePathname } from "next/navigation"; 
import { useEffect, useState } from "react";
const Footer = () => {
  const pathname = usePathname()
  const [hideit, setHideIt] = useState(["/sellers", "/students", "/products"].includes(pathname) ? true : false)
  useEffect(()=> {
    if(["/sellers", "/students", "/products"].includes(pathname))
    setHideIt(true)
    else 
    setHideIt(false)
  }, [pathname])

  const shareText = encodeURIComponent("Check out this awesome website!");
  return (
    !hideit && <footer className="bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-sky-900 bottom-0 antialiased">
  <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
      &copy; 2024-2025 <Link href="https://ignou.sidsharma.in/" className="hover:underline" target="_blank">Sidsharma.in</Link>. All rights reserved.
  </p>
  <div className="flex justify-center items-center space-x-1">
    <Link href={`https://telegram.me/share/url?url=https://ignou.sidsharma.in&text=${shareText}`} target="_blank">
   <FaTelegram className="text-gray-500" />
    </Link>
</div>
</footer>
  )
}

export default Footer;

