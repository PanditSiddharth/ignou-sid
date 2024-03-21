"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { RxCross2 } from "react-icons/rx";
import { IoMenu } from 'react-icons/io5';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import Logo from './logo';
import { useLoadingStore, useUserG, useUserStore } from '@/store';
import { useRouter, usePathname } from 'next/navigation';
import { FaUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { GoHome } from "react-icons/go"
import { PiStudent } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { RiServiceLine } from "react-icons/ri";
import { MdOutlineInfo } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";
import { LiaLuggageCartSolid } from "react-icons/lia";
import cssi from "./css.module.css"

const NavebarClient = (props) => {
  const router = useRouter() 
  const pathname = usePathname()

  const [login, setUserG] = useUserG(props?.cookie)
  console.log(login)
  let setLoadingG = useLoadingStore(state => state.setLoadingG)
  let [menuVisibility, setMenuVisibility] = useState("yes");
  // login = 
  const navigations = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" }
  ]


  const handleRoute = (e) => {
    // e.preventDefault();
    console.log(e.target)
    if (window.location.pathname != e.target.id) {
      setLoadingG(true)
      router.push(e.target.id)
    } else {
      toast.info(<div className='p-2 bg-white rounded-2xl'>Already on it</div>, { duration: 50 })
    }
  }

  const specialPath = /\/sellers(?!\/)|\/students(?!\/)|\/products(?!\/)/.test(pathname);
  const specialPath1 = /\/sellers|\/students/.test(pathname);

  const handleChildClick = (e) => {
    // Traverse up the DOM tree until the parent button element is found
    let target = e.target;
    while (target !== null && target.tagName !== 'BUTTON') {
      target = target.parentElement;
    }

    // If the parent button element is found, retrieve its ID
    if (target !== null) {
      handleRoute({ target })
      // Now you can use the buttonId as needed
    }
  };
  const toggleMenu = () => {
    setMenuVisibility(!menuVisibility);
  };

  const handleBackgroundClick = (event) => {
    // Check if the click is outside the component
    if (!menuVisibility) {
      toggleMenu();
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('click', handleBackgroundClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleBackgroundClick);
    };
  }, [menuVisibility]); // Re-run effect when isActive changes

  return (
    <header className={`body-font shadow-md bg-white sticky z-50 top-0 h-14 items-center justify-between px-2 md:px-7 dark:bg-sky-900 antialiased ${specialPath ? "hidden" : (specialPath1 ? "flex sm:hidden" : "flex")}`}>

      {/* Logo */}
      <button id='/' onClick={handleChildClick} className="flex title-font font-medium items-center text-sky-800 hover:cursor-pointer">
        {/* <Image src="/sid.jpg" className='rounded-full border-4 border-sky-950' width={40} height={42} alt='Logo' /> */}
        <Logo css1="w-12 h-12" />
        <span className="text-xl font-extrabold text-sky-800 hover:text-sky-950 dark:text-gray-400 dark:hover:text-gray-500">IGNOU-X</span>

      </button>

      {/* Navigation */}
      <nav className={`hidden md:flex md:space-x-5 dark:text-white`}>
        {navigations.map((e, index) => (
          <button id={e.href} key={index} className="hover:text-sky-950 hover:underline hover:dark:text-sky-400 hover:cursor-pointer " onClick={handleRoute}>{e.name}</button>
        ))}
      </nav>

      {/* Navigation */}
      <nav className={`${menuVisibility ? 'hidden' : ''} fixed z-50 bg-white top-14 rounded-lg right-0 w-[100%] sm:w-[60%] h-[100%] dark:bg-sky-900 flex flex-col items-center md:hidden`}>

        <div className='w-full flex flex-col items-center text-gray-700 dark:text-white h-full'>

          <div className={"flex flex-col min-h-[22rem] h-[30rem] justify-evenly text-sky-950 dark:text-gray-100 w-full py-8 "} >
            {login && <Link className="flex space-x-2 items-center py-3 border-b dark:border-sky-800 pl-10 border-gray-100"
              href={login.studentid ? `/students/${login.studentid}` : `/sellers/${login.sellerid}`}
              onClick={e => handleRoute({ ...e, target: { ...e.target, id: login.studentid ? `/students/${login.studentid}` : `/sellers/${login.sellerid}` } })}
            >
              <img
                src={login?.photo?.thumb || `https://ui-avatars.com/api/?name=${login.name || "L O L"}&background=random`}
                width={32} height={32}
                className="w-8 h-8 rounded-full" />
              <h5 className="text-xl">Profile</h5>
            </Link>}
            <Link className="flex space-x-2 items-center py-3 border-b dark:border-sky-800 pl-10 border-gray-100"
              href={"/"}
              onClick={e => handleRoute({ ...e, target: { ...e.target, id: "/" } })}
            >
              <GoHome className="w-8 h-8" />
              <h5 className="text-xl">Home</h5>
            </Link>
            <Link
              onClick={e => handleRoute({ ...e, target: { ...e.target, id: "/products" } })}
              className="flex space-x-2 items-center py-3 border-b dark:border-sky-800 pl-10 border-gray-100" href="/products">
              <LiaLuggageCartSolid className="w-8 h-8" />
              <h5 className="text-xl">Products</h5>
            </Link>
            <Link
              onClick={e => handleRoute({ ...e, target: { ...e.target, id: "/students" } })}
              className="flex space-x-2 items-center py-3 border-b dark:border-sky-800 pl-10 border-gray-100" href="/students">
              <PiStudent className="w-8 h-8" />
              <h5 className="text-xl">Students</h5>
            </Link>
            <Link
              onClick={e => handleRoute({ ...e, target: { ...e.target, id: "/sellers" } })}
              className="flex space-x-2 items-center py-3 border-b dark:border-sky-800 pl-10 border-gray-100" href="/sellers">
              <CgProfile className="w-8 h-8" />
              <h5 className="text-xl">Sellers</h5>
            </Link>
            <Link
              onClick={e => handleRoute({ ...e, target: { ...e.target, id: "/services" } })}
              className="flex space-x-2 items-center py-3 border-b dark:border-sky-800 pl-10 border-gray-100" href="/services">
              <RiServiceLine className="w-8 h-8" />
              <h5 className="text-xl">Services</h5>
            </Link>
            <Link
              onClick={e => handleRoute({ ...e, target: { ...e.target, id: "/about" } })}
              className="flex space-x-2 items-center py-3 border-b dark:border-sky-800 pl-10 border-gray-100" href="/about">
              <MdOutlineInfo className="w-8 h-8" />
              <h5 className="text-xl">About</h5>
            </Link>
            <Link
              onClick={e => handleRoute({ ...e, target: { ...e.target, id: "/contact" } })}
              className="flex space-x-2 items-center py-3 border-b dark:border-sky-800 pl-10 border-gray-100" href="/contact">
              <RiCustomerService2Line className="w-8 h-8" />
              <h5 className="text-xl">Contact</h5>
            </Link>

          </div>
        </div>

        {!login && <div className={`flex space-x-1`}>

          <button id='/sign-up' onClick={handleChildClick} className="inline-flex items-center bg-sky-800 border-0 py-[5px] px-3 focus:outline-2 hover:bg-sky-950 rounded text-white mt-4 md:mt-0 space-x-1 text-sm ">
            <FaUserPlus />
            <div >Signup</div>
          </button>

          <button id='/sign-in' onClick={handleChildClick} className="inline-flex items-center bg-sky-800 border-0 py-[5px] px-3 md:mr-0 mr-1 focus:outline-none hover:bg-sky-950 rounded text-white mt-4 md:mt-0 text-sm space-x-1 ">
            <FaUser className='text-sm w-[10px]' />
            <div >Signin</div>
          </button>
        </div>}

      </nav>
      <div className='flex'>
        {login ? (login?.photo ? <img src={`${login?.photo?.thumb}`} width={50} height={50} className='w-8 h-8 rounded-full md:hidden' onClick={toggleMenu} /> : <FaUserCircle className='w-7 h-7 rounded-full md:hidden text-gray-400 bg-white border-0 outline-none dark:bg-gray-200 dark:text-sky-700 shadow-none' onClick={toggleMenu} />) : (
          <div>
            <IoMenu className={`${menuVisibility ? '' : 'hidden'} md:hidden text-sky-800 dark:text-white`} onClick={toggleMenu} size={20} />
            <RxCross2 className={`${menuVisibility ? 'hidden' : ''} md:hidden text-sky-800 dark:text-white`} onClick={toggleMenu} size={20} />
          </div>)}
      </div>

      {/* Auth */}
      {login ? (
        login.photo ? <img src={`${login?.photo?.thumb}`} width={50} height={50} className='w-8 h-8 rounded-full hidden md:block' id={login.sellerid ? `/sellers/${login.sellerid}` : `/students/${login.studentid}`} onClick={handleRoute} /> : <FaUserCircle className='w-7 h-7 rounded-full hidden md:flex text-gray-400 bg-white border-0 outline-none dark:bg-gray-200 dark:text-sky-700 shadow-none' id={login.sellerid ? `/sellers/${login.sellerid}` : `/students/${login.studentid}`} onClick={handleRoute} />)

        :

        <div className={`hidden md:flex space-x-1`}>

          <button id='/sign-up' onClick={handleChildClick} className="inline-flex items-center bg-sky-800 border-0 py-[5px] px-3 focus:outline-2 hover:bg-sky-950 rounded text-white mt-4 md:mt-0 space-x-1 text-sm ">
            <FaUserPlus />
            <div >Signup</div>
          </button>


          <button id='/sign-in' onClick={handleChildClick} className="inline-flex items-center bg-sky-800 border-0 py-[5px] px-3 md:mr-0 mr-1 focus:outline-none hover:bg-sky-950 rounded text-white mt-4 md:mt-0 text-sm space-x-1 ">
            <FaUser className='text-sm w-[10px]' />
            <div  >Signin</div>
          </button>

        </div>}
    </header>
  )
}

export default NavebarClient