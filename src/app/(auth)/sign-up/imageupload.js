"use server"
import axios from 'axios';
import FformData from 'form-data';
import * as fs from 'fs';
import { Readable } from 'stream';
/**
 * @param {FormData} f
 * @returns {Promise<{ mid: number, cid: number, error: string }>}
 */
export async function imageupload(f) {
    try {

        const url = 'https://postimg.cc/json';

        const argu = {
            token: '61aa06d6116f7331ad7b2ba9c7fb707ec9b182e8', 
            upload_session: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            numfiles: '1',
            upload_referer: 'https://getsharex.com/'
        };

        let file = f.get("photo");
        const fileBuffer = await file.arrayBuffer();
        const fileStream = new Readable();
        fileStream.push(Buffer.from(fileBuffer));
        fileStream.push(null);

        const parts = file.name.split('.');
        let extension;
        if (parts.length > 1)
            extension = parts[parts.length - 1];
        else
            return { "error": "File type must be jpg jpeg png" }

        const form = new FformData();
        form.append('file', fileStream, "sid." + extension);
        Object.entries(argu).forEach(([key, value]) => {
            form.append(key, value);
        });

        const response = await axios.post(url, form, {
            headers: {
                ...form.getHeaders()
            }
        });

        let pres = response.data;

       
        if(!pres?.status){
            return { "error": "Error in saving image please contact us or do after some time" }
        }
        let urlA = pres?.url.split("/")
        let urld = `https://i.postimg.cc/${urlA[urlA.length - 2]}/sid.${extension}`

       
        return {"url": pres.url, urld}

    } catch (error) {
        console.error('Error uploading image:', error.message);
        return { error: 'Error uploading image' };
    }
}
