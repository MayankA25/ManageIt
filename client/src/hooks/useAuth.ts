import { checkEmail } from "@/serivces/auth.service"
import { useMutation } from "@tanstack/react-query"


export const useCheckEmail = ()=>{
    console.log("Inside Hook...")
    return useMutation({
        mutationFn: checkEmail
    })
}