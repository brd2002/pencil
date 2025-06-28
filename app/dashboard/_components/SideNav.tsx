import React, { useState , useEffect, useContext } from "react";
import SideNavTopSection, { Team } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from './../../_context/FileListContext';

function SideNav() {
    const {user} : any = useKindeBrowserClient();
    const createFile = useMutation(api.files.createFile)
    const  [activeTeam , setActiveTeam ] = useState<Team>();
    const [totalFile , setTotalFile] = useState<number>();
    const convex = useConvex();
    const {fileList_ , setFileList_} = useContext(FileListContext)
    const onCreateFile= (fileName: string) =>{
      if (activeTeam?._id && user?.email) {
         createFile({
        fileName: fileName,
        teamId : activeTeam?._id|| '',
        createdBy: user?.email|| '',
        archive:false , 
        document:'',
        whiteboard : ''
      }).then((res)=>{
        if(res){
          getFileCount();
          toast('File created successfully!')
        }
      } , (e)=>{
        if(e) {
          toast('Something went wrong!')
        }
      })
      }
    }
    useEffect(() => {
      activeTeam&&getFileCount()
    }, [activeTeam])
    
    const getFileCount = async ()=>{
        const result = await convex.query(api.files.getFile , {teamId : activeTeam?._id});
        setFileList_(result)
        setTotalFile(result?.length)
        // console.log(totalFile)
        console.log(result);
    }

  return (
    <div className="bg-gray-100 h-screen fixed w-72 border-r p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection user={user} setActiveTeamInfo={(activeTeam : Team)=>{setActiveTeam(activeTeam)}} />
      </div>
      <div>
        <SideNavBottomSection
        totalFile = {totalFile}
        onCreateFile={onCreateFile}
        />
      </div>
    </div>
  );
}

export default SideNav;
