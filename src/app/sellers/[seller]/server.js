"use server"
import connect from "@/connect";
import Seller from "@/modals/seller"
import mongoose from "mongoose";

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

