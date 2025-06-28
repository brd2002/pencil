import { Button } from '@/components/ui/button'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const DashboardHeader = () => {
    const {user} : any = useKindeBrowserClient()
  return (
    <div className='flex justify-end w-full items-center gap-2'>
       <div className='flex gap-3 items-center border rounded-md p-2'>
        <Search/>
        <input type="text" placeholder='Search' />
       </div>
       <div>
        <Image src={user?.picture} alt='user'
        width={40} height={40} className='rounded-full'/>
       </div>
       <Button className='flex gap-2 cursor-pointer'>
        <Send/>
        Invite
       </Button>
    </div>
  )
}

export default DashboardHeader
