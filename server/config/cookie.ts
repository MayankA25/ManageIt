import { CookieOptions } from "express";
import dotenv from "dotenv";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\RecruitIt\\server\\.env" })


export const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
}