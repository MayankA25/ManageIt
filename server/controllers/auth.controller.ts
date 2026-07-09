import { Request, Response } from "express";
import { oauthClient } from "../lib/oauthClient";
import { getPayload } from "../lib/oauth";
import { User } from "../models/User";
import { createSession } from "../utils/session";
import { cookieOptions } from "../config/cookie";
import { hashPassword } from "../utils/hash";
import { generateOtp } from "../utils/otp";
import { mailQueue } from "../lib/queue";
import { connection } from "../lib/redis";

// OAuth2.0 Login
export const googleLogin = async (req: Request, res: Response) => {
  const oauthUrl = oauthClient.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "profile", "email"],
  });

  res.redirect(oauthUrl);
};

export const callback = async (req: Request, res: Response) => {
  console.log("Params: ", req.query);

  try {
    const code = req.query.code as string;

    const payload = await getPayload(code);

    console.log("Payload: ", payload);

    if (!payload.email) {
      return res.status(400).json({ msg: "No Email Found", success: false });
    }

    let foundUser = await User.findOne({ email: payload.email });

    if (!foundUser) {
      const newUser = new User({
        name: payload.name,
        email: payload.email,
        profilePic: payload.profilePic,
        type: "oauth",
      });

      const savedUser = await newUser.save();

      console.log("Saved User: ", savedUser);

      foundUser = savedUser;
    }

    const user = {
      ...foundUser,
      _id: foundUser._id.toString(),
    };

    const IPAddress = req.ip as string;
    const device = req.headers["user-agent"] as string;

    const sessionId = await createSession(user._id, IPAddress, device);

    console.log("Session Id: ", sessionId);

    res.cookie("sid", sessionId, {
      ...cookieOptions,
      maxAge: 60000,
    });

    // return res
    //   .status(200)
    //   .json({ msg: "Logged In Successfully", success: true });

    console.log("Headers: ", res.getHeaders());
    return res.status(200).redirect("http://localhost:5000/");
  } catch (e) {
    console.log("Error: ", e);

    return res
      .status(500)
      .json({ msg: "Internal Server Error", success: false });
  }
};

export const check = async (req: Request, res: Response) => {
  // return res.status(200).redirect("http://localhost:3000/")

  return res.status(200).json({ msg: "Authenticated", success: true });
};

// Credentials Login

export const checkEmail = async(req: Request, res: Response)=>{
  const { email } = req.query;

  try{

    const foundUser = await User.findOne({ email: email as string });

    return res.status(200).json({ found: !!foundUser, success: true })

  }catch(e){
    console.log(e);

    return res.status(500).json({ msg: `Error While Checking For ${email}`, success: false })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      return res
        .status(400)
        .json({ msg: "Invalid Credentials", success: false });
    }

    const hashedPassword = hashPassword(password);

    if (foundUser.password !== hashedPassword) {
      return res
        .status(400)
        .json({ msg: "Invalid Credentials", success: false });
    }

    const IPAddress = req.ip as string;
    const device = req.headers["user-agent"] as string;

    const sessionId = await createSession(
      foundUser._id.toString(),
      IPAddress,
      device,
    );

    res.cookie("sid", sessionId, {
      ...cookieOptions,
      maxAge: 60 * 1000,
    });

    res.status(200).json({ msg: "Logged In Succesfully", success: true });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", success: false });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  const { recipientEmail } = req.body;
  try {
    const generatedOtp = generateOtp();

    await connection.set(`otp:${recipientEmail}`, `${hashPassword(`${generatedOtp}`)}-true`, "EX", 60 * 5);

    const subject = "Email Verification";
    const message = `<div style="font-family: Arial, sans-serif;">
  <h2>Verify your email</h2>

  <p>Use the code below to complete your signup:</p>

  <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">
    ${generatedOtp}
  </div>

  <p>This code expires in <b>5 minutes</b>.</p>

  <p style="color: gray;">
    If you didn’t request this, ignore this email.
  </p>
</div>`;

    const cc = [""];
    const bcc = [""];

    mailQueue.add(
      "sendEmailFromApp",
      {
        recipient: recipientEmail,
        subject: subject,
        message: message,
        cc: cc,
        bcc: bcc,
      },
      {
        removeOnComplete: {
          count: 100,
        },
        removeOnFail: {
          count: 100,
        },
      },
    );

    return res
      .status(200)
      .json({
        msg: `OTP has been sent on email: ${recipientEmail}`,
        success: true,
      });
  } catch (e) {
    console.log("Error While Sending OTP.");
    console.log(e);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", success: false });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    const otpData = await connection.get(`otp:${email}`);
    
    const storedOtp = otpData?.split('-')[0];
    console.log("Stored OTP: ", storedOtp);
    const valid = otpData?.split('-')[1];

    if (!storedOtp || valid == 'false') {
      return res.status(400).json({ msg: "OTP Expired", success: false });
    }

    if (storedOtp != hashPassword(`${otp}`)) {
      return res.status(400).json({ msg: "Invalid Code", success: false });
    }

    await connection.set(`verifiedEmail:${email}`, "true", "EX", 10 * 60);
    await connection.set(`otp:${email}`, `${hashPassword(otp)}-false`)

    return res
      .status(200)
      .json({ msg: "Email Verified Sucessfully", success: true });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ msg: "Error While Verifying OTP.", success: false });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const verifiedEmail = await connection.get(`verifiedEmail:${email}`);

    if (!verifiedEmail || verifiedEmail != "true") {
      return res
        .status(400)
        .json({ msg: "Email Not Verified", success: false });
    }

    const foundEmail = await User.findOne({ email: email });

    const allUser = await User.find();
    console.log("Users: ", allUser);

    if (foundEmail)
      return res
        .status(400)
        .json({ msg: "Email Already Exists.", success: false });

    const hashedPassword = hashPassword(password);

    console.log("Hashed Password: ", hashedPassword);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      type: "credentials",
    });

    const savedUser = await newUser.save();

    console.log("Saved User: ", savedUser);

    return res.status(200).json({
      msg: "User Registered Successfully",
      success: true,
      user: savedUser,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", success: false });
  }
};
