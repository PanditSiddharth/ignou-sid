"use server"
import jwt from "jsonwebtoken"; 
import SellerClient from "./student"; 
import { cookies } from "next/headers"; 
import mongoose from "mongoose"; 
import connect from "@/connect" 
import PageNotFound from "@/components/pagenotfound"; 
import Student from "@/modals/student"; 

const StudentServer = async (req) => { 
  const token = cookies().get('token')?.value; 

  let decoded; 
  if(token){ 
    decoded = jwt.verify(token, process.env.JWT_TOKEN) 
    
    if(decoded?.studentid) 
    decoded = { ...decoded, auth: true} 
  } 

  else { 
    if (mongoose.connection?.readyState !== 1) { 
      console.log("connecting...") 
      await connect(); 
    } 
 
    const studentid = req.params?.student; 
    if(studentid){ 
      const student = await Student.findOne({ studentid }); 

      if(student){ 
        const st = student._doc; 
        decoded = {studentid: st.studentid, name: st.name, photo: st.photo, about: st.about, auth: false} 
      } 
    } 
  } 

  return (decoded ? <SellerClient login={JSON.parse(JSON.stringify(decoded))} /> : <PageNotFound />) 
}; 

export default StudentServer; 