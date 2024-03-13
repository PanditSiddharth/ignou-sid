"use server"
import jwt from "jsonwebtoken";
import SellerClient from "./seller";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import connect from "@/connect"
import Seller from "@/modals/seller";
import PageNotFound from "@/components/pagenotfound";


const SellerServer = async (req) => {
  const token = cookies().get('token')?.value;
  // console.log(token, process.env.JWT_TOKEN);

  let decoded;
  if(token){
    decoded = jwt.verify(token, process.env.JWT_TOKEN)
    
    if(decoded.sellerid)
    decoded = { ...decoded, auth: true}
  }
  else {
    if (mongoose.connection?.readyState !== 1) {
      console.log("connecting...")
      await connect();
    } 
    const sellerid = req.params?.seller[0];
    if(sellerid){
      const seller = await Seller.findOne({sellerid})
      if(seller)
      decoded = {...decoded, auth: false}
    }
  }

  return (decoded ? <SellerClient login={decoded} /> : <PageNotFound />)
};

export default SellerServer