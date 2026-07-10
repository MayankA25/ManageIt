import RegisterStatusHeader from '@/components/RegisterStatusHeader/RegisterStatusHeader'
import React from 'react'

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    
  return (
    <div className="relative m-auto flex w-[50%] lg:w-[25%] items-center justify-center rounded-xl bg-neutral-800 px-7 py-10 shadow-xl">
        <RegisterStatusHeader/>
        {children}
    </div>
  )
}
