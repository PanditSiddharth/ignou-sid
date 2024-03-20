"use server"
import jwt from "jsonwebtoken"; 
import { cookies } from "next/headers"; 
import PageNotFound from "@/components/pagenotfound"; 
import TagClient from "./tagclient";
import Link from "next/link";
import Do from "./do";

const AddTag = async (req) => { 
  const token = cookies().get('token')?.value; 

  let decoded; 
  if(token){ 
    decoded = jwt.verify(token, process.env.JWT_TOKEN) 
    
    if(decoded?.sellerid) 
    decoded = { sellerid: decoded.sellerid, name: decoded.name} 
  } 

  return (decoded ? <TagClient  /> :  <Do /> ) 
}; 

export default AddTag; 