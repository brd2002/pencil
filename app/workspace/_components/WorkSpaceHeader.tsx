import { Button } from "@/components/ui/button";
import { Link, Save } from "lucide-react";
import Image from "next/image";
import React from "react";

function WorkSpaceHeader({onSave}:any) {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center ">
        <Image src={"/logo.svg"} alt="logo" height={40} width={40} />
        <h2 className="font-semibold">File name</h2>
      </div>
      <div className="flex gap-2 items-center">
        <Button className="g-2 cursor-pointer" onClick={()=>onSave()}>
        <Save/>
        Save
      </Button>
        <Button className="g-2 cursor-pointer">
        <Link/>
        Share
      </Button>
      </div>
    </div>
  );
}

export default WorkSpaceHeader;
