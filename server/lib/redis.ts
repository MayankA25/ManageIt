import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\RecruitIt\\server\\.env" })


let redis;

if(!redis){
    redis = new IORedis(process.env.REDIS_URI as string, {
        maxRetriesPerRequest: null
    });
}

export const connection = redis;