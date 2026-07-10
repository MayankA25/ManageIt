"use client";
import React from "react";

interface Props {
  children: React.ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick = () => {},
  disabled,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`my-2 cursor-pointer rounded-lg ${disabled ? "bg-neutral-700 text-white" : "bg-neutral-300 text-black hover:bg-neutral-700 hover:text-white"} w-full p-1.75 py-2 font-bold transition-all duration-200`}
    >
      {children}
    </button>
  );
}
