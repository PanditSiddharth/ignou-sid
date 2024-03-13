'use client'
import React, { useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { states, districts } from 'indian_address';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FiCamera } from "react-icons/fi";
import { savePhoto, server, saveFile } from './server';
import NextImage from 'next/image'
// import { imageupload } from './imageupload';
import makePost from './makepost';
import XhtpAuthGoogle from './xhtpgoogle';
import { setCookie } from 'cookies-next';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useLoadingStore, useUserStore } from '@/store';
import { getId, compress, startResend } from './client';

const Signup = () => {

    const [mstate, setMstate] = useState("")
    const [showPass, setShowPass] = useState("");
    const [haveOtp, setHaveOtp] = useState("");
    const [xhtp, setXhtp] = useState("");
    const [usr, setUsr] = useState("");
    const [isSeller, setIsSeller] = useState("")
    const router = useRouter()
    const [resend, setResend] = useState(60)
    const setUserG = useUserStore(state => state.setUserG)
    const setLoadingG = useLoadingStore(state => state.setLoadingG)
    const [uploading, setUploading] = useState(0)

    useEffect(() => {
        toast.dismiss()
        setLoadingG(false)
    }, [])

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Determine the dimensions of the square crop
                    const size = Math.min(img.width, img.height);

                    // Set canvas size to be square
                    canvas.width = size;
                    canvas.height = size;

                    // Calculate crop position
                    const offsetX = (img.width - size) / 2;
                    const offsetY = (img.height - size) / 2;

                    // Draw image onto canvas with cropping
                    ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

                    // Convert canvas content to base64 URL
                    const croppedImageDataUrl = canvas.toDataURL('image/jpeg');

                    // Set the cropped image as selected image
                    setSelectedImage(croppedImageDataUrl);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };


    const handleStateChange = (e) => {
        setMstate(e.target.value)
    }

    async function sendOtp() {
        new Promise(res => setTimeout(a => res(toast.loading("Sending otp...", { duration: 8000 })), 0))
        let xhtpRes = await makePost({ "email": usr.email, "name": usr.name })
        setXhtp(xhtpRes?.xhtp + "")
        toast.dismiss()
        setHaveOtp("yes")
        toast.success("Otp sent", { duration: 4000 })
        startResend(resend, setResend)
    }

    // Validation and otp sending
    async function validation(f) {
        try {

            if (!f.get("who")) {
                return toast.error("Please select for which you want to sign up (seller or student)")
            }

            /**
            * Represents a user object.
            * @typedef {Object} User
            * @property {Number} userid - The user identifier
            * @property {string} name - The name of the user.
            * @property {string} email - The email address of the user.
            * @property {number} age - The age of the user.
            * @property {string} password - The password of the user.
            * @property {string} cpassword - The cpassword of the user.
            * @property {string} account - The password of the user.
            * @property {string} ifsc - The cpassword of the user.
            * @property {string} state - The state of the user
            * @property {string} district - The district of the user
            * @property {string} phone - The phone number of the user
            * @property {string} address - The address of the user
            * @property {{"cid": string | number, "mid": number}} photo - Information about the user's photo.
            * @property {string} who - Indicates the role of the user.
            */

            /**
             * @type {User}
             */
            let user = {
                "name": f.get("name"),
                "email": f.get("email"),
                "password": f.get("password"),
                "cpassword": f.get("cpassword")
            };


            if (f.get("who") == "seller") {
                user = {
                    ...user,
                    "state": f.get("state"),
                    "district": f.get("district"),
                    "address": f.get("address"),
                    "account": f.get("account"),
                    "ifsc": f.get("ifsc")
                }
            }
            
            for (const [key, value] of Object.entries(user)) {
                if (!value) {
                    toast.error(key + " is required");
                    return;
                }
                if (value.length < 4 || value.length > 80) {
                    return toast.error(`${key[0].toUpperCase() + key.slice(1)} must be at least 4 characters`);
                }
            }

            if (user.password != user.cpassword) {
                return toast.error("Password mismatch! ")
            }


            user.userid = getId()

            user.photo = f.get("photo")
            user.who = f.get("who")
            if (!user.photo?.name)
                user.photo = false;

            setUsr(user)

            new Promise(res => setTimeout(a => res(toast.loading("Sending otp...", { duration: 8000 })), 0))
            let xhtpRes = await makePost({ "email": user.email, "name": user.name })
            setXhtp(xhtpRes?.xhtp)
            toast.dismiss()
            setHaveOtp("yes")
            toast.success("Plase enter otp we sent you", { duration: 4000 })
            startResend(resend, setResend)
        } catch (err) {
            console.error("Error in client", err.message)
        }
    }

    const handleRoute = (e) => {
        if (window.location.pathname != e.target.id) {
            setLoadingG(true)
            router.push(e.target.id)
        } else {
            toast.info(<div className='p-2 bg-white rounded-2xl'>Already on it</div>, { duration: 50 })
        }
    }

    const otpHandler = async (f) => {
        // 2 Otp Come check and initialization
        try {
            const otp = f.get('otp')
            if (!otp || (otp + "").length != 6) {
                setUploading(0)
                return toast.error("Invalid otp length")
            }

            // 3 email verification
            setUploading(10)
            let m = await XhtpAuthGoogle({ "otp": otp, "xhtp": xhtp })

            if (!m) {
                setUploading(0)
                return toast.error("Invalid otp")
            }

            setUploading(20)

            // 4 Saving photo     
            if (usr.photo) {
                const formData = new FormData();
                const photo = await compress(usr.photo, "lg");
                setUploading(40)
                if (!photo || photo.error)
                    formData.append('file', usr.photo);
                else
                    formData.append('file', photo);

                // Add other form fields
                formData.append('maxDownloads', '1');
                formData.append('autoDelete', 'true');

                const fileRes = await axios.post('https://file.io', formData)
                const fileData = fileRes.data;
                setUploading(70)
                if (fileData.success) {
                    usr.photo = await saveFile({ ...JSON.parse(JSON.stringify(fileData)), name: usr.photo.name })
                } else {
                    usr.photo = await savePhoto(formData)
                }

                setUploading(85)

                if (!usr?.photo || usr.photo?.error) {
                    setUploading(0)
                    return toast.error(usr.photo.error || "Error in saving photo")
                }
            }

            // 4 Data save in database 
            const res = await server(usr)

            if (!res || res?.error) {
                setUploading(0)
                return toast.error(res?.error)
            }

            setUploading(95)

            setCookie("token", res.token)
            setUploading(0)
            toast.success("Registered successfully")
            setLoadingG(true)
            if (usr?.who == "seller") {
                setUserG({ ...usr, sellerid: usr.userid })
                return router.push(`sellers/${usr.userid}`)
            } else {
                setUserG({ ...usr, studentid: usr.userid })
                return router.push(`students/${usr.userid}`)
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.message)
            setUploading(0)
        }
    }

    function handleWho(e) {
        if (e.target.value == "seller")
            setIsSeller("yes")
        else setIsSeller("")
    }

    return (
        <section className=''>
            <div className={`flex my-8 w-full`}>

                {uploading != 0 && <div className='fixed flex justify-center w-full top-8 z-50'>
                    <div className='w-52 h-12 bg-white rounded-lg flex items-center px-2'>
                        <div className='h-12 w-12 flex items-center'>
                            <div className='ml-2 animate-spin rounded-full h-4 w-4 border-r-2 border-b-2 border-sky-600 '></div>
                        </div>
                        <div className='w-full'>
                            <div>Registering...</div>
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
                    <form action={validation} className={`w-full bg-white rounded-t-md`}>

                        <div className="bg-sky-600 h-28 w-full flex items-center justify-center rounded-t-md">
                            {/* Image upload */}
                            <div
                                className="relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
                            >

                                <div className="absolute inset-0 flex items-end justify-center">
                                    <div className="w-full h-8 bg-black bg-opacity-50 flex items-end justify-center rounded-b-full">
                                        <FiCamera className="text-white mb-2" />
                                    </div>
                                </div>

                                <input
                                    id="file-upload"
                                    type="file"
                                    className="absolute self-end z-50 mb-1 text-transparent"
                                    accept="image/*"
                                    name='photo'
                                    onChange={handleImageChange}
                                />
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                ) :
                                    (<FaUserCircle className="w-24 h-24 text-gray-300" />)}
                            </div>
                        </div>


                        {/* 1st row */}
                        <div className='flex flex-col md:flex-row justify-between'>

                            <div className={`md:w-1/2 mx-5 my-4`}>
                                <input id="name" type="text" name='name' placeholder="Enter your name"
                                    className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                            </div>

                            <div className={`md:w-1/2 mx-5 my-4`}>
                                <input id="email" type="email" name='email' placeholder="Enter your email"
                                    className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                        </div>

                        {/* 2nd row */}
                        <div className='flex flex-col md:flex-row justify-between'>

                            <div className={`md:w-1/2 mx-5 my-4`}>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    autoComplete='true'
                                    className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                            </div>

                            <div className={`md:w-1/2 mx-5 my-4 flex justify-between`}>
                                {showPass ? (
                                    <input
                                        type="text"
                                        placeholder="Confirm password"
                                        autoComplete="true"
                                        name="cpassword"
                                        className="border-b-2 border-gray-500 bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline w-11/12" />) : (
                                    <input
                                        type="password"
                                        autoComplete="true"
                                        name="cpassword"
                                        placeholder="Confirm password"
                                        className="border-b-2 border-gray-500 bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline w-11/12" />)}
                                <input
                                    type="checkbox"
                                    className='justify-self-end 1/12'
                                    onMouseEnter={e => { toast("Check it to show password", { position: "top-right" }) }}
                                    onMouseLeave={e => { toast.dismiss() }}
                                    onChange={e => setShowPass(!showPass)}
                                />
                            </div>
                        </div>

                        {/* 3rd row phone number*/}
                        <div className='flex flex-col md:flex-row justify-between'>

                            <div className={`md:w-1/2 mx-5 my-4 flex`}>
                                <input id="phone" type="phone" name='phone' placeholder="Enter your mo. number:"
                                    className="border-b-2 border-gray-500 w-11/12 bg-white px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                                <div className='w-1/12'>
                                    <div className='relative w-full h-4 mt-1'>
                                        <NextImage src="/India.svg" alt="India"
                                            fill={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`md:w-1/2 mx-5 my-4 flex`}>
                                <div className='flex mx-4'>
                                    <input id="student" type="radio"
                                        onChange={handleWho}
                                        name='who' value={"student"}
                                        className="w-full py-1 px-3 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer" />
                                    <label className='text-md ml-1 text-gray-900 hover:cursor-pointer' htmlFor='student'>Student</label>
                                </div>
                                <div className='flex mx-4'>
                                    <input id="seller" type="radio"
                                        onChange={handleWho}
                                        name='who' value={"seller"}
                                        className="border-b-2 border-gray-500 w-full bg-white px-3 text-black leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer" />
                                    <label className='text-md ml-1 text-gray-900 hover:cursor-pointer' htmlFor='seller'>Seller</label>
                                </div>
                            </div>
                        </div>

                        {isSeller && <div className='w-full flex items-center justify-center mt-4 font-bold text-lg text-gray-500'>
                            Bank details
                        </div>}

                        {
                            isSeller && <div className='flex flex-col md:flex-row justify-between'>

                                <div className={`md:w-1/2 mx-5 my-4`}>
                                    <input id="account" type="text" name='account' placeholder="Enter account number"
                                        className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                                </div>

                                <div className={`md:w-1/2 mx-5 my-4`}>
                                    <input id="ifsc" type="text" name='ifsc' placeholder="Enter ifsc code"
                                        className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                            </div>
                        }

                        {isSeller && <div className='w-full flex items-center justify-center mt-4 font-bold text-lg text-gray-500'>
                            Address details
                        </div>}

                        {/* 4th row state district */}
                        {isSeller ? <div className='flex flex-col md:flex-row justify-between'>
                            <div className={`md:w-1/2 mx-5 my-4`}>
                                <select id="state" name="state" onChange={handleStateChange} className={`border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`} >
                                    <option value="">Select State</option>
                                    {states.map(state => (
                                        <option key={state.toLowerCase()} value={state.toLowerCase()} className={``} >{state}</option>
                                    ))}
                                </select>
                            </div>


                            <div className={`md:w-1/2 mx-5 my-4`}>
                                <select id="district" name="district" className={`border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline`} >district
                                    <option value="">Select District</option>
                                    {districts[mstate]?.map(district => (
                                        <option key={district.toLowerCase()} id='district' value={district.toLowerCase()} className={``} >{district}</option>
                                    ))}
                                </select>
                            </div>
                        </div> : ""}


                        {/* 5th row address */}
                        {isSeller ? <div className='flex flex-col md:flex-row justify-between'>

                            <div className={`md:w-full mx-5 my-4`}>
                                <input id="address" type="text" name='address' placeholder="Enter your address"
                                    className="border-b-2 border-gray-500 w-full bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" />
                            </div>

                        </div> : ""}


                        {/* 6th row about */}
                        <div className={`mx-5`}>
                            {/* <label htmlFor="about" className='block text-gray-700 text-sm font-bold my-1'>Enter about yourself</label> */}
                            <textarea
                                name="about"
                                placeholder="Enter something about yourself"
                                id=""
                                cols="15"
                                rows="2"
                                className={`border-b-2 border-gray-500 w-full bg-white py-1 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                            />
                        </div>

                        {/* 7th row */}
                        <div className={`flex flex-row w-full justify-center items-center text-gray-700 pb-2 pt-4 ${haveOtp ? "hidden" : ""}`}>
                            <input className='bg-sky-900 text-sm py-[6px] text-white hover:bg-sky-950 px-[20px] rounded-md'
                                type='submit'
                                id="sendOtp"
                                value={"Rgister"} />
                        </div>

                    </form>

                    {
                        haveOtp ? (
                            <form action={otpHandler}
                            >
                                <div className='flex flex-row w-full justify-center items-center text-gray-700 py-2'>
                                    {/* <div className='bg-gray-700 h-[1px] w-1/4'><br /></div> */}
                                    <div className='text-lg'>Enter otp</div>
                                    {/* <div className='bg-gray-700 h-[1px] w-1/4'><br /></div> */}
                                </div>

                                <div className='flex flex-row w-full justify-center text-lg items-center text-gray-700 pb-3'>
                                    <input id="otp" type="text" name='otp'
                                        className="border-b-2 border-gray-500 w-18 mx-8 bg-white py-1 px-3 text-black leading-tight focus:outline-none focus:shadow-outline text-center" />
                                </div>
                                <div className='flex flex-row w-full justify-center items-center text-gray-700 py-2'>
                                    <button className='bg-sky-900 text-sm py-[5px] text-white hover:bg-sky-950 px-2 rounded-md'
                                        type='submit'
                                    >Verify</button>
                                    {resend > 0 ? <div className='text-sm py-[5px] text-sky-700 px-2'
                                    >Resend otp in {resend}s</div> : <div className='text-sm py-[5px] text-sky-600 px-2 rounded-md hover:underline hover:cursor-pointer' onClick={sendOtp}
                                    >Resend otp</div>}
                                </div>

                            </form>) : (
                            <><div className='flex flex-row w-full justify-center items-center text-gray-700 py-2'>
                                <div className='bg-gray-700 h-[1px] w-1/3'><br /></div>
                                <div className='mx-7'>or</div>
                                <div className='bg-gray-700 h-[1px] w-1/3'><br /></div>
                            </div>

                                <div className='flex flex-row w-full justify-center space-x-1 text-sm items-center text-gray-700 pb-3'>
                                    {/* <TelegramLogin /> */}
                                    <div>Already registered ? </div>
                                    <button className='text-sky-600 hover:underline' onClick={handleRoute} id={`/sign-in`}>Login</button>

                                </div></>)}
                </div>
            </div>
        </section>
    )
}

export default Signup