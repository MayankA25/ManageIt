import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\WorkVault\\server\\.env" });

export const connectDB = async()=>{

    const MONGO_URI = process.env.MONGO_URI as string

    mongoose.connect(MONGO_URI, {
        dbName: 'RecruitIt'
    }).then(()=>{
        console.log("Connected To Mongo DB...");
    }).catch((e)=>{
        console.log(e);
        console.log("Error While Connect To Mongo DB.");
        process.exit(1);
    })
}