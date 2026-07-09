import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\RecruitIt\\server\\.env" })

export const appTransporter = async()=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: true,
        auth: {
            user: process.env.GOOGLE_APP_USER,
            pass: process.env.GOOGLE_APP_PASSWORD
        },
        pool: true,
        maxConnections: 5,
        rateLimit: 5
    });

    return transporter;
}

