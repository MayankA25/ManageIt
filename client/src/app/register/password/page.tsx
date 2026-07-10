
import CreatePassword from '@/components/CreatePassword/CreatePassword'
import { RectangleEllipsis } from 'lucide-react'
import React from 'react'

export default function CreatePasswordPage() {
  return (
    <div className='flex flex-col w-full'>
      <div className="flex flex-col items-center justify-center">
          <span className="rounded-2xl bg-neutral-300 p-3 text-black shadow-xl">
            <RectangleEllipsis className="size-5" />
          </span>
          <CreatePassword/>
        </div>
    </div>
  )
}
