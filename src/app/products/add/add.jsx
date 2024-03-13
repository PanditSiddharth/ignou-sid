'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiCamera } from "react-icons/fi";
import axios from 'axios';
import { useLoadingStore } from '@/store';
import { compress, getId } from './client';
import { saveFile, saveThumb, saveData } from './server';

const AddProductClient = (props) => {
    const [mstate, setMstate] = useState("")
    const [showCam, setShowCam] = useState("");
    const [hashtags, setHashtags] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState("Choose a file");
    const [progress, setProgress] = useState(0);
    const [fileSaved, setFileSaved] = useState("");
    const [uploading, setUploading] = useState(0);
    const setLoadingG = useLoadingStore(state => state.setLoadingG)


    const resetForm = () => {
        setFileName("Choose a file");
        setProgress(0);
        setFileSaved("");
        setHashtags([]);
        setUploading(0);
        setSelectedImage(null);
        setMstate(""); // Reset any other form fields if needed
        document.getElementById("file-upload").value = "";
        document.getElementById("image-upload").value = "";
        document.getElementById("name").value = ""; // Reset the product name input field
        document.getElementById("price").value = ""; // Reset the price input field
        document.getElementById("mprice").value = ""; // Reset the max price input field
        document.getElementById("tags").value = ""; // Reset the max price input field
        document.getElementById("description").value = ""; // Reset the description textarea field
    };


    useEffect(() => {
        toast.dismiss()
        setLoadingG(false)
    }, [])

    const handleTags = (e) => {
        const value = e.target.value?.trim()?.toLowerCase()
        const matched = value.match(/#\w+/g)
        setHashtags(matched?.map((e, index) => ({ css: hashtags[index]?.css || "flex items-center justify-center bg-gray-500 px-1 h-6 rounded-md text-gray-200", name: e })) || [])
    }

    const verifyTags = (e) => {
        setHashtags(hashtags?.map((e, index) => ({ css: "flex items-center justify-center bg-green-500 px-1 h-6 rounded-md text-green-200", name: e.name })) || [])
    }

    async function client(f) {
        try {
            setUploading(4)
            const name = f.get('name')
            if (!name) {
                setUploading(0)
                return toast.error('Please enter product name')
            }

            const description = f.get("description")
            if (!description) {
                setUploading(0)
                return toast.error('Please enter product description')
            }

            if (!fileSaved) {
                setUploading(0)
                return toast.error("Please upload File")
            }


            const myTags = hashtags?.map(e => e.name?.replace("#", "")?.toUpperCase())
            if (myTags.length < 1) {
                setUploading(0)
                return toast.error("Please enter atleast one hashtag")
            }


            const price = +f.get('price')
            if (!price || isNaN(price)) {
                setUploading(0)
                return toast.error("Please enter a valid price")
            }

            const mprice = +f.get('mprice')
            if (mprice && isNaN(price)) {
                setUploading(0)
                return toast.error("Please enter a valid max price")
            }

            let thumb = f.get('thumb')
            if (!thumb.name) {
                setUploading(0)
                return toast.error("Please select thumbnail for this product")
            }

            let file = f.get("file")
            if (!file.name) {
                setUploading(0)
                return toast.error("Plase select file")
            }

            setUploading(20)
            thumb = await compress(thumb, "lg");
            setUploading(state => state + 10)
            const formData = new FormData();
            formData.append("file", thumb)
            formData.append('maxDownloads', '1');
            formData.append('autoDelete', true);

            const thumbRes = (await axios.post('https://file.io', formData)).data
            if (!thumbRes.success) {
                setUploading(0)
                return toast.error("Error in saving thumbnail")
            }

            setUploading(50)
            thumb = await saveThumb({ ...JSON.parse(JSON.stringify(thumbRes)), name: thumb.name })
            if (!thumb || thumb?.error) {
                setUploading(0)
                return toast.error(thumb.error || "Server: Error in saving thumbnail")
            }
            setUploading(70)
            const productid = getId()
            file = await saveFile({ ...JSON.parse(JSON.stringify(fileSaved)), name: file.name, login: props.login, productid: productid })

            if (!file || file?.error) {
                setUploading(0)
                return toast.error(file.error || "Server: Error in saving thumbnail")
            }

            setUploading(85)

            const product = {
                productid,
                name,
                sellerid: props.login?.sellerid,
                description,
                price,
                maxprice: mprice,
                tags: myTags,
                thumbnail: thumb,
                product: file
            }

            const final = await saveData(product)

            if (!final || final.error) {
                toast.dismiss()
                setUploading(0)
                return toast.error(final.error || "Server: Error in saving product")
            }
            setUploading(100)
            toast.dismiss()
            resetForm()
            return toast.success("Product saved");
        } catch (error) {
            console.error(error);
            toast.dismiss();
            toast.error(error.message)
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    setSelectedImage(e.target.result);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDocChange = async (event) => {
        const file = event.target.files[0]
        if (file) {
            console.log(file)
            setFileName(file.name)

            const formData = new FormData();
            formData.append("file", file)
            formData.append('maxDownloads', '1');
            formData.append('autoDelete', true);
            const fileRes = (await axios.post('https://file.io', formData, {
                onUploadProgress: (e) => {
                    console.log(e)
                    setProgress(Math.ceil(e.progress * 100))
                }
            })).data
            if (!fileRes.success) {
                return toast.error("Error in saving file")
            }
            else
                setFileSaved(fileRes)
        }
    };

    return (
        <section className='h-[93vh] flex items-center'>
            <div className={`flex my-8 w-full`}>

                {uploading != 0 && <div className='fixed flex justify-center w-full top-8 z-50'>
                    <div className='w-52 h-12 bg-white rounded-lg flex items-center px-2'>
                        <div className='h-12 w-12 flex items-center'>
                            <div className='ml-2 animate-spin rounded-full h-4 w-4 border-r-2 border-b-2 border-sky-600 '></div>
                        </div>
                        <div className='w-full'>
                            <div>Saving data..</div>
                            <div className='flex items-center justify-center w-full'>
                                <div className='w-full border border-black rounded-full h-2 flex'>
                                    <div className={`bg-green-500 `} style={{ width: uploading + "%" }}></div>
                                </div>
                                <div className='pl-2 text-sm text text-nowrap'>{uploading + "%"}</div>
                            </div>
                        </div>
                    </div>
                </div>}

                <div className={`w-full md:w-[7in] mx-5 md:mx-auto bg-white border rounded-md border-sky-900 space-y-1`}>


                    {/* Form Start */}
                    <form action={client} className={`w-full bg-white rounded-md`}>

                        <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0'>

                            <div className="text-white h-28 w-full sm:w-2/3 md:1/2 flex items-center justify-center sm:justify-start rounded-t-md pl-6 mt-4 pr-5 space-x-10">

                                {/* thumb upload */}
                                <div
                                    onMouseEnter={() => setShowCam(true)}
                                    onMouseLeave={() => setShowCam(false)}
                                    className="relative w-24 h-24 overflow-hidden flex items-center justify-center "
                                >

                                    <div className="absolute inset-0 flex items-end justify-center">
                                        <div className="w-full h-8 bg-black bg-opacity-30 flex items-end justify-center">
                                            <FiCamera className="text-white mb-2" />
                                        </div>
                                    </div>

                                    <input
                                        id="image-upload"
                                        type="file"
                                        className="absolute self-end z-50 mb-1 text-transparent"
                                        accept="image/*"
                                        name='thumb'
                                        onChange={handleImageChange}
                                    />
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                    ) :
                                        (<div className="w-24 h-24 text-white border-gray-400 border" ></div>)}
                                </div>

                                <div className='flex flex-col justify-center h-full'>
                                    <div className='text-3xl text-gray-600 font-bold'>IGNOU-X</div>
                                    <div className='text-gray-500 text-md'>Add thumbnail</div>
                                </div>
                            </div>

                            {/* file upload */}
                            <div className='w-full sm:w-1/3 md:1/2 flex justify-center items-center'>

                                <div className="flex flex-col items-center justify-center">
                                    <label htmlFor="file-upload" className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md cursor-pointer hover:bg-gray-600 max-w-44 whitespace-nowrap overflow-hidden ">
                                        {fileName}
                                    </label>
                                    {progress != 0 && <div className='w-full border border-black rounded-full mt-1 h-2 flex'>
                                        <div className={`bg-green-500 `} style={{ width: progress + "%" }}></div>
                                    </div>}
                                    {progress != 0 && <div className='text-sm'>{progress + "%"}</div>}

                                    <input id="file-upload" type="file"
                                        name='file'
                                        accept="application/*"
                                        className="sr-only" onChange={handleDocChange} />
                                </div>
                            </div>
                        </div>

                        {/* title & tags */}
                        <div className='flex flex-col md:flex-row justify-between'>

                            <div className={`md:w-full mx-5 my-4`}>
                                <input id="name" type="text" name='name' placeholder="Enter product name" className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        </div>

                        {/* title & tags */}
                        <div className='flex flex-col md:flex-row justify-between'>

                            <div className={`md:w-1/2 mx-5 my-4 flex space-x-2 overflow-hidden`}>
                                {hashtags.length > 0 ? <div className='px-3 flex space-x-1'>
                                    {
                                        hashtags.map((e, index) => (
                                            <button className={e.css} key={index}>{e.name}</button>
                                        ))
                                    }
                                </div> :
                                    <div className={`px-3 text-gray-500`}>No tags written</div>}
                            </div>

                            <div className={`md:w-1/2 mx-5 my-4 flex`}>
                                <input id="tags" type="text" name='tags' placeholder="Hash tags example: #bca #bcs11"
                                    onChange={handleTags}
                                    className={"border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"} />
                                <div className='bg-sky-600 text-sm py-[2px] text-white hover:bg-sky-700 px-2 rounded-md cursor-pointer' onClick={verifyTags}>Verify</div>
                            </div>
                        </div>


                        {/* 2nd row price and mprice*/}
                        <div className='flex flex-col md:flex-row justify-between'>

                            <div className={`md:w-1/2 mx-5 my-4`}>
                                <input
                                    id="price"
                                    type="text"
                                    name="price"
                                    placeholder="Enter product price"
                                    autoComplete='true'
                                    className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                            </div>

                            <div className={`md:w-1/2 mx-5 my-4`}>
                                <input
                                    id="mprice"
                                    type="text"
                                    name="price"
                                    placeholder="Max price (optional)"
                                    autoComplete='true'
                                    className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        </div>


                        {/* 6th row description */}
                        <div className={`mx-5`}>
                            {/* <label htmlFor="about" className='block text-gray-700 text-sm font-bold my-1'>Enter about yourself</label> */}
                            <textarea
                                name="description"
                                placeholder="Enter product description"
                                id="description"
                                cols="15"
                                rows="2"
                                className={`border-b-2 border-gray-500 w-full bg-white py-1 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                            />
                        </div>

                        {/* 7th row */}
                        <div className='flex flex-row w-full justify-center items-center text-gray-700 pb-2 pt-4'>
                            <button className='bg-sky-900 text-sm py-[6px] text-white hover:bg-sky-950 px-[20px] rounded-md'
                                type='submit'

                            >Add product</button>
                            <div className='bg-sky-900 text-sm py-[6px] text-white hover:bg-sky-950 px-[20px] rounded-md cursor-pointer ml-2'
                            onClick={resetForm}
                            >Reset Form</div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddProductClient