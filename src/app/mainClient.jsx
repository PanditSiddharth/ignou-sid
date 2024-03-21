"use client"
import Logo from "@/components/logo";
import Link from "next/link";
import MyImage from "next/image";
import { FaArrowRight } from "react-icons/fa";
import cssi from "./main.module.css"
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { PiWaveTriangle } from "react-icons/pi";
import { useUserG, useLoadingStore } from "@/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useSession } from "next-auth/react";

export default function MainClient(props) {
  const router = useRouter()
  const setLoadingG = useLoadingStore(state => state.setLoadingG)
  //   const [login, setLogin] = useState(props?.login)
  const [login, setUserG] = useUserG(props?.login)
  const session = useSession()
  

  useEffect(() => {
    toast.dismiss()
    setLoadingG(false)
  }, [])

  const handleRoute = (e) => {
    // e.preventDefault();
 
    if (window.location.pathname != e.target.id) {
      setLoadingG(true)
      // router.push(e.target.id)
    } else {
      toast.info(<div className='p-2 bg-white rounded-2xl'>Already on it</div>, { duration: 50 })
    }
  }

  const handleChildClick = (e) => {
    // Traverse up the DOM tree until the parent button element is found
    let target = e.target;
    while (target !== null && target.tagName !== 'BUTTON') {
      target = target.parentElement;
    }
    handleRoute({ target })
  }
  return (
    <main className={`text-sky-900 dark:text-white`}>
      <section className="h-80 flex flex-col md:flex-row items-center justify-center text-center md:rounded-full">

        <div className="flex flex-col w-1/2 h-80 items-center justify-center relative lg:-right-20">
          <div className="flex items-center">

            <div className="text-3xl">
              <Logo css1="w-36 h-28" />
            </div>

            <div className="text-6xl font-serif dark:text-orange-400 font-extrabold">IGNOU</div>
          </div>
          <div className="w-60">Extended ignou helps for students</div>

          <div className="flex itmes-center space-x-1 mt-2">
            {login ? <Link href={"/contact"} id="/contact" onClick={handleChildClick}>
              <button id="/contact" className='bg-orange-900 text-sm py-2 text-white hover:bg-orange-950 px-[20px] shadow rounded-md'
              >Contact</button>
            </Link> : <Link href={"/sign-up"} id="/sign-up" onClick={handleChildClick}>
              <button id="/sign-up" className='bg-orange-900 text-sm py-2 text-white hover:bg-orange-950 px-[20px] shadow rounded-md'
              >Register</button>
            </Link>}
            <Link href={"/about"} className="flex items-center">
              <div className="flex items-center text-sky-400 hover:underline ">
                <div className="flex">
                  Learn more
                </div>
                <FaArrowRight className="w-4 h-3 pl-1" />
              </div>
            </Link>
          </div>
        </div>
        <div className="w-1/2 lg:flex items-center justify-center h-80 relative md:-left-20 hidden ">
          <MyImage className="w-52 md:w-80" src={"/hero5.png"} width={400} height={300} alt="photo" />
        </div>

        {/* <div className="w-1/2 h-1"></div> */}
        <div className="absolute md:left-14 left-10 rotate-45 -z-50 mb-40">
          <TbTriangleInvertedFilled className="absolute dark:shadow-lg dark:shadow-white dark:text-purple-800 text-blue-200 rounded-xl -z-50 w-60 h-60  md:w-96 md:h-96 -rotate-12" />
        </div>

        <div className="absolute right-2 top-2 md:right-14 -z-50">
          <TbTriangleInvertedFilled className="text-sky-200 dark:text-sky-700 rounded-xl -z-50 w-52 h-60" />
        </div>
        <div className="absolute right-10">

          <PiWaveTriangle className="dark:shadow dark:shadow-white dark:text-pink-600 text-orange-200 rounded-xl -z-50 w-32 h-32 rotate-12 relative top-28 " />
        </div>

      </section>
      <section className="my-4 flex flex-col space-y-1 items-center md:flex-row md:justify-center md:space-x-2 px-2">

        {/* 1st row */}
        <Link href={"/sellers"} onClick={handleChildClick}>
          <button id="/sellers" className="w-[95vw] md:w-60 lg:w-80 xl:w-96 border border-solid border-sky-900 rounded-2xl text-center shadow-lg flex flex-col items-center bg-sky-700 hover:bg-sky-800 text-white">
            <h5 className="text-lg font-extrabold">Sellers</h5>
            <div className="bg-white w-11/12 h-[1px]"></div>
            <div className="text-sm w-36 my-1">See the list and details of sellers</div>
          </button>
        </Link>

        {/* 2nd row */}
        <Link href={"/students"} onClick={handleChildClick} >
          <button id="/students" className="w-[95vw] md:w-60 lg:w-80 xl:w-96 border border-solid border-sky-900 rounded-2xl text-center shadow-lg flex flex-col items-center bg-sky-700 hover:bg-sky-800 text-white">
            <h5 className="text-lg font-extrabold">Students</h5>
            <div className="bg-white  w-11/12 h-[1px]"></div>
            <div className="text-sm w-36 my-1">See the details of students</div>
          </button>
        </Link>

        {/* 3rd row */}
        <Link href={"/products"} onClick={handleChildClick}>
          <button id="/products" className="w-[95vw] md:w-60 lg:w-80 xl:w-96 border border-solid border-sky-900 rounded-2xl text-center shadow-lg flex flex-col items-center bg-sky-700 hover:bg-sky-800 text-white">
            <h5 className="text-lg font-extrabold ">Products</h5>
            <div className="bg-white  w-11/12 h-[1px]"></div>
            <div className="text-sm w-36 my-1">See the details of products</div>
          </button>
        </Link>
      </section>
      {/* <section>
        <div className="bg-gray-200 text-black">
          Hey Ram
        </div>
      </section> */}
      <section>
        <div className="flex items-center flex-col">
          <h3 className="text-3xl font-bold text-center mx-2">Our motive</h3>
          <div className="flex items-center flex-col w-[90vw] space-y-2">
            <div className="w-full">
              Welcome to ignou x, where trust meets convenience in educational materials! We're the premier platform connecting sellers and students in a secure, seamless, and trustworthy environment.

              At ignou x, we recognize the critical need for reliable resources in education. That's why we've crafted a specialized marketplace tailored to students seeking soft copies of PDFs, focusing on IGNOU products like project assignments and guess papers.
            </div>

            {/* Start 3 para */}
            <div className="flex flex-col lg:flex-row my-2 space-y-2 lg:space-x-2">
              {/* Main of 2 para */}
              <div className="flex flex-col md:flex-row lg:flex-col lg:w-1/2 space-y-2 md:space-x-2 lg:space-x-0 md:space-y-0 lg:space-y-2">

                {/* Main card 1st */}
                <div className="w-full">
                  <h5 className="text-xl font-bold">
                    For Sellers:
                  </h5><div>
                    Join a community dedicated to integrity and excellence. Showcase your expertise and offer meticulously crafted materials with confidence, reaching a targeted audience of eager students. Our robust security measures ensure smooth and secure transactions, eliminating concerns about fraud.
                  </div>
                </div>

                {/* Main card 2nd */}
                <div className="w-full">
                  <h5 className="text-xl font-bold">
                    For Students:
                  </h5>
                  <div>
                    Discover reliable study materials with ease. Browse a vast array of soft copies provided by trusted sellers, ensuring an enhanced learning experience. Whether you need project assignments or guess papers, find everything conveniently gathered in one place.
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h5 className="text-xl font-bold">
                  Why Choose Us?
                </h5>
                <div>
                  <b className="pr-2">
                    Trustworthy Platform:
                  </b>
                  Prioritizing trust and security for both sellers and students.
                  Specialized Focus: A niche platform catering specifically to IGNOU products.
                  Convenience: Enjoy easy browsing, purchasing, and access from home, saving time and effort.
                  Join us at ignou-x and experience the difference trust and convenience can make in your educational journey. Whether you're a seller reaching a dedicated audience or a student seeking top-notch resources, we're here to support your academic success. Welcome to the future of educational commerce.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="my-2">
        <div className="flex justify-center">
          <div className="flex flex-wrap w-[90vw] bg-sky-200 text-sky-900 dark:bg-sky-700 rounded-full h-10 items-center my-4 px-4 font-extrabold">
            <h3 className="text-2xl">Recommended products</h3>
          </div>
        </div>
        <div className="mx-4 flex justify-center">
          <div className={`flex flex-wrap justify-center  ${cssi.cmargin} w-full`}>
            {
              [1, 2, 3, 2, 5, 6].map((element, index) => (
                <div className="w-80 border rounded-md" key={index}>
                  <div className="w-full h-40 bg-sky-800 rounded-md px-5"></div>
                  <div className="text-black bg-white dark:bg-gray-200 px-5">
                    <h2 className="text-2xl">Noteworthy technology acquisitions 2021</h2>
                    <div>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</div>
                    <Link href={"/sign-up"}>
                      <button className='bg-orange-900 text-sm py-2 text-white hover:bg-orange-950 px-[20px] shadow rounded-md my-3'
                      >Read More</button>
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </main >
  );
}
