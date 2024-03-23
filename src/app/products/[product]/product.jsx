"use client"
import { useLoadingStore, useUserG } from "@/store";
import { deleteCookie } from "cookies-next";
import MyImage from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { FaUserCircle } from "react-icons/fa";
import { deleteId } from "./server";
import Link from "next/link";
import Sidebar from "@/components/sidebar";


const SellerClient = (props) => {
  const setLoadingG = useLoadingStore(state => state.setLoadingG)
  const [product, setProduct] = useState(props?.product)

  const router = useRouter()
  let [loaded, setLoaded] = useState("")
  useEffect(() => {
    setLoadingG(false)
    toast.dismiss()
    setLoaded("loaded")
  }, [])

  // Check if login and login.photo are defined
  const photoUrld = (`https://ui-avatars.com/api/?name=${"L O L"}&background=random`);

  return (
    <div className="w-full max-w-full">
      <div className="flex w-full h-full text-sky-900 dark:text-white">

        {/* Left side */}
        <div className="sm:flex w-14 lg:min-w-72 hidden h-full">
          <Sidebar gbl={props?.login} css1='yes' />
        </div>

        {/* Right Side */}
        <div className="w-full flex flex-col items-center px-2">

          <div className="w-full xl:max-w-[900px] text-gray-300">

            <div className="py-4">{"#" + product?.tags?.join(" #")}</div>

            {/* Full section */}
            <div className="flex">

              {/* Product section */}
              <div className="flex flex-col w-full space-y-2">
                {/* image section */}
                <div className="flex space-x-2 w-full">

                  {/* side images */}
                  <div className="flex flex-col w-20 space-y-1">
                    {[0, 1, 2].map((ele, index) => (
                      <img src={product?.thumbnail?.thumb} alt="" className={`w-20 h-20 border dark:border-sky-700`} />
                    ))}
                  </div>

                  {/* Main image */}
                  <img src={product?.thumbnail?.url} alt="" className={`w-full h-full border dark:border-sky-700 overflow-hidden`} />
                </div>

                {/* products */}
                <div className="flex space-x-2">
                  <img src={product?.thumbnail?.thumb} alt="" className={`w-full h-full border dark:border-sky-700 first:`} />
                  <img src={product?.thumbnail?.thumb} alt="" className={`w-full h-full border dark:border-sky-700 first:`} />
                  <img src={product?.thumbnail?.thumb} alt="" className={`w-full h-full border dark:border-sky-700 first:`} />
                </div>

                  <div className="h-20 "></div>
              </div>

              {/* Details  */}
              <div className="lg:w-60 px-2 w-60">
                product details 
              </div>
            </div>


          </div>
        </div>
      </div>

    </div>
  );
};


export default SellerClient