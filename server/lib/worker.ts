import { Worker } from "bullmq";
import { sendMailFromApp } from "./email";
import { connection } from "./redis";



const worker = new Worker("emails", async(job)=>{
    console.log("Worker Running...");

    const { recipient, subject, message, cc, bcc } = job.data;

    console.log("Sending Mail To: ", recipient);

    await sendMailFromApp(recipient, subject, message, cc, bcc);
}, { connection: connection });

worker.on("completed", ()=>{
    console.log("Email Sent Successfully [Worker]")
})

worker.on("failed", ()=>{
    console.log("Failed to send email [Worker]")
})