"use client"
import Link from "next/link";
import cssi from "./my.module.css"
import { IoMenu } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import MyImage from "next/image"
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify"
import { useLoadingStore } from "@/store";
import SellersTab from "./sellers";
import Sidebar from "@/components/sidebar1";
// import TopSellersTab from "./topSellers";
// import NewSellersTab from "./newSellers";

const SellersClient = (props) => {
  const [activeSeller, setActiveSeller] = useState("")
  const [activeTab, setActiveTab] = useState(0)
  const [sellers, setSellers] = useState([[], [], []])
  const setLoadingG = useLoadingStore(state => state.setLoadingG)
  const [showSellers, setShowSellers] = useState([[], [], []])
  let [stData, setStData] = useState([{
    found: 0,
    totalCount: 0,
    page: 0
  }, {
    found: 0,
    totalCount: 0,
    page: 0
  },
  {
    found: 0,
    totalCount: 0,
    page: 0
  }])

  const handleActiveTab = async (e, v) => {
    setActiveTab(preValue => v.value);
    // localStorage.setItem("sellerActiveTab", JSON.stringify({value: v.value}));
  }

  // Check if activeSeller and activeSeller.photo are defined
  const photoUrld = (activeSeller?.photo?.thumb ? activeSeller.photo?.thumb : `https://ui-avatars.com/api/?name=${activeSeller?.name || "L O L"}&background=random`)
 
useEffect(()=> {
    setLoadingG(false)
  }, [])
  const [hiden, setHiden] = useState("hidden")


  return (
    <div>

      {/* Main */}
      <div className="flex text-black dark:text-white h-screen w-full fixed">

        {/* Left side */}
        <div className="w-full md:w-1/3 bg-gray-100 dark:bg-sky-800 overflow-y-hidden border-r dark:border-r-0 pt-1 h-screen">
        <Sidebar hiden={hiden} setHiden={setHiden} gbl={props?.gbl}/>
          <div className="h-[6.7rem]">
            {/* Top bar */}
            <div className="flex flex-col">
              <div className="flex items-center h-12">
                <IoMenu className="w-8 h-8 dark:text-white pl-2 cursor-pointer" onClick={e=>setHiden("flex")} />
                <div className="w-full mx-3 flex">
                  <IoIosSearch className="w-5 h-8 dark:text-white absolute mt-1 ml-2" />
                  <input type="text" className="rounded-full bg-gray-100 dark:text-white dark:bg-sky-900 h-10 w-full pl-8 active:border-none focus:outline-blue-500 focus:outline-2 outline outline-1 outline-gray-300 dark:outline-none"
                    placeholder="Search"
                  />
                </div>
              </div>

              {/* Middle Bar */}
              <ul className={`flex mt-2 text-gray-600 dark:text-gray-400 font-bold h-12 items-end pl-4 whitespace-nowrap overflow-x-scroll ${cssi.scrollhide}`}>
                <li className={activeTab == 0 ? "p-3 -pb-2 hover:dark:bg-sky-700 border-b-4 border-sky-500 rounded-t-xl cursor-pointer" : "p-3 hover:dark:bg-sky-700 rounded-t-lg cursor-pointer"}
                  onClick={e => handleActiveTab(e, { value: 0 })} value={1234}
                >
                  Sellers</li>
                <li className={activeTab == 1 ? "p-3 -pb-2 hover:dark:bg-sky-700 border-b-4 border-sky-500 rounded-t-xl cursor-pointer" : "p-3 hover:dark:bg-sky-700 rounded-t-lg cursor-pointer"}
                  onClick={e => { handleActiveTab(e, { value: 1 }) }}
                >New Sellers</li>
                <li className={activeTab == 2 ? "p-3 -pb-2 hover:dark:bg-sky-700 border-b-4 border-sky-500 rounded-t-xl cursor-pointer" : "p-3 hover:dark:bg-sky-700 rounded-t-lg cursor-pointer"}
                  onClick={e => { handleActiveTab(e, { value: 2 }) }}
                >Top Sellers</li>
                {/* <li className="p-3 hover:dark:bg-sky-700 rounded-t-lg" >Top Sellers</li> */}
              </ul>
              <div className="w-full bg-gray-300 dark:bg-sky-900 h-[1px] dark:h-[2px] "></div>
            </div>
          </div>

          {/* sellers */}
          {activeTab == 0 && <SellersTab setActiveSeller={setActiveSeller} sellers={sellers} setSellers={setSellers} showSellers={showSellers} setShowSellers={setShowSellers} stData={stData} setStData={setStData} mkey={activeTab} />}
          {activeTab == 1 && <SellersTab setActiveSeller={setActiveSeller} sellers={sellers} setSellers={setSellers} showSellers={showSellers} setShowSellers={setShowSellers} stData={stData} setStData={setStData} mkey={activeTab} />}
          {activeTab == 2 && <SellersTab setActiveSeller={setActiveSeller} sellers={sellers} setSellers={setSellers} showSellers={showSellers} setShowSellers={setShowSellers} stData={stData} setStData={setStData} mkey={activeTab} />}
        </div>

        {/* Right side */}
        <div className="md:w-2/3 hidden md:block h-screen overflow-hidden">
          {activeSeller ? <div className="flex flex-col h-[90vh] relative bottom-4">
            <div className="hidden md:flex items-center flex-col md:flex-row  w-full" >
              {/* Image */}
              <div className="w-80 h-80 flex items-center justify-center">
                <div className='w-40 h-40 relative '>
                  {/* Ensure photoUrld is defined before using it */}
                  {photoUrld && <img className="border-4 border-sky-500 rounded-full w-40 h-40" src={photoUrld} alt="Photo" />}
                </div>
              </div>

              <div className="text-black dark:text-white">
                <div className="text-2xl flex space-x-14">
                  <div className="-pl-[1px]">
                    {activeSeller?.sellerid}
                  </div>
                  <Link href={`/sellers/${activeSeller?.sellerid}`}>
                    <button className='bg-sky-500 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md whitespace-nowrap' >See more</button>
                  </Link>
                </div>

                <div className="text-gray-700 mt-6 flex space-x-8 dark:text-gray-400">
                  <div> <b>0</b> posts</div>
                  <div><b>0</b> following</div>
                  <div><b>0</b> tags</div>
                </div>
                <div className="mt-4 font-bold">{activeSeller?.name}</div>
                {/* <div>{activeSeller?.email}</div> */}

                <div className="text-sm">{activeSeller?.about ? activeSeller.about : (<div>
                  Busy in study...  <br />
                </div>)}</div>
                <div className="flex space-x-2 my-1">

                  <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' >See more</button>
                  <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' >See more</button>
                </div>
              </div>
            </div>
            <div className="w-full md:flex justify-center hidden">
              <div className="flex flex-col w-4/5 space-x-6">
                <h5 className="text-2xl font-bold">My Courses</h5>
                <div className="flex">

                  {
                    [0, 1, 2].map((e, index) => (
                      <div className="flex flex-col items-center space-y-2 mx-[1px]" key={index}>
                        <div className="w-32 h-32 rounded bg-sky-600"></div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div> : null}
        </div>
      </div>
    </div>
  )
}

export default SellersClient