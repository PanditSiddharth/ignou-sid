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
  let gbl;
  const fetchMongo = async () => {
    if (mongoose.connection?.readyState !== 1) {
      console.log("connecting...")
      await connect();
    }

    const studentid = req.params?.student;
    if (studentid) {
      const student = await Student.findOne({ studentid });

      if (student) {
        const st = student._doc;
        decoded = { studentid: st.studentid, name: st.name, photo: st.photo, about: st.about, auth: false }
      }
    }
  }

  if (token) {
    decoded = jwt.verify(token, process.env.JWT_TOKEN)
    gbl = JSON.parse(JSON.stringify(decoded))
    if (decoded?.studentid == req?.params?.student) {
      
    }
    else
      await fetchMongo()

  } else {
    await fetchMongo()
  }

  return (decoded ? <SellerClient login={JSON.parse(JSON.stringify(decoded))} gbl={gbl} /> : <PageNotFound />)
};

export default StudentServer; 