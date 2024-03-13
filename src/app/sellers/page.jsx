"use client"
import Link from "next/link";
import cssi from "./my.module.css"
import { IoMenu } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { deleteCookie, getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import MyImage from "next/image"
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import Head from "next/head";
import { useLoadingStore } from "@/store";
const SellerInfo = () => {
const setLoadingG = useLoadingStore(state => state.setLoadingG)

useEffect(()=> {
  setLoadingG(false)
  setLoaded("loaded")

}, [])
  let topSellers = [
    {
      sellerid: 1161460654,
      name: "Sid 1",
      css: "bg-sky-500 rounded-xl",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ],
      about: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum sapiente, ipsa culpa ab amet incidunt "
    },
    {
      sellerid: 1161460654,
      name: "Sid 2",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ],
      about: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum sapiente, ipsa culpa ab amet incidunt ullam aperiam, quia officiis sit? Tempora quidem quas illum asperiores dolores, eum non corrupti."
    },
    {
      sellerid: 1161460654,
      name: "Sid 3",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ],
      about: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum sapiente, ipsa culpa ab amet incidunt ullam aperiam, quia officiis sit? Tempora quidem quas illum asperiores dolores, eum non corrupti."
    },
    {
      sellerid: 1161460654,
      name: "Sid 4",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ],
      about: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum sapiente, ipsa culpa ab amet incidunt ullam aperiam, quia officiis sit? Tempora quidem quas illum asperiores dolores, eum non corrupti."
    },
    {
      sellerid: 1161460654,
      name: "Sid 1",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ],
      about: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum sapiente, ipsa culpa ab amet incidunt "
    },
    {
      sellerid: 1161460654,
      name: "Sid 2",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ],
      about: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum sapiente, ipsa culpa ab amet incidunt ullam aperiam, quia officiis sit? Tempora quidem quas illum asperiores dolores, eum non corrupti."
    },
    {
      sellerid: 1161460654,
      name: "Sid 3",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ],
      about: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum sapiente, ipsa culpa ab amet incidunt ullam aperiam, quia officiis sit? Tempora quidem quas illum asperiores dolores, eum non corrupti."
    },
    {
      sellerid: 1161460654,
      name: "Sid 4",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ],
      about: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum sapiente, ipsa culpa ab amet incidunt ullam aperiam, quia officiis sit? Tempora quidem quas illum asperiores dolores, eum non corrupti."
    },
    {
      sellerid: 1161460654,
      name: "Sid 5",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ],
      about: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum sapiente, ipsa culpa ab amet incidunt ullam aperiam, quia officiis sit? Tempora quidem quas illum asperiores dolores, eum non corrupti."
    },
    {
      sellerid: 1161460654,
      name: "Sid 4",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ],
      about: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum sapiente, ipsa culpa ab amet incidunt ullam aperiam, quia officiis sit? Tempora quidem quas illum asperiores dolores, eum non corrupti."
    },
  ]

  const sellers = topSellers;
  const newSellers = topSellers;

  const token = getCookie("token");
  let decoded = jwt.decode(token);

  if (!decoded) {
    decoded = {
      sellerid: 1161460654,
      name: "Sid 1",
      photo: [
        {
          url: 'https://postimg.cc/rdWjdBRZ/bb8dc752',
          urld: 'https://i.postimg.cc/rdWjdBRZ/sid.jpg',
          quality: 'sm'
        },
        {
          url: 'https://postimg.cc/phHZKsDW/4dca179b',
          urld: 'https://i.postimg.cc/phHZKsDW/sid.jpg',
          quality: 'md'
        }
      ]
    }
  }
  let [loaded, setLoaded] = useState("")
  const login = "yes"

  // Check if decoded and decoded.photo are defined
  const photoUrld = decoded?.photo && decoded.photo[1]?.urld;

  const handleLogout = (e) => {
    e.preventDefault();
    toast.dismiss()
    toast((t) => (
      <div>
        <span>
          <b>Are You sure to logout ?</b>
        </span>

        <div className="flex mt-2">
          <button className='bg-sky-700 text-sm py-[4px] mr-1 text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={() => {
            toast.dismiss(t.id)
            console.log("yes")
            deleteCookie("token")
            window.location.href = "/sign-in";
          }}>Yes</button>

          <button className='bg-sky-700 text-sm py-[4px] text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={() => { toast.dismiss(t.id) }}>No</button>
        </div>
      </div>

    ), { position: "" });
    // localStorage.removeItem("token");
  }



  return (
    <div>

      {/* Main */}
      <div className="flex text-black dark:text-white">

        {/* Left side */}
        <div className="w-full md:w-1/3 bg-gray-100 dark:bg-sky-800 min-h-[90vh] border-r dark:border-r-0 pt-1">

          {/* Top bar */}
          <div className="flex flex-col">
            <div className="flex items-center h-12">
              <IoMenu className="w-8 h-8 dark:text-white pl-2 " />
              <div className="w-full mx-3 flex">
                <IoIosSearch className="w-5 h-8 dark:text-white absolute mt-1 ml-2" />
                <input type="text" className="rounded-full bg-gray-100 dark:text-white dark:bg-sky-900 h-10 w-full pl-8 active:border-none focus:outline-blue-500 focus:outline-2 outline outline-1 outline-gray-300 dark:outline-none"
                  placeholder="Search"
                />
              </div>
            </div>

            {/* Middle Bar */}
            <ul className={`flex mt-2 text-gray-600 dark:text-gray-400 font-bold h-12 items-end pl-4 whitespace-nowrap ${cssi.scrollhide}`}>
              <li className="p-3 -pb-2 hover:dark:bg-sky-700 border-b-4 border-sky-500 rounded-t-xl">Sellers</li>
              <li className="p-3 hover:dark:bg-sky-700 rounded-t-lg" >New Sellers</li>
              <li className="p-3 hover:dark:bg-sky-700 rounded-t-lg" >Top Sellers</li>
              <li className="p-3 hover:dark:bg-sky-700 rounded-t-lg">Fovriout Sellers</li>
            </ul>
            <div className="w-full bg-gray-300 dark:bg-sky-900 h-[1px] dark:h-[2px]"></div>
            {/* Sellers */}
            <div className="flex flex-col pt-2 w-full h-[70vh] overflow-auto">
              {
                sellers.map((e, index) => (<Link href={`/sellers/${e.sellerid}`} key={index}
                  className={"flex border-sky-700 h-16 items-center pl-4 justify-start w-full " + e.css}
                >
                  <div className="flex items-center">
                    <MyImage src={e.photo[0].urld}
                      width={50} height={10}
                      className="rounded-full"
                      alt="photo"
                    />
                  </div>
                  <div className="pl-3 w-full">
                    <div className="h-6">{e.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 overflow-hidden h-6">{e.about}</div>
                  </div>
                  <div className="flex flex-col justify-end pr-4">
                    <div className="text-gray-600">
                      <MdVerifiedUser className="dark:text-gray-300" />
                    </div>
                    <div className=""></div>
                  </div>
                </Link>))
              }
            </div>
          </div>

        </div>

        {/* Right side */}
        <div className="md:w-2/3 h-[90vh]hidden md:block">
          {loaded ? <div className="flex flex-col h-[90vh] relative bottom-4">
            <div className="hidden md:flex items-center flex-col md:flex-row  w-full" >
              {/* Image */}
              <div className="w-80 h-80 flex items-center justify-center">
                <div className='w-40 h-40 relative '>
                  {/* Ensure photoUrld is defined before using it */}
                  {photoUrld && <MyImage className="border-4 border-sky-500 rounded-full" src={photoUrld} fill alt="Photo" />}
                </div>
              </div>

              <div className="text-black dark:text-white">
                <div className="text-2xl flex space-x-14">
                  <div className="-pl-[1px]">
                    {decoded?.sellerid}
                  </div>
                  <button className='bg-sky-500 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md whitespace-nowrap' >See more</button>

                </div>

                <div className="text-gray-700 mt-6 flex space-x-8 dark:text-gray-400">
                  <div> <b>0</b> posts</div>
                  <div><b>0</b> followers</div>
                  <div><b>0</b> tags</div>
                </div>
                <div className="mt-4 font-bold">{decoded.name}</div>
                {/* <div>{decoded?.email}</div> */}

                <div className="text-sm">{decoded?.about ? decoded.about : (<div>
                  Selling content here since  <br />
                </div>)}</div>
                <div className="flex space-x-2 my-1">

                  <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' >See more</button>
                  <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' >See more</button>
                </div>
              </div>
            </div>
            <div className="w-full md:flex justify-center hidden">
              <div className="flex flex-col w-4/5 space-x-6">
                <h5 className="text-2xl font-bold">Status</h5>
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

export default SellerInfo