"use client"
import { useProgressStore } from '@/store'

const Progress = () => {
    const progress = useProgressStore(state => state.progress)

    return (
        <div className={`fixed flex justify-center w-full top-14 z-50 ${progress == 0 ? "hidden" : ""}`}>
            <div className='w-52 h-12 bg-white rounded-lg flex items-center px-2'>
                <div className='h-12 w-12 flex items-center'>
                    <div className='ml-2 animate-spin rounded-full h-4 w-4 border-r-2 border-b-2 border-sky-600 '></div>
                </div>
                <div className='w-full'>
                    <div>Progress...</div>
                    <div className='flex items-center justify-center w-full'>
                        <div className='w-full border border-black rounded-full h-2 flex'>
                            <div className={`bg-green-500 `} style={{ width: progress + "%" }}></div>
                        </div>
                        <div className='pl-2 text-sm text text-nowrap'>{progress + "%"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Progress