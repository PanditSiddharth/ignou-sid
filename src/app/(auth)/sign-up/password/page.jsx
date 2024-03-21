"use client"
import { useLoadingStore, useUserStore } from "@/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { getId } from "../client"
import { server } from "../server"
import { setCookie } from "cookies-next"
import { useEffect, useState } from "react"

const Password = () => {
    const { data } = useSession()
    const [hai, setHai] = useState(true)
    const router = useRouter()
    const setLoadingG = useLoadingStore(state => state.setLoadingG)
    const setUserG = useUserStore(state => state.setUserG);

    const handleRoute = (e) => {
        setLoadingG(true)
        router.push("/sign-up")
    }

    useEffect(()=> {
        setTimeout(() => {
            setHai(abc=> !abc)
        }, 1000);
    }, [])

    const client = async (e) => {
        const password = e.get("password");
        if (password != e.get("cpassword")) {
            return toast.error("Password mismatch")
        }

        if (data?.session?.user?.email) {
            const user = {
                userid: getId(),
                name: data.session?.user.name,
                email: data.session?.user.email,
                password,
                photo: {
                    url: data.session?.user.image,
                    thumb: data.session?.user.image,
                    medium: data.session?.user.image,
                    id: data.session?.user.image,
                    time: new Date().getTime(),
                },
                about: "Busy in study",
                who: "student"
            }

            const res = await server(user)
            if (res.error) {
                return toast.error(res.error);
            }
            setCookie("token", res.token)
            setUserG({...user, studentid: user.userid})
            router.push("/students/" + user.userid)
        }

    }


    return (

        (data || hai) ? <div className="w-full h-[95vh] flex items-center justify-center">

            <form className=" w-60 rounded-xl  bg-white" action={client}>
                <h6 className="h-14 mb-5 text-xl text-center flex justify-center items-center font-bold bg-sky-900 border-t border-x rounded-t-xl text-white">Create Password</h6>
                <div className="px-3">
                    <div className="mb-6">
                        <input id="password" type="password" name='password' placeholder="Enter Password"
                            className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                        <p className="text-red-500 text-xs italic hidden">Please choose a password.</p>
                    </div>
                    <div className="mb-6">
                        <input id="cpassword" type="password" name='cpassword' placeholder="Confirm Password"
                            className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                        <p className="text-red-500 text-xs italic hidden">Please choose a password.</p>
                    </div>

                    <div className="w-full flex items-center justify-center h-10 rounded-2xl">
                        <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md'
                            type='submit'
                        >Register</button>
                    </div>
                </div>
            </form>
        </div> : (
            <div className="w-full h-[98vh] flex items-center justify-center text-sky-900 dark:text-white">
                <div>
                    Please <Link href={`/sign-up`} onClick={handleRoute} className={`text-sky-600 hover:underline`}>Sign-up as student</Link> From google
                </div>
            </div>
        )

    )
}

export default Password