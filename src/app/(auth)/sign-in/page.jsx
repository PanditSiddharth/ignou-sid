"use client"
import Logo from '@/components/logo'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import server from "./server"
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useLoadingStore, useUserStore } from '@/store'
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc'

const Signin = () => {
  const router = useRouter()
  const setUserG = useUserStore(state => state.setUserG)
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
      router.push(e.target.id)
    } else {
      toast.info(<div className='p-2 bg-white rounded-2xl'>Already on it</div>, { duration: 50 })
    }
  }

  const client = async (e) => {
    const email = e.get("email")
    const password = e.get("password");
    const who = e.get("who");

    if (!email.match(/.*@.*\..{1,4}/))
      return toast.error("Please enter a valid email")

    if (password.length < 4 || password.length > 50) {
      return toast.error("Password must be at least 4 characters")
    }

    if (!who)
      return toast.error("Please select for which you want to Login (seller or student)")


    const res = await server({ email, password, who })
    if (!res || res.error) {
      return toast.error(res.error || "Something went wrong")
    }

    if (!res.token)
      return toast.error("Error in signing in")

    setCookie("token", res.token)
    setUserG(res.user)
    setLoadingG(true)
    toast.success("Registered successfully", { duration: 4000 })
    if (who == "seller") {
      return router.push(`/sellers/${res.userid}`)
    } else {
      return router.push(`/students/${res.userid}`)
    }
  }

  return (
    <div className='flex items-center justify-center h-[90vh]'>
      <div className="w-full max-w-xs bg-white rounded-lg border border-sky-700 shadow-md shadow-gray-500">
        <div className='bg-sky-700 rounded-t-lg text-white flex items-center justify-center'>
          <div className="flex items-center justify-center w-1/2">
            <Logo css1="w-16 h-16" />
            <div className="text-sm font-serif">IGNOU</div>
          </div>
          <div className="ml-4 text-3xl w-1/2 font-extrabold">Login</div>
        </div>

        <form className="px-8 pt-6 mb-4" action={client}>
          <div className="mb-4">
            <input id="email" type="email" name='email' placeholder="Enter Email"
              className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <input id="password" type="password" name='password' placeholder="Enter Password"
              className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
            <p className="text-red-500 text-xs italic hidden">Please choose a password.</p>
          </div>

          {/* 3rd row radio seller/student  */}
          <div className={`md:w-1/2 mx-5 my-4 flex`}>
            <div className='flex mx-4'>
              <input id="student" type="radio"
                name='who' value={"student"}
                className="w-full py-1 px-3 leading-tight focus:outline-none focus:shadow-outline" />
              <div className='text-md ml-1 text-gray-900'>Student</div>
            </div>
            <div className='flex mx-4'>
              <input id="seller" type="radio"
                name='who' value={"seller"}
                className="border-b-2 border-gray-500 w-full bg-white px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
              <div className='text-md ml-1 text-gray-900'>Seller</div>
            </div>
          </div>


          <div className="flex items-center justify-between">
            <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md'
              type='submit'
            >Login</button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>


        <div className='flex flex-row w-full justify-center items-center text-gray-700 py-2'>
          <div className='bg-gray-700 h-[1px] w-1/4'><br /></div>
          <div className='mx-7'>or</div>
          <div className='bg-gray-700 h-[1px] w-1/4'><br /></div>
        </div>
        {/* Google authentication */}
        <div className='flex flex-row w-full justify-center space-x-1 text-sm items-center text-gray-700 pb-3'>
          <div className='flex font-bold space-x-1 items-center bg-gray-200 rounded-lg py-1 px-2 cursor-pointer'
            onClick={e => {
              toast.loading("Please wait...")
              signIn("google", { callbackUrl: "/sign-in/verify" })
            }}
          >
            <FcGoogle className='w-6 h-6' />
            <div className=''>
              Students sign-in with google
            </div>
          </div>
        </div>

        <div className='flex flex-row w-full justify-center space-x-1 text-sm items-center text-gray-700 pb-3'>
          {/* <TelegramLogin /> */}
          <div>Not have account ? </div>
          <button className='text-sky-600 hover:underline' onClick={handleRoute} id={`/sign-up`}>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Signin