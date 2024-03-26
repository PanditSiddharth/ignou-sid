"use client"
// pages/contact-us.js

// pages/contact-us.js

import Logo from '@/components/logo'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useLoadingStore, useUserStore } from '@/store'
import Link from 'next/link'

const ContactUs = () => {
  const router = useRouter()
  const loggedIn = useUserStore(state => state.loggedIn)
  const setLoadingG = useLoadingStore(state => state.setLoadingG)

  useEffect(() => {
    toast.dismiss()
    setLoadingG(false)
  }, [])

  const handleRoute = (e) => {
    // e.preventDefault();

    if (window.location.pathname != e.target.id) {
      setLoadingG(true)
      router.push(e.target.id)
    } else {
      toast.info(<div className='p-2 bg-white rounded-2xl'>Already on it</div>, { duration: 50 })
    }
  }

  const client = async (e) => {
    const email = e.get("email")
    const text = e.get("text");
    const who = e.get("who");

    if (!email.match(/.*@.*\..{1,4}/))
      return toast.error("Please enter a valid email")

    if (text.length < 4 || text.length > 50) {
      return toast.error("text must be at least 4 characters")
    }
  }

  return (
    <div className='flex items-center justify-center h-[100vh]'>
      <div className="w-full mx-2 max-w-sm lg:max-w-lg bg-white rounded-lg border border-sky-700 shadow-md shadow-gray-500">
        <div className='bg-sky-700 rounded-t-lg text-white flex items-center justify-center'>
          <div className="flex items-center justify-center w-1/2">
            <Logo css1="w-16 h-16" />
            <div className="text-sm font-serif">IGNOU</div>
          </div>
          <div className="ml-4 text-3xl w-1/2 font-extrabold">Contact Us</div>
        </div>

        <div className="px-8 pt-6 mb-4 flex flex-col justify-evenly items-center ml:flex-row-reverse">

          <form onSubmit={client}>
            <div className="mb-4">
              <input id="name" type="text" name='name' placeholder="Enter Name"
                className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <input id="email" type="email" name='email' placeholder="Enter Email"
                className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
              <textarea id="text" type="text" name='text' placeholder="Enter Description"
                className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline " rows={3} />
              <p className="text-red-500 text-xs italic hidden">Please enter details.</p>
            </div>

            <div className="flex items-center justify-between">
              <button className='bg-sky-700 text-sm py-[6px] text-white hover:bg-sky-800 px-[20px] rounded-md'
                type='submit'
              >Send Us</button>
              <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="https://telegram.me/panditsiddharth" target='_blank'>
                Direct Contact
              </Link>
            </div>
          </form>
          <div className='ml:max-w-52 py-4 w-full text-left ml:w-fit '>
              <hr className='py-4 ml:hidden' />
            <div className="ml:mb-4">
              <p className="text-sm font-medium text-gray-700 hidden ml:block">Email:</p>
              <p className="text-sm text-sky-800">mynmss3@gmail.com</p>
            </div>

            <div className="mb-4">


              <p className="text-sm font-medium text-gray-700 hidden ml:block">Mobile Number:</p>
              <p className="text-sm text-sky-800">+91 6389680622</p>
            </div>
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 hidden ml:block">Operating Address:</p>
              <p className="text-sm text-sky-800">Banshigarhi Bhattkherwa, Kakrabad, Lucknow, Uttar Pradesh, India, 226101</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactUs
