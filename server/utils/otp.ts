export const generateOtp = ()=>{
    const otp = Math.floor(Math.random() * Math.pow(10, 6));
    return otp;
}
