"use client"
import { useLoadingStore } from "@/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import server from "./server"
import { getCookie, setCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { getSession } from "next-auth/react";
import { useUserStore } from "@/store";

const Verify = () => {
    const { data } = useSession()
    const [hai, setHai] = useState(true)
    const setUserG = useUserStore(state => state.setUserG)
    const router = useRouter()
    const setLoadingG = useLoadingStore(state => state.setLoadingG)
    const handleRoute = (e) => {
        setLoadingG(true)
        router.push("/sign-up")
    }

    useEffect(() => {
        setTimeout(() => {
            setHai(abc => !abc)
        }, 1000);
        console.log(data)
        if (data?.session?.user?.email) {
        
          
            server({token: data?.session?.token})
                .then((e) => {
                    if (e.error) {
                        console.error(e)
                         toast.error(e.error)
                         return router.push("/sign-in")
                    }
                    setCookie("token", e.token)
                    setUserG(e)
                    router.push("/students/" + e.studentid)
                 
                })
        }
    }, [data])


    return (

        (data || hai) ? <div className="w-full h-[98vh] flex items-center justify-center text-sky-900 dark:text-white">Verifying...</div> : (
            <div className="w-full h-[98vh] flex items-center justify-center text-sky-900 dark:text-white">
                <div>
                    Please <Link href={`/sign-up`} onClick={handleRoute} className={`text-sky-600 hover:underline`}>Sign-in as student</Link> From google
                </div>
            </div>
        )

    )
}

export default Verify