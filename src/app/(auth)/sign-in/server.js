"use server"
import mongoose from "mongoose";
import connect from "@/connect";
import Seller from "@/modals/seller";
import Student from "@/modals/student";
import jwt from "jsonwebtoken";

const server = async (e) => {
    try {

        if (!e){
            return ({ error: "Please fill fields" })
        }

        if (mongoose.connection?.readyState !== 1) {
            console.log("connecting...")
            await connect();
        }
        
        if(e.who == "seller"){
           const seller = await Seller.findOne({email: e.email})
           if(!seller)
               return ({ error: "User not found" })
           if(seller.password != e.password)
               return ({ error: "Password is incorrect" })
            const nSeller = JSON.parse(JSON.stringify(seller))
           
        const token = jwt.sign(nSeller, process.env.JWT_TOKEN, { expiresIn: "20d" })
        return { token, userid: nSeller.sellerid, user: nSeller }
        } else if(e.who == "student"){
            const student = await Student.findOne({email: e.email?.toLowerCase()?.trim()})
            if(!student)
                return ({ error: "User not found" })
            if(student.password!= e.password){
                if(!student.photo || student.photo.url != e.image)
                return ({ error: "Password is incorrect" })
            }
                const nStudent = JSON.parse(JSON.stringify(student))
            const token = jwt.sign(nStudent, process.env.JWT_TOKEN, { expiresIn: "20d" })
            return { token, userid: nStudent.studentid, user: nStudent }
        }

        return { error: "Something went wrong"}
    } catch (error) {
        console.erro(error);
        return { error: error.message }
    }
}

export default server;