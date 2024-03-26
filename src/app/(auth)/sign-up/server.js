"use server"
import connect from "@/connect";
import Seller from "@/modals/seller"
import Student from "@/modals/student";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import axios from "axios";
import FformData from 'form-data';
import { Readable } from 'stream';
const fs = require('fs');

/**
* Represents a user object.
* @typedef {Object} User
* @property {string} name - The name of the user.
* @property {string} email - The email address of the user.
* @property {number} age - The age of the user.
* @property {string} password - The password of the user.
* @property {string} cpassword - The cpassword of the user.
* @property {string} state - The state of the user
* @property {string} district - The district of the user
* @property {string} phone - The phone number of the user
* @property {string} address - The address of the user
* @property {{"url": string | number, "urld": number}} photo - Information about the user's photo.
* @property {string} who - Indicates the role of the user.
*/

/**
 * Ye sever ka code hai
 * @param {User} e
 */
export async function server(e) {
  try {
    if (!e)
      return ({ error: "Please fill fields" })

    if (mongoose.connection?.readyState !== 1) {
      console.log("connecting...")
      await connect();
    }

    // create new user
    if (e.who == "seller") {
      const { name, email, password, state, district, address, phone, who, photo, about, userid, account, ifsc } = e;
      let user = {
        sellerid: userid,
        name,
        email: email?.toLowerCase()?.trim(),
        password,
        state,
        account: account?.trim()?.toUpperCase(),
        ifsc: ifsc?.trim()?.toUpperCase(),
        district,
        address,
        phone,
        photo,
        about,
        date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
      }
      let nuser = await Seller.create(user)
      if (!nuser)
        return ({ "error": "Something went wrong" })

      let token = jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: '30d' })
      return { "message": "Successfull", "token": token }

    } else {
      const { name, email, password, photo, about } = e;
      const user = {
        studentid: e.userid,
        name,
        email: email?.toLowerCase()?.trim(),
        password,
        photo,
        about,
        date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
      }
      const nuser = await Student.create(user)
      if (!nuser)
        return ({ "error": "Something went wrong" })

      let token = jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: "20d" })
      return { "message": "Successfull", "token": token }
    }

  } catch (error) {
    console.error(error);
    return { "error": error.message }
  }
}

export const savePhoto = async (e) => {
  try {
    let file = e?.get("file");
    const fileBuffer = await file.arrayBuffer();
    const fileStream = new Readable();
    fileStream.push(Buffer.from(fileBuffer));
    fileStream.push(null);

    const form = new FformData();
    form.append('image', fileStream, file.name);
    form.append('key', process.env.IMGBB);
    form.append('name', file.name)

    const res = await axios.post("https://api.imgbb.com/1/upload", form, {
      headers: {
        ...form.getHeaders()
      }
    });

    const myPhoto = res.data;
    const photo = makePhoto(myPhoto)

    return photo;
  } catch (error) {
    return { error: error.message }
  }
}

export const makePhoto = (photo) => ({
  id: photo.data.id,
  title: photo.data.title,
  time: photo.data.time,
  url: photo.data.url,
  thumb: photo.data.thumb.url,
  delete_url: photo.data.delete_url,
  medium: photo.data.medium?.url || ""
})
// Serverless function handler

export async function saveFile(req) {
  try {
    const downloadableLink = req.link; // Get the download URL from query parameters

    // Download the file as a buffer
    const response = await axios({
      url: downloadableLink,
      method: 'GET',
      responseType: 'arraybuffer'
    });

    const fileBuffer = response.data;

    // Create FormData and append the image buffer
    const formData = new FformData();
    formData.append('image', fileBuffer, req.name);
    formData.append('name', req.name)
    formData.append('key', process.env.IMGBB)
    // Upload to ImgBB API
    const uploadResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        ...formData.getHeaders()
      }
    });

    const photo = makePhoto(uploadResponse.data)
 
    return photo;
  } catch (error) {
    console.error('Error:', error);
   return ({ error: 'Failed upload file' });
  }
}
