import { otphtml } from "./otphtml";

const nodemailer = require("nodemailer");

export async function sendMail(data){
try{
let { createTransport } = nodemailer;

if(!data || !data?.email || !data?.emailType || !data?.auth || !data?.otp)
return ({message: "Auth token is required"})

if(data.auth != process.env.JWT_TOKEN)
return ({message: "Wrong token"})

const { email, emailType, otp } = data;

  let transporter;
  if(process.env.NODE_ENV == "development"){
   transporter = createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'antoinette65@ethereal.email',
          pass: '4upGszGRHjwDegt72n'
      }
  });
} else {
    transporter = createTransport({
        host: 'smtppro.zoho.in',
        port: 587,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });
}

await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to send otp");
            resolve(success);
        }
    });
});

const mailOptions = {
    from:  `"IGNOU-X" <${process.env.USER_MAIL}>`, // sender address
    to: email, 
    subject: "Your OTP for ignou-x", // Subject line
    html: otphtml(otp, emailType)
   };

   await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });
});

console.log("yes api called")

return {otp}

} catch(err){
    console.log(err)
    return { message: err.message }
}
};