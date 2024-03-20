"use server"
import connect from '@/connect';
import Student from '@/modals/student';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const server = async (e) => {
    try {

        if (mongoose.connection?.readyState !== 1) {
            console.log("connecting...")
            await connect();
        }

        if (e?.token) {
            const decoded = jwt.verify(e?.token, process.env.NEXTAUTH_SECRET);
            if (!decoded || !decoded.email)
                return { error: "Something went wrong!" }

            const student = await Student.findOne({ email: decoded.email })
            if (!student)
                return { error: "Something went wrong!" }
            const stdt = JSON.parse(JSON.stringify(student))
            const token = jwt.sign(stdt, process.env.JWT_TOKEN)
            
            return {...stdt, token};
        }

    } catch (err) {
        console.log(err)
        return { error: err.message }
    }
}

export default server