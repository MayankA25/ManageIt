import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "../routes/auth.route";
import { connectDB } from "../lib/connectdb";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\RecruitIt\\server\\.env" });

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Hello World!" });
});
app.use("/api/auth", authRouter);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await connectDB();
  console.log("Listening On The PORT: ", PORT);
});
