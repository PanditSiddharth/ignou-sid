"use client"
import { useLoadingStore, useUserG, useUserStore } from "@/store";
import { deleteCookie } from "cookies-next";
import MyImage from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { FaUserCircle } from "react-icons/fa";
import { deleteId } from "./server";
import Link from "next/link";

const SellerClient = (props) => {
  const setLoadingG = useLoadingStore(state=> state.setLoadingG)
  // const setUserG = useUserStore(state => state.setUserG)
  const router = useRouter()
  const [login, setUserG] = useUserG(props.login)
  console.log(login)
  useEffect(() => {
    setLoadingG(false) 
    toast.dismiss()
    setLoaded("loaded")
  }, [])

  const handleRoute = (e) => {
    // e.preventDefault();
    console.log(e.target)
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
    handleRoute({ target})
  }

  let [loaded, setLoaded] = useState("")

  // Check if login and login.photo are defined
  const photoUrld = login?.photo && login.photo.thumb;

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
            console.log("yes")
            setLoadingG(true)
            const deleted = await deleteId({ sellerid: login.sellerid, email: login.email })
            if(deleted.error){
              setLoadingG(false)
              return toast.error(deleted.error)
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
    <div className="md:w-2/3 min-h-[90vh]">
    {loaded ? <div className="flex flex-col min-h-[90vh] relative bottom-4">
      <div className=" flex items-center flex-col md:flex-row  w-full" >
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
              {login?.sellerid}
            </div> 
            <Link href={`/products/add`} onClick={handleChildClick} >
            <button id="/products/add" className='bg-sky-500 text-sm py-[6px] text-white hover:bg-sky-600 px-[20px] rounded-md whitespace-nowrap' >Add Product</button>
            </Link>
          </div>

          <div className="text-gray-700 mt-6 flex space-x-8 dark:text-gray-400">
            <div> <b>0</b> posts</div>
            <div><b>0</b> followers</div>
            <div><b>0</b> tags</div>
          </div>
          <div className="mt-4 font-bold">{login.name}</div>
          {/* <div>{login?.email}</div> */}

          <div className="text-sm">{login?.about ? login.about : (<div>
            Selling content here since  <br />
          </div>)}</div>
          <div className="flex space-x-2 my-1">
            <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={handleDelete}>Delete</button>
            <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex flex-col w-4/5 space-x-6">
          <h5 className="text-2xl font-bold">Status</h5>
          <div className="flex max-w-[80vw] overflow-hidden">
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
  );
};


export default SellerClient

