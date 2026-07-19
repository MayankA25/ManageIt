import React from "react";

export default function Input({ type, name, placeholder, onChangeHandler, errorsCondtion, className }: { type: string, name: string, onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>)=>void, placeholder: string, errorsCondtion?: boolean, className?: string }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChangeHandler}
      className={`relative rounded-lg bg-neutral-900 ${className ? className : "px-3 py-3"} text-sm font-bold outline-0 transition-all duration-200 focus:bg-neutral-950 ${errorsCondtion && "border border-red-400"}`}
    />
  );
}
