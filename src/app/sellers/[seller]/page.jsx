"use server"
import jwt from "jsonwebtoken"; 
import SellerClient from "./seller"; 
import { cookies } from "next/headers"; 
import mongoose from "mongoose"; 
import connect from "@/connect" 
import PageNotFound from "@/components/pagenotfound"; 
import Seller from "@/modals/seller"; 

const SellerServer = async (req) => { 
  const token = cookies().get('token')?.value; 

  let decoded; 
  if(token){ 
    decoded = jwt.verify(token, process.env.JWT_TOKEN) 
    
    if(decoded?.sellerid) 
    decoded = { ...decoded, auth: true} 
  } 

  else { 
    if (mongoose.connection?.readyState !== 1) { 
      console.log("connecting...") 
      await connect(); 
    } 
 
    const sellerid = req.params?.seller; 
    if(sellerid){ 
      const seller = await Seller.findOne({ sellerid }); 

      if(seller){ 
        const st = seller._doc; 
        decoded = {sellerid: st.sellerid, name: st.name, photo: st.photo, about: st.about, auth: false} 
      } 
    } 
  } 

  return (decoded ? <SellerClient login={JSON.parse(JSON.stringify(decoded))} /> : <PageNotFound />) 
}; 

export default SellerServer; 