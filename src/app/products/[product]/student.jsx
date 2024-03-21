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
  // let [login, setLogin] = useState(props.login)
  // if(login?.auth)
  let [login, setUserG] = useState(props?.login);
  let gbl;
  if (props?.login?.password) {
    gbl = useUserG(props?.login);
    login = gbl[0];
    setUserG = gbl[1];
  } 

  // else 
  // var [login, setUserG ] = useState(props?.login)

  const router = useRouter()
  let [loaded, setLoaded] = useState("")
  useEffect(() => {
    setLoadingG(false)
    toast.dismiss()
    setLoaded("loaded")
  }, [])

  // Check if login and login.photo are defined
  const photoUrld = (login?.photo?.thumb || `https://ui-avatars.com/api/?name=${login?.name || "L O L"}&background=random`);


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
            deleteCookie("token")
            toast.dismiss(t.id)
            setLoadingG(true)
            setUserG(false)
            router.push("/sign-in");

          }}>Yes</button>

          <button className='bg-sky-700 text-sm py-[4px] text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={() => { toast.dismiss(t.id) }}>No</button>
        </div>
      </div>

    ), { position: "top-center" });
    // localStorage.removeItem("token");
  }

  const handleDelete = (e) => {
    e.preventDefault();
    toast.dismiss()
    toast((t) => (
      <div>
        <span>
          <b>Are you sure to delete permanently ?</b>
        </span>

        <div className="flex mt-2">
          <button className='bg-sky-700 text-sm py-[4px] mr-1 text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={async () => {
            toast.dismiss(t.id)
       
            setLoadingG(true)
            const deleted = await deleteId({ studentid: login.studentid, email: login.email })
            if (deleted.error) {
              setLoadingG(false)
              return toast.error(deleted.error)
            }
            if (deleted.deletedCount == 0) {
              setLoadingG(false)
              return toast.error("Something went wrong")
            }
            deleteCookie("token")
            setUserG(false)
            router.push("/sign-up");
          }}>Yes</button>

          <button className='bg-sky-700 text-sm py-[4px] text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={() => { toast.dismiss(t.id) }}>No</button>
        </div>
      </div>

    ), { position: "top-center" });
    // localStorage.removeItem("token");
  }

  return (
    <div className="w-full h-screen max-w-full">
      <div className="flex w-full h-full text-sky-900 dark:text-white">

        {/* Left side */}
        <div className="sm:flex w-14 lg:min-w-72 hidden h-full">
        <Sidebar gbl={props?.gbl} />
        </div>

        {/* Right Side */}
        <div className="w-full overflow-x-hidden ">
          {login ? <div className="flex flex-col h-[90vh] relative bottom-4">
            <div className="flex items-center flex-col md:flex-row  w-full" >
              {/* Image */}
              <div className="w-80 h-80 flex items-center justify-center">
                <div className='w-40 h-40 relative '>
                  {/* Ensure photoUrld is defined before using it */}
                  {photoUrld && <img className="border-4 w-40 h-40 border-sky-500 rounded-full" src={photoUrld} alt="Photo" />}
                </div>
              </div>

              <div className="text-black dark:text-white">
                <div className="text-2xl flex space-x-14">
                  <div className="-pl-[1px]">
                    {login?.studentid}
                  </div>
                  <Link href={`/students/${login?.studentid}`}>
                    <button className='bg-sky-500 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md whitespace-nowrap' >See more</button>
                  </Link>
                </div>

                <div className="text-gray-700 mt-6 flex space-x-8 dark:text-gray-400">
                  <div> <b>0</b> posts</div>
                  <div><b>0</b> following</div>
                  <div><b>0</b> tags</div>
                </div>
                <div className="mt-4 font-bold">{login?.name}</div>
                {/* <div>{login?.email}</div> */}

                <div className="text-sm">{login?.about ? login.about : (<div>
                  Busy in study...  <br />
                </div>)}</div>
                <div className="flex space-x-2 my-1">

                  {login?.password ? <div>
                    <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] mr-1 rounded-md' onClick={handleDelete}>Delete</button>
                    <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={handleLogout}>Logout</button>
                  </div> :
                    <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={e => { toast.success("Test: Added to favourit") }}>Follow (Add Favourit)</button>
                  }
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
  );
};


export default SellerClient