import React from 'react'

const AddProduct = () => {
    return (
        <div className="container flex justify-center items-center h-[100vh] text-white">

            { /* mobile */}
            <div className="flex flex-col w-52 h-96 bg-black rounded-lg">

                { /* screen */}
                <div className="flex justify-center itmes-center w-full p-4 h-1/2 ">
                    <img src="/next.svg"
                        width="50"
                        height="80"
                        className="w-full h-full bg-white p-4"
                    />
                    {/* <div className='w-full h-full bg-white'>

                    </div> */}
                </div>

                { /* buttons */}
                <div className="flex  w-full p-4 h-1/2 flex-col">
                    {/* upper buttons */}
                    <div className='w-full h-1/3 flex justify-center items-center '>
                        {/* left buttons */}
                        <div className='w-1/3 h-full flex flex-col'>
                            {/* button 1 */}
                            <div className='h-1/2 flex justify-center items-center'>
                                <div className='bg-white w-2/3 h-1'></div>
                            </div>

                            {/* button 2 */}
                            <div className='h-1/2 flex justify-center items-center'>
                                <div className='bg-white w-2/3 h-1'></div>
                            </div>
                        </div>


                        {/* middle buttons */}
                        <div className='w-1/3 h-full flex flex-col rounded-full bg-white p-1'>
                            <div className='w-full h-full bg-black rounded-full'></div>
                        </div>


                        {/* right buttons */}
                        <div className='w-1/3 h-full flex flex-col '>
                            {/* button 1 */}
                            <div className='h-1/2 flex justify-center items-center'>
                                <div className='bg-white w-2/3 h-1'></div>
                            </div>

                            {/* button 2 */}
                            <div className='h-1/2 flex justify-center items-center'>
                                <div className='bg-white w-2/3 h-1'></div>
                            </div>
                        </div>


                    </div>

                    <div className="grid h-2/3 w-full grid-cols-3 gap-1 mt-2 text-sm ">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((e, index)=> (
                                <div className="flex items-center justify-center" key={index}>{e}</div>
                            ))
                        }
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AddProduct