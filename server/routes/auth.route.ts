import { Router } from "express";
import { callback, check, checkEmail, googleLogin, login, register, sendOtp, verifyOtp } from "../controllers/auth.controller";
import { checkLogin } from "../middleware/checkLogin";


const authRouter = Router();

authRouter.get('/google', googleLogin);
authRouter.get("/callback", callback);

authRouter.get("/check-email", checkEmail);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post('/register', register);
authRouter.post("/login", login);

authRouter.get('/check', checkLogin, check);

export default authRouter;