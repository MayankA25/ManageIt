import EmailVerification from '@/components/EmailVerification/EmailVerification'
import { Shield } from 'lucide-react'
import React from 'react'

export default function VerifyEmailPage() {
  return (
    <div className='flex flex-col w-full'>
      <div className="flex flex-col items-center justify-center">
          <span className="rounded-2xl bg-neutral-300 p-3 text-black shadow-xl">
            <Shield className="size-5" />
          </span>
          <EmailVerification/>
        </div>
    </div>
  )
}
