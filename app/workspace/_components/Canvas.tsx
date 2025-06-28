import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);
function Canvas({
    onSaveTrigger,
    fileId,
    documentFileData
}: any) {
    const [whiteboard , setWhiteBoard] = useState<any>();
    const updateWhiteboard = useMutation(api.files.updateCanvas)
    useEffect(()=>{
        onSaveTrigger&&saveWhiteBoard();
    }, [onSaveTrigger])
    const saveWhiteBoard = () => {
        updateWhiteboard({
            _id : fileId,
            whiteboard : JSON.stringify(whiteboard)
        }).then(res => console.log(res))
    }
  return (
    <div style={{ height: "800px" }}>
      {
        documentFileData&&<Excalidraw
        onChange={(excalidrawElements, appState, files) => {
        //   console.log(excalidrawElements);
        setWhiteBoard(excalidrawElements)
        }}
        initialData={{
            elements: documentFileData?.whiteboard&&JSON.parse(documentFileData?.whiteboard)
        }}
        UIOptions={{
            canvasActions:{
               saveToActiveFile : false ,
               export : false,
               toggleTheme : false,
               saveAsImage : false,
               loadScene : false
            }
        }}
      >
        <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint/>
            <WelcomeScreen.Hints.HelpHint/>
            <WelcomeScreen.Hints.ToolbarHint/>
        </WelcomeScreen>
      </Excalidraw>
      }
    </div>
  );
}

export default Canvas;
