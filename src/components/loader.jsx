"use client"

import { useLoadingStore } from '@/store'
import React from 'react'

const Loader = () => {
    const loadingG = useLoadingStore(state => state.loadingG)
    
    return (
        <div>
          <div className={`fixed flex items-center justify-center h-screen w-[100vw] top-0 right-0 z-40 ${loadingG ? '' : 'hidden'}`}>
            {/* <div className='fixed h-screen w-[100vw] top-0 right-0 bg-black opacity-20'></div> */}
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-sky-600 dark:border-sky-400" ></div>
                    <div className='fixed text-sky-600 dark:text-sky-400 text-xl font-bold'>Loading...</div>
                </div>
            </div>
        </div>
    )
}

export default Loader