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
import { useLoadingStore, useSideHeightStore, useUserG, useUserStore } from "@/store";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
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

    return (
        <div className={`fixed sm:flex justify-between w-14 lg:min-w-72 hidden ${props?.css1 ? "h-[calc(100vh-3.5rem)]" : "h-full"}`} >

            <div className="w-full h-full lg:pl-10 flex flex-col justify-between items-center lg:items-start">
                <Link href="/"
                    onClick={e => handleRoute({ ...e, path: "/" })}
                    className={props?.css1 ? "hidden": ""}
                >
                    <h2 className="font-bold text-sky-600 text-3xl mt-5 py-8 hidden lg:block" >IGNOU-X</h2>
                    <h2 className="font-bold text-sky-600 text-3xl mt-5 py-8 block lg:hidden" >IX</h2>
                </Link>
                <div className="flex flex-col justify-between h-full items-center lg:items-start">

                    <div className={"flex flex-col min-h-[22rem] h-2/3 max-h-96 justify-evenly lg:ml-4 items-center lg:items-start"} >

                        <Link className="flex space-x-2 items-center" href="/"
                            onClick={e => handleRoute({ ...e, path: "/" })}
                        >
                            <GoHome className="w-8 h-8" />
                            <h5 className="text-xl hidden lg:block">Home</h5>
                        </Link>

                        <Link className="flex space-x-2 items-center" href="/students"
                            onClick={e => handleRoute({ ...e, path: "/students" })}
                        >
                            <PiStudent className="w-8 h-8" />
                            <h5 className="text-xl hidden lg:block">Students</h5>
                        </Link>

                        <Link className="flex space-x-2 items-center"
                            href="/sellers"
                            onClick={e => handleRoute({ ...e, path: "/sellers" })}
                        >
                            <CgProfile className="w-8 h-8" />
                            <h5 className="text-xl hidden lg:block">Sellers</h5>
                        </Link>

                        <Link className="flex space-x-2 items-center" href="https://sidsharma.in/services"
                        onClick={e=> handleRoute({...e, path: "/services"})}
                        >
                            <RiServiceLine className="w-8 h-8" />
                            <h5 className="text-xl hidden lg:block">Services</h5>
                        </Link>

                        <Link className="flex space-x-2 items-center" href="/about"
                            onClick={e => handleRoute({ ...e, path: "/about" })}
                        >
                            <MdOutlineInfo className="w-8 h-8" />
                            <h5 className="text-xl hidden lg:block">About</h5>
                        </Link>

                        <Link className="flex space-x-2 items-center" href="/contact"
                            onClick={e => handleRoute({ ...e, path: "/contact" })}>
                            <RiCustomerService2Line className="w-8 h-8" />
                            <h5 className="text-xl hidden lg:block">Contact</h5>
                        </Link>
                    </div>

                    <div className={`min-h-24 h-full max-h-28 lg:ml-4 flex flex-col justify-evenly items-center lg:items-start ${cssi.showup}`}>
                        <Link className="flex space-x-2 items-center justify-center lg:justify-start" href={login?.name ? (login?.sellerid ? `/sellers/${login.sellerid}` : `/students/${login?.studentid}`) : "/sign-up"}

                        onClick={e => handleRoute({ ...e, path: (login?.name ? (login?.sellerid ? `/sellers/${login.sellerid}` : `/students/${login?.studentid}`) : "/sign-up") })}
                        
                        >
                            <img src={photoUrld} width={28} height={28} className="w-7 h-7 rounded-full" />
                            {login?.name ? <h5 className="text-xl hidden lg:block whitespace-nowrap overflow-hidden overflow-ellipsis w-40">{login?.name}</h5> :
                            <h5 className="text-xl hidden lg:block">Sign-up</h5>}
                        </Link>
                        <Link className="flex lg:space-x-2 items-center justify-center lg:justify-start"
                            href={`/`}
                        >
                            <FiMenu className="w-7 h-7" />
                            <h5 className="text-xl hidden lg:block">More</h5>
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