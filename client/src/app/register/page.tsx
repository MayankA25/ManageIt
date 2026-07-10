import GoogleLogin from '@/components/GoogleLogin/GoogleLogin'
import RegisterForm from '@/components/RegisterForm/RegisterForm'
import { User } from 'lucide-react'
import React from 'react'

export default function Register() {
  
  return (
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col items-center justify-center">
          <span className="rounded-2xl bg-neutral-300 p-3 text-black shadow-xl">
            <User className="size-5" />
          </span>
          <div className="my-5 flex flex-col justify-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-sm font-semibold text-neutral-400">
              Create your RecruitIt account and start managing employees, teams, and organizational operations from a single platform.
            </p>
          </div>
        </div>

        <RegisterForm/>

        <div className="flex items-center gap-3 text-neutral-500 text-sm my-3">
          <hr className="w-[50%]" />
          <span>OR</span>  
          <hr className="w-[50%]" />
        </div>   
        <GoogleLogin/>
      </div>
  )
}
