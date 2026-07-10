import { axiosClient } from "@/lib/axios/axios"


export const checkEmail = async(email: string)=>{
    const response = await axiosClient.get("/auth/check-email", {
        params: {
            email: email
        }
    });

    console.log("RESPONSE: ", response);

    return response.data;

}

export const registerWithCredentials = async()=>{

}