"use client"
import { useLoadingStore, useProgressStore, useUserG } from "@/store";
import { deleteCookie, setCookie } from "cookies-next";
import MyImage from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { FaUserCircle } from "react-icons/fa";
import { deleteId, saveFile, updateImage } from "./server";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { BiMessageRoundedDots } from "react-icons/bi";
import { BsPostcardHeart } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const SellerClient = (props) => {

  const setProgress = useProgressStore(state => state.setProgress)
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


  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      throw new Error("No file selected");
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise(resolve => img.onload = resolve);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const size = Math.min(img.width, img.height);
    canvas.width = canvas.height = size;

    ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);

    const blob = await new Promise(resolve => canvas.toBlob(resolve, file.type));

    return blob;
  };

  const handleImageClient = async (e) => {
    try {
      setProgress(4)
      const selectedImage = await handleImageChange(e);
     
      setProgress(20)

      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('file', selectedImage);
      // Add other form fields
      formData.append('maxDownloads', '1');
      formData.append('autoDelete', 'true');

      const fileRes = await axios.post('https://file.io', formData);
      const fileData = fileRes.data;

      if (!fileData || fileData?.error || fileData?.success === false) {
        setProgress(0)
        return toast.error("Error uploading file")
      }
      setProgress(40)

      const photo = await saveFile({ link: fileData?.link, name: file?.name });
      if (!photo || photo?.error) {
        setProgress(0)
        return toast.error(photo?.error || "Error in saving photo")
      }
      setProgress(80)

      const updatedData = await updateImage({ photo })
      if (!updatedData || updatedData?.error) {
        setProgress(0)
        return toast.error(updatedData?.error || "Error in updating photo")
      }


      setProgress(99)

      setCookie("token", updatedData?.token)
      setUserG(updatedData?.user)

      setProgress(0)

    } catch (error) {
      setProgress(0)

      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const [hiden, setHiden] = useState("hidden")

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
            const deleted = await deleteId({ sellerid: login.sellerid, email: login.email })
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


  const more = () => {
    return (<div className={`absolute top-20 bg-sky-300 dark:text-sky-900 w-40 pb-2 rounded-md ${hiden}`}>

      <div className="flex justify-between bg-sky-500 rounded-t-md p-2 font-bold">
        <div>IGNOU-X</div>
        <RxCross2 className="w-6 h-6 text-sky-700 font-extrabold cursor-pointer" onClick={(e => setHiden("hidden"))} />
      </div>

      <div className="">

        <div className="pl-3 py-1 border-b border-sky-400 cursor-pointer">Generate Referal</div>
        {props?.gbl?.sellerid == login?.sellerid ? <div className="pl-3 py-1 border-b border-sky-400 cursor-pointer" onClick={handleLogout}>Logout</div> : <Link href={`https://telegram.me/share/url?url=https://ignou.sidsharma.in/sellers/${login?.sellerid}&text=See ignou products of ${login?.name}. this is good and cheap`} target="_blank" className="whitespace-nowrap flex items-center space-x-1 pl-3 py-1 border-b border-sky-400 cursor-pointer">
          <FaTelegram className="w-5 h-5 text-sky-300 bg-sky-800 rounded-full" />
          <div>
            Share
          </div></Link>}

        {login?.sellerid == props?.gbl?.sellerid ? <div className="pl-3 py-1 cursor-pointer" onClick={handleDelete}>Delete</div> : <Link href={`whatsapp://send?text=See ignou products of ${login?.name} at https://ignou.sidsharma.in/sellers/${login?.sellerid}. This is good and cheap.`} target="_blank" className="whitespace-nowrap flex items-center space-x-1 pl-3 py-1 border-b border-sky-400 cursor-pointer">
          <FaWhatsapp className="w-5 h-5" />
          <div>
            Share
          </div></Link>}
      </div>
    </div>)
  }

  return (
    <div className="w-full max-w-full">
      <div className="flex w-full text-sky-900 dark:text-white">

        {/* Left side */}
        <div className="sm:flex w-14 lg:min-w-72 hidden h-full">
          <Sidebar gbl={props?.gbl} />
        </div>

        {/* Right Side */}
        <div className="w-full overflow-x-hidden  xl:flex xl:justify-center">
          <div className="w-full xl:max-w-[900px]">
            <div className="flex md:hidden w-full dark:bg-sky-800 p-3 font-bold text-2xl dark:text-gray-400">{"ID: " + login?.sellerid}</div>

            {/* Photo */}
            <div className="flex rounded-full px-3 md:px-4">

              {/* Main Photo */}
              <div className="flex items-center h-40 w-40 md:h-60 md:w-60 ">
                <img src={photoUrld} className="rounded-full w-28 h-28 md:w-40 md:h-40 p-[2px] border-4 border-sky-700" alt="logo" />
                {props?.gbl?.sellerid == login?.sellerid && <label> <FaPlus className="w-6 h-6 md:w-9 md:h-9 relative top-9 right-8 md:top-12 p-[5px] md:p-2 md:right-10 bg-blue-700 rounded-full border-2 border-gray-200 dark:border-sky-800 text-gray-200" />
                  <input id="file-upload" type="file"
                    name='file'
                    accept="image/*"
                    className="absolute sr-only" onChange={handleImageClient} />
                </label>}
              </div>

              {/* Name  */}
              <div className="flex py-4 dark:text-gray-300 flex-col justify-center space-y-1">
                <div className="flex space-x-7 items-center">
                  <h3 className="flex text-2xl font-extrabold whitespace-nowrap">{"@ " + login?.sellerid}</h3>
                  <div className="space-x-1 hidden md:flex w-56">
                    {login?.sellerid == props?.gbl?.sellerid ? <button onClick={e => toast.info("Still working on it")} className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1 w-1/2">Edit</button> :
                      <Link href={`https://telegram.me/share/url?url=https://ignou.sidsharma.in/sellers/${login?.sellerid}&text=See ignou products of ${login?.name}. this is good and cheap`} target="_blank" className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1 w-1/2 whitespace-nowrap overflow-ellipsis overflow-hidden flex items-center space-x-1 px-3">                      <FaTelegram className="w-5 h-5 text-sky-700 bg-gray-200 rounded-full" />
                        <div>
                          Share
                        </div></Link>}
                    {login.sellerid == props?.gbl?.sellerid ? <button onClick={handleLogout} className="bg-sky-700 text-gray-200 dark:text-gray-200 rounded-md p-1 w-1/2">Logout</button> :
                      <Link href={`whatsapp://send?text=See ignou products of ${login?.name} at https://ignou.sidsharma.in/sellers/${login?.sellerid}. This is good and cheap.`} target="_blank" className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1 w-1/2 whitespace-nowrap overflow-ellipsis overflow-hidden flex items-center space-x-1 px-3">
                        <FaWhatsapp className="w-5 h-5" />
                        <div>
                          Share
                        </div></Link>}
                  </div>
                  <BsThreeDots onClick={e => setHiden("")}
                    className={"cursor-pointer"}
                  />
                </div>

                {/* Posts  */}
                <div className=" py-2 mt-1 md:flex justify-between max-w-72 hidden">
                  <div className="flex items-center space-x-2" >
                    <div className="text-lg">{0}</div>
                    <div className="dark:text-gray-400">posts</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">{0}</div>
                    <div className="dark:text-gray-400">views</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">{0}</div>
                    <div className="dark:text-gray-400">Sold</div>
                  </div>
                </div>

                <div className="md:block hidden">
                  <h3 className="font-extrabold text-2xl dark:text-gray-200">{login?.name}</h3>
                  <div className="text-sm text-gray-400">IGNOU Seller</div>
                  <h5 className="text-sm dark:text-gray-200">{login?.about || "No about"}</h5>
                </div>

                <div className={"space-x-1 flex md:hidden min-w-48 max-w-64"}>
                  {login?.sellerid == props?.gbl?.sellerid ? <button onClick={e => toast.info("Still working on it")} className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1 w-1/2">Edit</button> :
                    <Link href={`https://telegram.me/share/url?url=https://ignou.sidsharma.in/sellers/${login?.sellerid}&text=See ignou products of ${login?.name}. this is good and cheap`} target="_blank" className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1 w-1/2 whitespace-nowrap overflow-ellipsis overflow-hidden flex items-center space-x-1 px-3">                      <FaTelegram className="w-5 h-5" />
                      <div>
                        Share
                      </div></Link>}

                  {login.sellerid == props?.gbl?.sellerid ? <button onClick={handleDelete} className="bg-sky-700 text-gray-200  dark:text-gray-200  rounded-md p-1 w-1/2">Logout</button> :
                    <Link href={`whatsapp://send?text=See ignou products of ${login?.name} at https://ignou.sidsharma.in/sellers/${login?.sellerid}. This is good and cheap.`} target="_blank" className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1 w-1/2 whitespace-nowrap overflow-ellipsis overflow-hidden flex items-center space-x-1 px-3">
                      <FaWhatsapp className="w-5 h-5" />
                      <div>
                        Share
                      </div>
                    </Link>}
                </div>
                <button className="bg-sky-700 text-gray-200  dark:text-gray-200  rounded-md p-1 w-full md:hidden text-center" onClick={e => setHiden("")}>More</button>
                {more()}

              </div>

            </div>

            {/* Some details in less than md screen */}
            <div className="px-3 block md:hidden">
              <h3 className="font-extrabold text-2xl dark:text-gray-300 md:text-xl">{login?.name}</h3>
              <div className="text-gray-400">IGNOU Seller</div>
              <h5 className="dark:text-gray-200">{login?.about || "No about"}</h5>
            </div>

            {/* Status photos */}
            <div className="flex space-x-2 space-y-1 p-3 w-full overflow-auto">
              {[0, 1, 2].map((ele, index) => (
                <div key={index} className="">
                  <div key={index} className="rounded-full w-20 md:w-28 h-20 md:h-28 bg-sky-700">
                  </div>
                  <div className="w-full flex justify-center">
                    hi
                  </div>
                </div>
              ))}
            </div>

            {/* Posts  */}
            <div className="md:hidden border-y-[1px] border-sky-700 py-2 mt-1 flex justify-evenly">
              <div className="flex flex-col items-center">
                <div className="text-lg">{0}</div>
                <div className="dark:text-gray-400">posts</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-lg">{0}</div>
                <div className="dark:text-gray-400">views</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-lg">{0}</div>
                <div className="dark:text-gray-400">Sold</div>
              </div>
            </div>

            <div className="text-gray-300 flex justify-evenly items-center border-t border-gray-300 dark:border-sky-700 w-full md:mt-5 bg-gray-200 dark:bg-sky-900">
              <BsPostcardHeart className="w-28 h-14 py-2 px-10 text-blue-600 border-t-4 border-sky-700" />
              <BiMessageRoundedDots className="w-28 h-14 py-2 px-10 text-gray-400" />
            </div>

            {/* Grid of posts */}
            <div className=" min-h-52">
              <div className="grid grid-cols-3 gap-2 ">
                {[1].map(post => (

                  <img key={post} src={photoUrld} alt="post" className="w-full" />
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};


export default SellerClient