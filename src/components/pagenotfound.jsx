"use client"
import { useLoadingStore } from "@/store"
import Link from "next/link"
import { useEffect } from "react"
import { toast } from "react-toastify"

const PageNotFound = () => {
    const setLoadingG = useLoadingStore(state => state.setLoadingG)
    useEffect(() => {
        toast.dismiss()
        setLoadingG(false)
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

    return ( 
        <div className="w-full flex flex-col justify-center items-center h-[90vh] text-sky-700 dark:text-white font-bold">
            <div>Page not found</div>
            <div className="flex">
                <div className="pr-1">Go to</div>
                <Link href={`/`} id="/" className="text-sky-500 hover:underline" onClick={handleRoute} > <button id="/" onClick={handleRoute}>Home Page</button></Link>
            </div>
        </div>
    )
}

export default PageNotFound