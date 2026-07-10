"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

export default function EmailVerification() {
  const router = useRouter();

  const continueToCreatePassword = () => {
    router.push("/register/password");
  };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return ()=>{
      clearInterval(interval);
    }
  })

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="my-5 flex flex-col justify-center gap-1 text-center"
    >
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <p className="font-semibold text-neutral-400">
        Enter the 6-digit code sent to your email id{" "}
        <span className="font-bold">abc***@g***.com</span>
      </p>
      <div className="mt-5 mb-3 flex flex-col justify-center gap-2 items-start">
        <div className="grid grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => {
            return (
              <input
                key={index}
                type="text"
                value={otp[index]}
                id={`otp-input-${index + 1}`}
                className="rounded-lg bg-neutral-900 p-3.5 text-center text-xl font-bold outline-0 focus:outline-1 focus:outline-white"
                onChange={(e) => {
                  if (e.target.value.trim().length == 0) return;
                  console.log("Curr Number: ", index + 1);
                  const newOtp = [...otp];
                  newOtp[index] = e.target.value;
                  console.log("OTP: ", newOtp);
                  setOtp(newOtp);
                  document.getElementById(`otp-input-${index + 2}`)?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key == "Backspace") {
                    const newOtp = [...otp];
                    newOtp[index] = "";
                    setOtp(newOtp);
                    document.getElementById(`otp-input-${index}`)?.focus();
                  }
                }}
              />
            );
          })}
        </div>
        <span className="text-sm font-bold text-neutral-400 px-1">
          { `${Math.floor(timeLeft/60)}`.padStart(2, '0') }
          :
          { `${Math.floor(timeLeft % 60)}`.padStart(2, '0') }
        </span>
      </div>
      <Button onClick={continueToCreatePassword}>
        <p>Verify</p>
      </Button>
    </form>
  );
}
