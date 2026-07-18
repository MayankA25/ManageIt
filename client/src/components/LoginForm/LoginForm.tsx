"use client";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  return (
    <form action="" className="flex w-full flex-col gap-3">
      <div className="relative flex flex-col justify-center gap-1">
        {/* <h1 className="text-md px-1 font-bold">Email</h1> */}
        <span className="absolute left-3 bg-red-500 z-50">
          <Mail className="size-5 text-neutral-400 px-11" />
        </span>
        <Input type="text" name="email" placeholder="Email" onChangeHandler={()=>{}} />
      </div>
      <div className="relative flex flex-col justify-center gap-1">
        {/* <h1 className="text-md px-1 font-bold">Password</h1> */}

        <span className="absolute left-3">
          <Lock className="size-5 text-neutral-400" />
        </span>

        <input
          type={`${showPass ? "text" : "password"}`}
          placeholder="Enter Password"
          className="rounded-lg bg-neutral-900 px-11 py-3 text-sm font-bold outline-0 transition-all duration-200 focus:bg-neutral-950"
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
      </div>
      <Button>
        <p>Login</p>
      </Button>
    </form>
  );
}
