"use server"

import Student from "@/modals/student";
import mongoose from "mongoose";
import connect from "@/connect";

// Pagination function
export const paginate = async (page, limit, activeTab) => {
    if (mongoose.connection?.readyState !== 1) {
        console.log("connecting...")
        await connect();
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * pageSize;

    try {
        // Query the database with skip and limit
        console.log(pageNumber, pageSize, activeTab)
        let students;
        if (activeTab == 0) {
            students = (await Student.find().skip(skip).limit(pageSize)).map((e) => ({ studentid: e.studentid, name: e.name, about: e?.about || "Busy in study", photo: e?.photo }))
        } else if (activeTab == 1) {
            students = (await Student.find()
                // .sort({ createdAt: -1 })
                .skip(skip).limit(pageSize)).map((e) => ({ studentid: e.studentid, name: e.name, about: e?.about || "Busy in study", photo: e?.photo })).slice(1)
        } else if(activeTab == 2){
            students = (await Student.find().sort({ createdAt: 1 }).skip(skip).limit(pageSize)).map((e) => ({ studentid: e.studentid, name: e.name, about: e?.about || "Busy in study", photo: e?.photo }))
        }
        // console.log(students)
        // Optionally count the total number of documents
        const totalCount = await Student.countDocuments();
        
        // Calculate the total number of pages
        const totalPages = Math.ceil(totalCount / pageSize);
     
        if(!students) return "";
        return JSON.parse(JSON.stringify({
            students,
            currentPage: pageNumber,
            totalPages,
            pageSize,
            totalCount,
            found: students.length
        }));
    } catch (error) {
        console.error('Pagination error:', error);
        return { error: error.message }
    }
};
