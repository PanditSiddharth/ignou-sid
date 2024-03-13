"use server"
import connect from "@/connect";
import mongoose from "mongoose";
import FformData from "form-data"
import { getBotInstance } from "@/app/api/telegram/route";
import axios from "axios";
import Product from "@/modals/products";

export async function saveData(e) {
  try {
    if (!e)
      return ({ error: "Please fill fields" })

    if (mongoose.connection?.readyState !== 1) {
      console.log("connecting...")
      await connect();
    }

   const data = await Product.create(e)
   if(!data)
    return {error: "Error saving product data"}
 
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(e);
    console.error(error);
    return { "error": error.message }
  }

}

export const authenticated = async (e) => {
  try {
    if (!e)
      return ({ error: "Please fill fields" })

    if (mongoose.connection?.readyState !== 1) {
      console.log("connecting...")
      await connect();
    }

    let user = await User.updateOne({ userid: e.userid }, { $set: { authorized: true } })

    return true
  } catch (error) {
    return false
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

export async function saveThumb(req) {
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
    return ({ error: 'Failed to download or upload file' });
  }
}


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

    const bot = await getBotInstance();
    const tgRes = await bot.telegram.sendDocument(-1002016229959, { source: fileBuffer, filename: req.name },
      {
        caption: `
SellerId: ${req.login.sellerid}
ProductId: ${req.productid}
SellerName: ${req.login.name}
`
      })
    
    return { cid: tgRes.chat.id, mid: tgRes.message_id, filename: req.name, fileid: tgRes.document.file_id, downloadid: tgRes.document.file_unique_id };
  } catch (error) {
    console.error('Error:', error);
    return ({ error: 'Failed to download or upload file' });
  }
}
