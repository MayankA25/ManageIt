"use client";
import { ArrowRight, Loader2 } from "lucide-react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useCheckEmail } from "@/hooks/useAuth";
import { checkUserEmail } from "@/lib/schema/authUserSchema";
import { useEffect, useState } from "react";
import * as z from "zod";

interface Err {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
}

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  
  const [errors, setErrors] = useState<Err>({
    firstName: [],
    lastName: [],
    email: [],
  });
  const { mutate, isError, error, isPending } = useCheckEmail();

  const continueToVerification = () => {
    const { success, data, error } = checkUserEmail.safeParse(formData);

    console.log("Success: ", success);
    console.log("Data: ", data);

    if (!success) {
      console.log("Error: ", z.flattenError(error).fieldErrors);
      setErrors(z.flattenError(error).fieldErrors);
      return;
    }

    mutate(formData.email, {
      onSuccess: (data)=>{
        console.log("Success: ", data);

        if(data.found){
          setErrors({ ...errors, email: ["Email Already Exists"] });
        }
        else{
          router.push("/register/verify");
        }
      },
      onError: (err)=>{
        console.log("Error: ", err);
      }
    });

    // router.push("/register/verify");
  };

  useEffect(()=>{
    console.log("Error From Hook: ", error);
  }, [error])

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full flex-col gap-4"
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="relative flex flex-col justify-center">
          <span className="absolute -top-5 left-0 z-10 mt-0.5 px-1 text-xs text-red-400">
            {errors.firstName}
          </span>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={(e) => {
              setFormData({
                ...formData,
                firstName: e.target.value ? e.target.value : "",
              });
            }}
            className={`relative rounded-lg bg-neutral-900 px-3 py-3 text-sm font-bold outline-0 transition-all duration-200 focus:bg-neutral-950 ${errors.firstName && errors.firstName?.length > 0 && "border border-red-400"}`}
          />
        </div>
        <div className="relative flex flex-col justify-center">
          <span className="absolute -top-5 left-0 z-10 mt-0.5 px-1 text-xs text-red-400">
            {errors.firstName}
          </span>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => {
              setFormData({
                ...formData,
                lastName: e.target.value ? e.target.value : "",
              });
            }}
            className={`relative rounded-lg bg-neutral-900 px-3 py-3 text-sm font-bold outline-0 transition-all duration-200 focus:bg-neutral-950 ${errors.lastName && errors.lastName?.length > 0 && "border border-red-400"}`}
          />
        </div>
      </div>
      <div className="relative flex flex-col justify-center gap-1">
        <span className="absolute -top-4.5 left-0 z-10 mt-0.5 px-1 text-xs text-red-400">
            {errors.email}
          </span>
        {/* <h1 className="text-md px-1 font-bold">Email</h1> */}
        {/* <span className='absolute left-0'><Mail/></span> */}
        <input
          type="email"
          name="email"
          placeholder={"Enter Email"}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value ? e.target.value : "",
            });
          }}
          className={`rounded-lg bg-neutral-900 px-3 py-3 text-sm font-bold outline-0 transition-all duration-200 focus:bg-neutral-950 ${errors.email && errors.email?.length > 0 && "border border-red-400 placeholder:text-red-400"}`}
        />
      </div>
      {/* <div className="relative flex flex-col justify-center gap-1">
        <input
          type={`${showPass ? "text" : "password"}`}
          placeholder="Enter Password"
          className="rounded-lg bg-neutral-900 px-3 py-3 text-sm font-bold outline-0 transition-all duration-200 focus:bg-neutral-950"
        />
        {showPass ? (
          <EyeOff
            className="top[50%] absolute right-4 size-5 cursor-pointer text-neutral-300"
            onClick={() => {
              setShowPass(false);
            }}
          />
        ) : (
          <Eye
            className="top[50%] absolute right-4 size-5 cursor-pointer text-neutral-300"
            onClick={() => {
              setShowPass(true);
            }}
          />
        )}
      </div> */}

      <Button disabled={isPending} onClick={continueToVerification}>
        <div className="flex items-center justify-center gap-2">
          {isPending ? <span> <Loader2 className="animate-spin size-5"/> </span> : <span>Continue</span>}{" "}
          {!isPending && <span>
            <ArrowRight className="size-5" />
          </span>}
        </div>
      </Button>
    </form>
  );
}
