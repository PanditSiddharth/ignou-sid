"use client"
import { useLoadingStore, useUserG } from "@/store";
import { deleteCookie } from "cookies-next";
import MyImage from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { FaUserCircle } from "react-icons/fa";
import { deleteId } from "./server";

const SellerClient = (props) => {

  const setLoadingG = useLoadingStore(state => state.setLoadingG)
  let [login, setLogin] = useState(props.login)
  // const [login, setUserG ] = useUserG(props?.login)
  const router = useRouter()
  let [loaded, setLoaded] = useState("") 
  useEffect(() => { 
    setLoadingG(false) 
    toast.dismiss() 
    setLoaded("loaded") 
  }, []) 

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
            setLoadingG(true)
            deleteCookie("token")
            // setUserG(false)
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
            const deleted = await deleteId({ studentid: login.studentid, email: login.email })
            if (deleted.error){
              setLoadingG(false)
              return toast.error(deleted.error)
            }
            if (deleted.deletedCount == 0){
              setLoadingG(false)
              return toast.error("Something went wrong")
            }
            deleteCookie("token")
            // setUserG(false)
            router.push("/sign-up");
          }}>Yes</button>

          <button className='bg-sky-700 text-sm py-[4px] text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={() => { toast.dismiss(t.id) }}>No</button>
        </div>
      </div>

    ), { position: "top-center" });
    // localStorage.removeItem("token");
  }

  return (
    <div className="min-h-[80vh]">
      {loaded ? <div>
        <div className="flex items-center" >
          {/* Image */}
          <div className="w-36 h-52 flex items-center justify-center">
            <div className='w-28 h-28 relative '>
              {/* Ensure photoUrld is defined before using it */}
              {photoUrld ? <MyImage className="border-4 border-sky-500 rounded-full" src={photoUrld} fill alt="Photo" priority={false} /> : <FaUserCircle className='w-28 h-28 border-4 border-sky-500 rounded-full text-gray-400 bg-white outline-none dark:bg-white dark:text-sky-700 shadow-none' />}
            </div>
          </div>
          <div className="text-black dark:text-white">
            <div className="text-2xl">{login?.name}</div>
            <div className="text-sm text-gray-400">ID: {login?.studentid}</div>
            {/* <div>{login?.email}</div> */}
            <div className="text-sm">{login?.about ? login.about : (<div> 
              Busy in study  <br /> {login.date}
            </div>)}</div>
            <div>
              {login.auth ? <div>
                <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] mr-1 rounded-md' onClick={handleDelete}>Delete</button>
                <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={handleLogout}>Logout</button>
              </div> :
                <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md' onClick={e=>{toast.success("Test: Added to favourit")}}>Follow (Add Favourit)</button>
              } </div>
          </div>

        </div>
      </div> : null}
    </div>
  );
};


export default SellerClient