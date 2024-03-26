"use client"
import { useLoadingStore, useProgressStore, useUserG } from "@/store";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { deleteId, paginate, saveFile, updateImage } from "./server";
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
  const [products, setProducts] = useState([])
  // let [userProfile, setUserProfile] = useState(props.userProfile)
  // if(userProfile?.auth)
  let [userProfile, setUserProfile] = useState(props?.login);
  const [login, setUserG] = useUserG(props?.gbl);


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
  // var [userProfile, setUserG ] = useState(props?.userProfile)

  const router = useRouter()
  let [loaded, setLoaded] = useState("")

  useEffect(() => {
    setLoadingG(false)
    toast.dismiss()
    setLoaded("loaded")
    paginate(userProfile?.sellerid, 1, 20).then((prs) => {
      setLoaded("fetched")

      setProducts(prs)
    })
  }, [])

  const wpshare = `whatsapp://send?text=See ignou products of ${userProfile?.name} at https://ignou.sidsharma.in/sellers/${userProfile?.sellerid}. This is good and cheap.`
  const tgshare = `https://telegram.me/share/url?url=https://ignou.sidsharma.in/sellers/${userProfile?.sellerid}&text=See ignou products of ${userProfile?.name}. this is good and cheap`
  // Check if userProfile and userProfile.photo are defined
  const photoUrld = (userProfile?.photo?.thumb || `https://ui-avatars.com/api/?name=${userProfile?.name || "L O L"}&background=random`);


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
            const deleted = await deleteId({ sellerid: userProfile.sellerid, email: userProfile.email })
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
        {login?.sellerid == userProfile?.sellerid ? <div className="pl-3 py-1 border-b border-sky-400 cursor-pointer" onClick={handleLogout}>Logout</div> : <Link href={tgshare} target="_blank" className="whitespace-nowrap flex items-center space-x-1 pl-3 py-1 border-b border-sky-400 cursor-pointer">
          <FaTelegram className="w-5 h-5 text-sky-300 bg-sky-800 rounded-full" />
          <div>
            Share
          </div></Link>}

        {userProfile?.sellerid == login?.sellerid ? <div className="pl-3 py-1 cursor-pointer" onClick={handleDelete}>Delete</div> : <Link href={wpshare} target="_blank" className="whitespace-nowrap flex items-center space-x-1 pl-3 py-1 border-b border-sky-400 cursor-pointer">
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
          <Sidebar gbl={login} />
        </div>

        {/* Right Side */}
        <div className="w-full overflow-x-hidden  xl:flex xl:justify-center">
          <div className="w-full xl:max-w-[900px]">
            <div className="flex md:hidden w-full dark:bg-sky-800 p-3 font-bold text-2xl dark:text-gray-400">{"ID: " + userProfile?.sellerid}</div>

            {/* profile main */}
            <div className="flex  px-3 md:px-4 items-center ">

              {/* Main Photo */}
              <div className="flex items-center w-40 sm:w-48 md:w-60 ">
                <img src={photoUrld} className="rounded-full w-[6.5rem] h-[6.5rem] xs:w-28 xs:h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 p-[2px] border-4 border-sky-700" alt="logo" />
                {login?.sellerid == userProfile?.sellerid && <label> <FaPlus className="w-6 h-6 md:w-9 md:h-9 relative top-9 right-8 md:top-12 p-[5px] md:p-2 md:right-10 bg-blue-700 rounded-full border-2 border-gray-200 dark:border-sky-800 text-gray-200" />
                  <input id="file-upload" type="file"
                    name='file'
                    accept="image/*"
                    className="absolute sr-only" onChange={handleImageClient} />
                </label>}
              </div>

              {/* Name  */}
              <div className="flex py-4 dark:text-gray-300 flex-col justify-center space-y-1">
                <div className="flex space-x-7 items-center">
                  <h3 className="flex text-xl xs:text-2xl font-extrabold whitespace-nowrap">{"@ " + userProfile?.sellerid}</h3>
                  <div className="space-x-1 hidden md:flex w-60 min-w-52 max-w-72">
                    {userProfile?.sellerid == login?.sellerid ? <button onClick={e => toast.info("Still working on it")} className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1 w-1/2">Edit</button> :
                      <Link href={tgshare} target="_blank" className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1 w-1/2 whitespace-nowrap overflow-ellipsis overflow-hidden flex items-center justify-center space-x-1 px-3">                      <FaTelegram className="w-5 h-5 text-sky-700 bg-gray-200 rounded-full" />
                        <div>
                          Share
                        </div></Link>}
                    {userProfile.sellerid == login?.sellerid ? <Link href={"/products/add"} className="bg-sky-700 text-gray-200 dark:text-gray-200 rounded-md p-1 w-1/2 whitespace-nowrap text-center">Add Product</Link> :
                      <Link href={wpshare} target="_blank" className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1 w-1/2 whitespace-nowrap overflow-ellipsis overflow-hidden flex items-center justify-center space-x-1 px-3">
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
                  <h3 className="font-extrabold text-2xl dark:text-gray-200">{userProfile?.name}</h3>
                  <div className="text-sm text-gray-400">IGNOU Seller</div>
                  <h5 className="text-sm dark:text-gray-200 max-w-96">{userProfile?.about || "No about"}</h5>
                </div>

                {/* sm screen buttons */}
                <div className={"grid  md:hidden w-32 xs:w-60 text-center xs:grid-cols-2 gap-1"}>
                  {userProfile?.sellerid == login?.sellerid ? <button onClick={e => toast.info("Still working on it")} className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1 hidden xs:block">Edit</button> :
                    <Link href={tgshare} target="_blank" className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1  whitespace-nowrap overflow-ellipsis overflow-hidden items-center space-x-1 px-3 hidden xs:flex">                      <FaTelegram className="w-5 h-5" />
                      <div>
                        Share
                      </div></Link>}

                  {userProfile?.sellerid == login?.sellerid ? <Link href={"/products/add"} className="bg-sky-700 text-gray-200  dark:text-gray-200  rounded-md p-1 whitespace-nowrap">Add Product</Link> :
                    <Link href={wpshare} target="_blank" className="bg-sky-700 text-gray-200  dark:text-gray-200 rounded-md p-1  whitespace-nowrap overflow-ellipsis overflow-hidden flex items-center justify-center space-x-1 px-3">
                      <FaWhatsapp className="w-5 h-5" />
                      <div>
                        Share
                      </div>
                    </Link>}
                  <button className="bg-sky-700 text-gray-200  dark:text-gray-200  rounded-md p-1 text-center xs:col-span-2" onClick={e => setHiden("")}>More</button>
                </div>
                {more()}

              </div>

            </div>

            {/* Some details in less than md screen */}
            <div className="px-3 block md:hidden">
              <h3 className="font-extrabold text-2xl dark:text-gray-300 md:text-xl">{userProfile?.name}</h3>
              <div className="text-gray-400">IGNOU Seller</div>
              <h5 className="dark:text-gray-200">{userProfile?.about || "No about"}</h5>
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
            <div>
              {(Array.isArray(products)) ? (
                (loaded) ? (
                  loaded == "loaded" ? "Fetching Data..." :
                    (
                      (products?.length == 0 && loaded === "fetched") && "NO any products added")
                ) : (
                  "Page loading..."
                )
              ) : (
                "Seems there is no records or fetching error"
              )}

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 sm:px-3 lg:px-0 gap-4">
              {/* Your child elements */}
              {products?.map((ele, index) => (
                <div className="rounded-md border border-gray-300 dark:border-sky-700" key={index}>
                  <img src={ele?.thumbnail?.thumb} className="w-full rounded-t-md " alt="" />
                  <div className="flex flex-col p-2 f dark:bg-sky-800 dark:text-gray-200 rounded-b-md space-y-1 items-between">
                    <div className="h-24">
                      <h3 className="font-bold text-xl ">{ele?.name}</h3>
                      <h5 className="text-md max-h-20 line-clamp-2 leading-tight">{ele?.description}</h5>
                    </div>
                    <div className="text-sm space-x-1 items-center max-h-12 justify-center xs:justify-start hidden xs:flex">

                      <img src={userProfile?.photo?.thumb} className="rounded-full bg-sky-700 w-7 h-7"></img>
                      <div className="w-full whitespace-nowrap">
                        <div className="font-bold ">{userProfile?.name}</div>
                        <div className="text-xs">{ele?.date || "Mar 22, 2024"}</div>
                      </div>

                      <div className="w-full justify-end whitespace-nowrap hidden xs:flex">
                        <Link className="text-end justify-self-end w-24 bg-sky-700 p-1 rounded-md text-gray-200" href={`/products/${ele?.productid}`}>View Product</Link>
                      </div>
                    </div>
                    <Link className="text-center w-full bg-sky-700 p-1 rounded-md text-gray-200 xs:hidden " href={`/products/${ele?.productid}`}>View Product</Link>
                  </div>
                </div>
              ))}
              {/* Add more child elements as needed */}
            </div>

            <div className={"h-20 w-full"}></div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SellerClient