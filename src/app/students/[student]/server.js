"use server"
import connect from "@/connect";
import Student from "@/modals/student"
import mongoose from "mongoose";

export const deleteId = async (e) => {
    try {
        if (mongoose.connection?.readyState !== 1) {
            console.log("connecting...")
            await connect();
          }

        let res = await Student.deleteOne({ studentid: e.studentid })
        if (res.deletedCount === 0) {
            res = await Student.deleteOne({ email: e.email })
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

