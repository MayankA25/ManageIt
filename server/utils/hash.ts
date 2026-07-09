import crypto from "crypto";

export const hashPassword = (password: string)=>{
    const hashedPassword = crypto.createHmac('sha256', process.env.CRYPTO_SECRET as string).update(password).digest('hex');

    return hashedPassword;
}