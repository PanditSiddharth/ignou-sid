"use client"

import { useLoadingStore } from "@/store"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Do = () => {
    const router = useRouter()
    const setLoadingG = useLoadingStore(state => state.setLoadingG)
    const handleRoute = (e) => {
        setLoadingG(true)
        router.push("/sign-up")
    }
    return (
        <div className="w-full h-[98vh] flex items-center justify-center text-sky-900 dark:text-white">
            <div>
                Please <Link href={`/sign-up`} onClick={handleRoute} className={`text-sky-600 hover:underline`}>Sign-up</Link> as a seller to publish tags
            </div>
        </div>
    )
}

export default Do