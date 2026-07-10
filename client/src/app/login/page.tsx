import GoogleLogin from "@/components/GoogleLogin/GoogleLogin";
import LoginForm from "@/components/LoginForm/LoginForm";
import { LogIn } from "lucide-react";
import React from "react";

export default function Login() {
  return (
    <div className="m-auto flex w-[50%] lg:w-[25%] items-center justify-center rounded-xl bg-neutral-800 px-7 py-10 shadow-xl">
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col items-center justify-center">
          <span className="rounded-2xl bg-neutral-300 p-3 text-black shadow-xl">
            <LogIn className="size-5" />
          </span>
          <div className="my-5 flex flex-col justify-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Sign in With Email</h1>
            <p className="text-sm font-semibold text-neutral-400">
              Sign in to access your organization, manage employees, collaborate
              with your team, and handle workforce operations seamlessly.
            </p>
          </div>
        </div>

        <LoginForm/>

        <div className="flex items-center gap-3 text-neutral-500 text-sm my-3">
          <hr className="w-[50%]" />
          <span>OR</span>  
          <hr className="w-[50%]" />
        </div>   
        <GoogleLogin/>
      </div>
    </div>
  );
}
