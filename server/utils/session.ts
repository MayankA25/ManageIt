import crypto from "crypto";
import dotenv from "dotenv";
import { Session } from "../models/Session";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\RecruitIt\\server\\.env" });


export const getHashedUser = (userId: string): string=>{
    const signedUser = crypto.createHmac('sha256', process.env.CRYPTO_SECRET as string).update(userId).digest('hex');

    return signedUser;
}

export const createSession = async(userId: string, ip: string, device: string)=>{

    // const signedSessionId = crypto.createHmac("sha256", process.env.CRYPTO_SECRET as string).update(JSON.stringify(user)).digest('hex');
    const signedUser = getHashedUser(userId);

    const newSession = new Session({
        user: userId,
        ipAddress: ip,
        device: device,
        lastActiveAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 1000)
        
    });

    const savedSession = await newSession.save();

    // const signedSessionId = signSessionId(savedSession.sessionId);

    const sid = `${savedSession._id}.${signedUser}`;

    console.log("Sid: ", sid);

    return sid;

}