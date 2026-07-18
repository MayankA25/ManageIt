"use client";

import Image from "next/image";
import React from "react";
import Button from "../ui/Button";

export default function GoogleLogin() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
      <Button>
        <div
          onClick={handleLogin}
          className="flex items-center justify-center gap-5"
        >
          <Image
            src={"/google.jpg"}
            width={20}
            height={20}
            alt="Google"
            loading={"eager"}
            className="h-auto"
          />
          <div className="flex items-center justify-center">
            <h1 className="cursor-pointer font-semibold">Login With Google</h1>
          </div>
        </div>
      </Button>
  );
}
