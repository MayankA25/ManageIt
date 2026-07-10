'use client';
import React, { useState } from "react";
import Button from "../ui/Button";

export default function CreatePassword() {
    const [checked, setChecked] = useState(false);
  return (
    <form className="my-5 flex flex-col justify-center gap-1 text-center">
      <h1 className="text-2xl font-bold">Create Password</h1>
      <p className="font-semibold text-neutral-400">
        Your account security is important. Please set a new password to help
        protect it.
      </p>
      <div className="flex flex-col justify-center mt-8 mb-2 gap-2">
        <input
          type={`${checked ? "text" : "password"}`}
          name="password"
          placeholder="Password"
          className="rounded-lg bg-neutral-900 px-3 py-3 text-sm font-bold outline-0 transition-all duration-200 focus:bg-neutral-950"
        />
        <input
        type={`${checked ? "text" : "password"}`}
          name="confirm-password"
          placeholder="Confirm Password"
          className="rounded-lg bg-neutral-900 px-3 py-3 text-sm font-bold outline-0 transition-all duration-200 focus:bg-neutral-950"
        />

        <div className="flex items-center gap-2 px-1 my-1">
            <input type="checkbox" id="checkbox" className=" appearance-none w-4 h-4 bg-neutral-400 rounded-sm checked:bg-neutral-900 transition-all duration-200" onChange={(e)=>{
                setChecked(e.target.checked)
            }} />
            <span className="text-sm">Show Password</span>
        </div>
      </div>
      <Button>
        <p>Create</p>
      </Button>
    </form>
  );
}
