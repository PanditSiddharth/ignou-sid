"use server"
import connect from "@/connect";
import Seller from "@/modals/seller"
import mongoose from "mongoose";
import FformData from 'form-data';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import axios from "axios";
import Product from "@/modals/products";

export const deleteId = async (e) => {
    try {
        if (mongoose.connection?.readyState !== 1) {
            console.log("connecting...")
            await connect();
        }

        let res = await Seller.deleteOne({ sellerid: e.sellerid })
        if (res.deletedCount === 0) {
            res = await Seller.deleteOne({ email: e.email })
        }

        if (res.deletedCount === 0) {
            return { error: "Something went wrong" }
        }
        else
            return res
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

export async function updateImage(e) {
    try {
        if (!e)
            return ({ error: "Some error please try again" })

        const token = cookies().get("token")?.value;
        let cookie = null;
        if (token) {
            cookie = jwt.verify(token, process.env.JWT_TOKEN)
        }


        if (!cookie || !cookie?.sellerid) {
            return { error: "You are not authorized to do this" }
        }

        if (mongoose.connection?.readyState !== 1) {
            console.log("connecting...")
            await connect();
        }

        const user = await Seller.updateOne({ sellerid: cookie?.sellerid }, { $set: { photo: e?.photo } })

        if (user && user?.updateCount === 0) {
            return { error: "Something went wrong" }
        }
        const newData = JSON.parse(JSON.stringify({ ...cookie, photo: e?.photo }));

        let newToken = jwt.sign(newData, process.env.JWT_TOKEN)
        return { "message": "Successfull", "token": newToken, user: newData }

    } catch (error) {
        console.error(error);
        return { "error": error.message }
    }
}

export async function paginate(sellerid, page = 1, pageSize = 20) {
    try {

        if(!sellerid) return { "error": "Please pass seller id"}

        if (mongoose.connection?.readyState !== 1) {
            console.log("connecting...")
            await connect();
        }


        // Calculate the number of documents to skip based on the page number and page size
        const skip = (page - 1) * pageSize;

        // Find products with pagination
        const products = await Product.find({ sellerid: sellerid })
            .skip(skip) 
            .limit(pageSize);

        return products;
    } catch (error) {
        console.error('Error finding products:', error);
        throw new Error('Failed to find products');
    }
}