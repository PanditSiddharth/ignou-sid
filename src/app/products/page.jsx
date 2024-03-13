"use client"
import React, { useEffect } from 'react'
import cssi from "./product.module.css"
import Link from 'next/link'
import { useLoadingStore } from '@/store'
import { toast } from 'react-toastify'
const Products = () => {
  let setLoadingG = useLoadingStore(state => state.setLoadingG)
  useEffect(() => {
    toast.dismiss()
    setLoadingG(false) 
  }, [])
  return (
    
    <div>   
      <section>
      <div className='flex justify-center bg-red-200'>
          <div className='w-4/5 text-sky-900'>
            <h6 className='text-2xl font-extrabold'>Filter products</h6>
            <div className='flex space-x-5'>
              <div>
                <h6>Price</h6>
                <input type="number"/>
                <div>to</div>
                <input type="number"/>
              </div>

            </div>
            <Link href={"/sign-up"} className='flex justify-center' >
          <button className='bg-sky-900 text-sm py-2 text-white hover:bg-orange-950 px-[20px] shadow rounded-md my-3'
          >Filter</button>
        </Link>
          </div>
        </div>
        </section>   
      <section >
      <div className="mx-2 flex justify-center">
    <div className={`flex flex-wrap justify-center w-full md: lg:w-4/5 ${cssi.cmargin}`}>
  {
    [1, 2, 3, 2, 5, 6].map((element, index)=> (
  <div className="w-80 border rounded-md" key={index}>
  <div className="w-full h-40 bg-red-600 rounded-md px-5"></div>
  <div className="text-black bg-white px-5">
  <h2 className="text-2xl">Noteworthy technology acquisitions 2021</h2>
  <div>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</div>
  <Link href={"/sign-up"}>
          <button className='bg-orange-900 text-sm py-2 text-white hover:bg-orange-950 px-[20px] shadow rounded-md my-3'
          >Read More</button>
        </Link>
  </div>
  </div>
    ))
  }
   </div>
  </div>
  </section>
  </div>
  )
}

export default Products