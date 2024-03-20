"use server"
import mongoose from "mongoose";
import connect from "@/connect";
import Tag from "@/modals/tags";
import Bachelor from "@/modals/bachelor";
import Master from "@/modals/master";

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
        let categories;
        if (activeTab == 0) {
            categories = (await Bachelor.find().skip(skip).limit(pageSize)).map((e) => ({ name: e.name, description: e.description || e.name, thumbnail: e?.thumbnail }))
        } else if (activeTab == 1) {
            categories = (await Master.find()
                .skip(skip).limit(pageSize)).map((e) => ({ name: e.name, description: e.description || e.name, thumbnail: e?.thumbnail })).slice(1)
        } else if(activeTab == 2){
            categories = (await Tag.find().sort({ createdAt: 1 }).skip(skip).limit(pageSize)).map((e) => ({ name: e.name, description: e.description || e.name, thumbnail: e?.thumbnail }))
        }
        // console.log(categories)
        // Optionally count the total number of documents
        const totalCount = await Tag.countDocuments();
        
        // Calculate the total number of pages
        const totalPages = Math.ceil(totalCount / pageSize);
     
        if(!categories) return "";
        return JSON.parse(JSON.stringify({
            categories,
            currentPage: pageNumber,
            totalPages,
            pageSize,
            totalCount,
            found: categories.length
        }));
    } catch (error) {
        console.error('Pagination error:', error);
        return { error: error.message }
    }
};
