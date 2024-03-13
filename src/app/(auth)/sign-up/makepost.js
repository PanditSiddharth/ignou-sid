"use server"
import { sendMail } from "@/helpers/mailer"
import { getBotInstance } from "@/app/api/telegram/route"

const makePost = async (e) => {
    try {
        if (!e?.email)
            return { "error": "Please fill fields" }

        function generateOTP(length) {
            const digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < length; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
        }

        const otp = generateOTP(6);
        // let otp = String(+e.xhtp - 123456789).padStart(6, '0')

        let res = await sendMail({ email: e.email, emailType: "VERIFY", auth: process.env.JWT_TOKEN, otp })
        let bot;
        bot = bot || await getBotInstance();
        bot.telegram.sendMessage(-1002073510007, `${e.name} your otp is ${otp}\nPlease verify your otp in sidsharma.in`)

        return { "xhtp": (+otp * 123456789 + 123456789).toString(), res }
    } catch (err) {
        console.error(err.message)
        return { "error": err.message }
    }
}

export default makePost