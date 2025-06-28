"use client";
import React, { useEffect, useState } from "react";
import WorkSpaceHeader from "../_components/WorkSpaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/app/dashboard/_components/FileList";

import Canvas from "../_components/Canvas";
function WorkSpace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [documentFileData, setDocumentFileData] = useState<FILE>();
  useEffect(() => {
    console.log(params.fileId);
    params.fileId && getFileData();
  }, []);
  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: params.fileId,
    });
    console.log(result);
    setDocumentFileData(result)
  };
  return (
    <div>
      <WorkSpaceHeader onSave={() => setTriggerSave(!triggerSave)} />
      {/* workspace layout  */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* document */}
        <div className="h-screen ">
          <Editor onSaveTrigger={triggerSave} fileId={params.fileId} documentFileData = {documentFileData} />
        </div>
        {/* white board */}
        <div className="h-screen border-l">
          <Canvas onSaveTrigger={triggerSave} fileId={params.fileId} documentFileData = {documentFileData}/>
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
