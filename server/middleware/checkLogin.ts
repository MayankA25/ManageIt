import { NextFunction, Request, Response } from "express";
import { Session } from "../models/Session";
import { getHashedUser } from "../utils/session";
import { Types } from "mongoose";

interface IUser{
    _id: string;
    name: string;
    email: string;
    profilePic: string
}

interface ISession {
    user: Types.ObjectId;
    device: string;
    ipAddress: string;
    lastActiveAt: Date;
    expiresAt: Date
};

interface PopulatedSession {
    user:  IUser;
    device: string;
    ipAddress: string;
    lastActiveAt: Date;
    expiresAt: Date
};

export const checkLogin = async(req: Request, res: Response, next: NextFunction)=>{

    const cookies = req.cookies;

    console.log("Cookies: ", cookies);

    const sid = cookies.sid;

    if(!sid) return res.status(401).json({ msg: "Unauthenticated", success: false });

    const sessionId = sid.split(".")[0];
    const hashedUser = sid.split(".")[1];

    const foundSession: ISession | PopulatedSession | null = await Session.findById(sessionId).populate('user');

    if(!foundSession || foundSession.user instanceof Types.ObjectId){
        return res.status(401).json({ msg: "Unauthenticated", success: false });
    }

    const foundUser: IUser = foundSession.user;

    console.log("Found Session: ", foundSession);

    if(!foundUser){
        return res.status(401).json({ msg: "Unauthenticated", success: false });
    }

    const user = {
        _id: foundUser._id?.toString(),
        name: foundUser.name,
        email: foundUser.email,
        profilePic: foundUser.profilePic
    }

    const hashedFoundUser = getHashedUser(user._id);

    console.log("Hashed User: ", hashedFoundUser)

    if(hashedFoundUser !== hashedUser){
         return res.status(401).json({ msg: "Unauthenticated", success: false });
    }

    return next();

}