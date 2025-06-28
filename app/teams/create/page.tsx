"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React , {useState} from 'react'
import { toast } from 'sonner'

function CreateTeam() {
 const {user } : any = useKindeBrowserClient()
 const [team, setTeam] = useState("")
 const createTeam = useMutation(api.teams.createTeam);
 const router = useRouter();
 const createNewTeam = async() => {
    createTeam({
        teamName : team,
        createdBy: user?.email
    }).then((res)=> {
        console.log(res);
        if(res){
            router.push('/dashboard')
            toast('Team created successfully!')
        }
    })
 }
  return (
    <div className='p-16 flex flex-col items-center'>
      <Image src={'/logo.svg'} height={200} width={200} alt='logo'/>
        <div className='flex flex-col items-center'>
            <h1 className='font-bold text-[40px]'>What should we call your team ? </h1>
            <div className='flex flex-col items-center'>
                <label className='font-semibold text-3xl'>Team name</label>
                <Input placeholder='Team name' className='mt-3'value={team} onChange={(e)=>{setTeam(e.target.value)}}/> 
                <Button onClick={createNewTeam} className='mt-3 hover:bg-amber-950 cursor-pointer' disabled = {!(team&&team?.length>0)}>Create</Button>
            </div>
        </div>
    </div>
  )
}

export default CreateTeam
