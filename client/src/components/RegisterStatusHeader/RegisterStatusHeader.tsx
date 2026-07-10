"use client";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const urls = ["/register", "/register/verify", "/register/password"];

export default function RegisterStatusHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const handlePreviousButton = ()=>{
    router.back();
  }

  console.log("Pathname: ", pathname);

  const foundIndex = urls.findIndex((url)=>url == pathname);

  return (
    <span className="text-neutral-400 text-sm absolute top-3 font-bold flex items-center justify-between w-[93%]">
        {foundIndex > 0 ? <span onClick={handlePreviousButton}><ArrowLeft className="size-8 hover:bg-black/15 p-1.5 rounded-full cursor-pointer"/></span>: <span></span>}
        <p>Step { foundIndex+1 } of {urls.length}</p>
    </span>
  );
}
