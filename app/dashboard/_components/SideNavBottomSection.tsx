import { Button } from "@/components/ui/button";
import { Archive, Flag } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

function SideNavBottomSection({onCreateFile ,totalFile}:any) {
  const [fileInput , setFileInput] = useState('');
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: "",
    },
    {
      id: 2,
      name: "Archive",
      icon: Archive,
      path: "",
    },
  ];
  return (
    <div>
      <div>
        {menuList.map((mean, index) => (
          <div key={index} className="flex gap-2 bg-gray-200 p-2 mb-1 rounded-md cursor-pointer">
            <mean.icon />
            <h2 className="font-semibold">{mean.name}</h2>
          </div>
        ))}
        {/* add new file button  */}
         <Dialog>
          <DialogTrigger className="w-full ">
            <Button className="w-full cursor-pointer">New File</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription>
               <Input value={fileInput} onChange={(e)=>{setFileInput(e.target.value)}} placeholder="Enter file name" className="mt-2" />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={!(fileInput&&fileInput.length>0) } 
                onClick={()=>{onCreateFile(fileInput)}} >Create</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
          <div className={`h-4 bg-red-500 rounded-full`} style={{
            width:`${((totalFile/5)*100)}%`
          }}></div>
        </div>
        <h2 className="mt-3 text-[15px] font-sans">
          <strong>{totalFile}</strong> out of <strong>5</strong> used
        </h2>
      </div>
    </div>
  );
}

export default SideNavBottomSection;
