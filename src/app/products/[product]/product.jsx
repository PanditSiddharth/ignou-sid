"use client"
import { useLoadingStore, useUserG } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify"


const SellerClient = (props) => {
  const setLoadingG = useLoadingStore(state => state.setLoadingG)
  const [product, setProduct] = useState(props?.product)
  const [where, setWhere] = useState("soft")
  const [contact, setContact] = useState("hidden")

  const wpshare = `whatsapp://send?text=See ignou products of ${product?.name} at https://ignou.sidsharma.in/products/${product?.productid}. This is good and cheap.`
  const tgshare = `https://telegram.me/share/url?url=https://ignou.sidsharma.in/products/${product?.productid}&text=See ignou products of ${product?.name}. this is good and cheap`

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
    <section className="text-gray-600 body-font overflow-hidden dark:text-gray-200">
      <div className={`fixed top-20 left-0 flex w-full justify-center ${contact}`}>
        <div className="w-80 bg-white text-sky-950 border flex flex-col justify-center items-center rounded-md space-y-2 px-2">
        <div className="ml-auto cursor-pointer" onClick={e=> setContact("hidden")}>cut</div>
        <div>Enter atleast 15 letter to describe why you want to contact? are you seriously want to buy...</div>
        <textarea placeholder="Enter here.." className="border w-full " rows={4} />
        <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Submit</button>
        </div>
      </div>

      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded" src={product?.thumbnail?.url} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest dark:text-gray-200 flex space-x-1">{
              product?.tags?.map((ele, index) => (
                <div>#{ele}</div>
              ))
            }</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 dark:text-blue-400">{product?.name}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3 dark:text-gray-300">4 Reviews</span>
              </span>

              {/* Side with social media buttons */}
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 items-center space-x-2">
                <a className="text-gray-500 dark:text-gray-400">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <Link href={tgshare}><FaTelegram className="dark:text-sky-900 dark:bg-gray-400 rounded-full " /> </Link>
                <Link href={wpshare}><FaWhatsapp /> </Link>

              </span>
            </div>
            <p className="leading-relaxed lg:min-h-52">{product?.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Where ?</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10 dark:text-sky-900" onChange={e=> setWhere(e.target.value)} >
                    <option value={"soft"} onSelect={e=>setWhere("soft")}>Direct download</option>
                    <option value={"hard"} onSelect={e=> setWhere("hard")}>Offline</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="title-font font-medium text-2xl text-gray-900  dark:text-yellow-400">₹{product?.price}</div>
              { where == "soft" ? <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button> : 
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={e=> setContact("")}>Contact Seller</button>}
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default SellerClient