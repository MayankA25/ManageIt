import { Queue } from "bullmq";
import { connection } from "./redis";

export const mailQueue = new Queue("emails",{
    connection
});