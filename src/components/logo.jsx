import React from 'react'

let Logo = (props = {}) => {

    return (
        <div className={`w-20 h-20 ${props?.css1} flex items-center justify-center text-sky-900 dark:text-white`}>
            <div className="-rotate-45 relative border border-sky-900 dark:border-white w-[15%] h-[70%] -bottom-[10%] -left-[15%] text-[50%] flex flex-col items-center justify-center space-y-[90%] text-center z-30 bg-sky-600 dark:bg-orange-400">
                <div className="leading-[15%] text-center border-[80%]">S</div>
                <div className="leading-[15%]">i</div>
                <div className="leading-[15%]">d</div>
            </div>
            <div className="rotate-45 relative border border-sky-900 dark:border-white w-[4%] h-[130%] -ml-[15%] dark:bg-orange-400">
            </div>
        </div>
    )
}

export default Logo