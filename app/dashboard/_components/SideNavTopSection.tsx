import React , {useEffect, useState} from "react";
import { ChevronDown, LayoutGrid, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export interface Team {
    teamName : string,
    createdBy : string,
    _id: string
}
function SideNavTopSection({user , setActiveTeamInfo} :any) {
  const [teamList , setTeamList ] = useState<Team[]>()
  const [activeTeam , setActiveTeam] = useState<Team>();
  const router = useRouter();
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: User,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];
  const convex = useConvex();
  useEffect(() => {
    user&&getTeamList();
  }, [user])
  useEffect(()=>{
    activeTeam&& setActiveTeamInfo(activeTeam);
  },[activeTeam])
  const getTeamList = async () =>{
     const listOfTeams : any = await convex.query(api.teams.getTeam , {email : user?.email})
     console.log(listOfTeams)
     setTeamList(listOfTeams);
     setActiveTeam(listOfTeams[0])
  }
  const onMenuClick = (item : any) =>{
      if(item.path){
        router.push(item.path)
      }
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
            <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
            <h2 className="font-semibold text-1.5xl flex gap-2 items-center">
              {activeTeam?.teamName} <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7 p-4 ">
          {/* Team section  */}
          <div className="ml-2">
            {teamList?.map((team , index)=>(
                <h2 className={`font-semibold p-2  rounded-md cursor-pointer ${activeTeam?._id ==team._id&&'bg-blue-600 text-white'}`} key={index} onClick={()=>{setActiveTeam(team)}} >{team.teamName}</h2>
            ))}     
          </div>
          <Separator className="m-2"/>
          {/* menu section  */}
          <div>
            {menu.map((item, index) => (
              <h2 key={index} className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              onClick={()=>{onMenuClick(item)}}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </h2>
            ))}
            <LogoutLink>
              <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <LogOut className="h-4 w-4" />
                Logout
              </h2>
            </LogoutLink>
          </div>
           <Separator className="m-2"/>
            {/* user info section  */}
            <div className="flex items-center gap-2">
                <Image src={user?.picture} width={50} height={50} className="rounded-full" alt="profile_image"/>
                <div>
                    <h2 className="font-semibold">{user?.given_name+ " " + user?.family_name}</h2>
                    <h2 className="font-sans">{user?.email}</h2>
                </div>
            </div>
        </PopoverContent>
      </Popover>
      {/* all file button  */}
      <Button variant={"outline"} className="w-full justify-start gap-2 font-semibold bg-gray-200 cursor-pointer" > 
        <LayoutGrid/>
        All files
      </Button>
    </div>
  );
}

export default SideNavTopSection;
