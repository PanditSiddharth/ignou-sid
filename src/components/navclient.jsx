"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { RxCross2 } from "react-icons/rx";
import { IoMenu } from 'react-icons/io5';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import Logo from './logo';
import { useLoadingStore, useUserG, useUserStore } from '@/store';
import MyImage from "next/image"
import {useRouter, usePathname} from 'next/navigation';
import museRouter from 'next/router';
import { getCookie } from 'cookies-next';
import { FaUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify';

const NavebarClient = (props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [hideit, setHideIt] = useState(["/sellers", "/students", "/products"].includes(pathname) ? true : false)
  // const [login, setLogin] = useState(props?.cookie)

  const [login, setUserG] = useUserG(props?.cookie)
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
      toast.info(<div className='p-2 bg-white rounded-2xl'>Already on it</div>, {duration: 50})
    }
  }
  
  useEffect(()=> {
    if(["/sellers", "/students", "/products"].includes(pathname))
    setHideIt(true)
    else 
    setHideIt(false)
  }, [pathname])

  const handleChildClick = (e) => {
    // Traverse up the DOM tree until the parent button element is found
    let target = e.target;
    while (target !== null && target.tagName !== 'BUTTON') {
        target = target.parentElement;
    }

    // If the parent button element is found, retrieve its ID
    if (target !== null) {
        handleRoute({target})
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

  // useEffect(() => {
  //   if (!getCookie("token"))
  //     setLogin("")
  //   if (!Array.isArray(loggedIn)) {
  //     setLogin(loggedIn)
  //   }
  // }, [loggedIn])

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('click', handleBackgroundClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleBackgroundClick);
    };
  }, [menuVisibility]); // Re-run effect when isActive changes

  return (
   !hideit && <header className="body-font shadow-md bg-white sticky z-50 top-0 h-14 flex items-center justify-between px-2 md:px-7 dark:bg-sky-900 antialiased">
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

        <div className='w-full flex flex-col items-center text-gray-700 dark:text-white'>
          {login && <div className={`mr-5 hover:font-bold cursor-pointer`}
            onClick={e => login ? (login.sellerid ? router.push(`/sellers/${login.sellerid}`) : router.push(`/students/${login.studentid}`)) : router.push(`/sign-in`)}
          >Profile</div>}
          {navigations.map((e, index)=> (
            <button id={e.href} key={index} className="mr-5 hover:font-bold hover:cursor-pointer " onClick={handleRoute}>{e.name}</button>
          ))}
        </div>

        {!login && <div className={`flex space-x-1`}>
       
            <button id='/sign-up' onClick={handleChildClick} className="inline-flex items-center bg-sky-800 border-0 py-[5px] px-3 focus:outline-2 hover:bg-sky-950 rounded text-white mt-4 md:mt-0 space-x-1 text-sm ">
              <FaUserPlus  />
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
        login.photo ? <img src={`${login?.photo?.thumb}`} width={50} height={50} className='w-8 h-8 rounded-full hidden md:block' id={`/sellers/${login.sellerid}`} onClick={handleRoute} /> : <FaUserCircle className='w-7 h-7 rounded-full hidden md:flex text-gray-400 bg-white border-0 outline-none dark:bg-gray-200 dark:text-sky-700 shadow-none' id={`/students/${login.studentid}`} onClick={handleRoute} />) : <div className={`hidden md:flex space-x-1`}>
    
          <button  id='/sign-up' onClick={handleChildClick} className="inline-flex items-center bg-sky-800 border-0 py-[5px] px-3 focus:outline-2 hover:bg-sky-950 rounded text-white mt-4 md:mt-0 space-x-1 text-sm ">
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