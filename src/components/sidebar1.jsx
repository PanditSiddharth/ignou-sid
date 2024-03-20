"use client"
import { GoHome } from "react-icons/go"
import { PiStudent } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { RiServiceLine } from "react-icons/ri";
import { MdOutlineInfo } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";
import Link from "next/link";
import cssi from "./css.module.css"
import { useLoadingStore, useUserG, useUserStore } from "@/store";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";

const Sidebar = (props) => {
    const pathname = usePathname() 
    const [login, setUserG] = useUserG(props?.gbl)
    const setLoadingG = useLoadingStore(state => state.setLoadingG)
    const photoUrld = (login?.photo?.thumb || `https://ui-avatars.com/api/?name=${login?.name || "L O L"}&background=random`);


    const handleRoute = (e) => {
        if (pathname != e.path) {
            setLoadingG(true)
        } else {
            toast.info(<div className='p-2 bg-white rounded-2xl'>Already on it</div>, { duration: 50 })
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const doc = document.getElementById("hide")
            if(!doc.className.includes("hidden")) 
            props.setHiden("hidden");
        };

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className={`fixed flex justify-between min-w-72 h-full bg-gray-200 dark:bg-sky-900 z-30 ${props.hiden} `} onClick={e=> props.setHiden("hidden")} id={"hide"}>

            <div className="w-full h-full pl-10 flex flex-col justify-between items-start">
                <div className="relative w-full bg-white">
            <RxCross2 className="absolute right-2 top-2 w-6 h-6" onClick={(e=> props.setHiden("hidden"))}/>
                </div>
                <Link href="/"
                    onClick={e => handleRoute({ ...e, path: "/" })}
                >
                    <h2 className="font-bold text-sky-600 text-3xl mt-5 py-8" >IGNOU-X</h2>
                </Link>
                <div className="flex flex-col justify-between h-full items-start">

                    <div className={"flex flex-col min-h-[22rem] h-2/3 max-h-96 justify-evenly ml-4 items-start"} >

                        <Link className="flex space-x-2 items-center" href="/"
                            onClick={e => handleRoute({ ...e, path: "/" })}
                        >
                            <GoHome className="w-8 h-8" />
                            <h5 className="text-xl">Home</h5>
                        </Link>

                        <Link className="flex space-x-2 items-center" href="/students"
                            onClick={e => handleRoute({ ...e, path: "/students" })}
                        >
                            <PiStudent className="w-8 h-8" />
                            <h5 className="text-xl">Students</h5>
                        </Link>

                        <Link className="flex space-x-2 items-center"
                            href="/sellers"
                            onClick={e => handleRoute({ ...e, path: "/sellers" })}
                        >
                            <CgProfile className="w-8 h-8" />
                            <h5 className="text-xl">Sellers</h5>
                        </Link>

                        <Link className="flex space-x-2 items-center" href="/services"
                        onClick={e=> handleRoute({...e, path: "/services"})}
                        >
                            <RiServiceLine className="w-8 h-8" />
                            <h5 className="text-xl">Services</h5>
                        </Link>

                        <Link className="flex space-x-2 items-center" href="/about"
                            onClick={e => handleRoute({ ...e, path: "/about" })}
                        >
                            <MdOutlineInfo className="w-8 h-8" />
                            <h5 className="text-xl">About</h5>
                        </Link>

                        <Link className="flex space-x-2 items-center" href="/contact"
                            onClick={e => handleRoute({ ...e, path: "/contact" })}>
                            <RiCustomerService2Line className="w-8 h-8" />
                            <h5 className="text-xl">Contact</h5>
                        </Link>
                    </div>

                    <div className={`min-h-24 h-full max-h-28 ml-4 flex flex-col justify-evenly ${cssi.showup}`}>
                        <Link className="flex space-x-2 items-center" href={login?.name ? (login?.sellerid ? `/sellers/${login.sellerid}` : `/students/${login?.studentid}`) : "/sign-up"}

                        onClick={e => handleRoute({ ...e, path: (login?.name ? (login?.sellerid ? `/sellers/${login.sellerid}` : `/students/${login?.studentid}`) : "/sign-up") })}
                        
                        >
                            <img src={photoUrld} width={28} height={28} className="w-7 h-7 rounded-full" />
                            {login?.name ? <h5 className="text-xl whitespace-nowrap overflow-hidden overflow-ellipsis w-40">{login?.name}</h5> :
                            <h5 className="text-xl">Sign-up</h5>}
                        </Link>
                        <Link className="flex space-x-2 items-center"
                            href={`/`}
                        >
                            <FiMenu className="w-7 h-7" />
                            <h5 className="text-xl">More</h5>
                        </Link>
                    </div>
                </div>
            </div>

            {/* border */}
            <div className="bg-slate-300 dark:bg-sky-800 w-[1px] h-full">
            </div>
        </div>
    )
}

export default Sidebar