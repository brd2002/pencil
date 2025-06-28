"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// import LinkTool from '@editorjs/link';
// @ts-ignore
import Checklist from "@editorjs/checklist";
import EditorjsList from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import Quote from "@editorjs/quote";
// @ts-ignore
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
// import DragDrop from "editorjs-drag-drop";
// @ts-ignore
const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Hello From Pencil community",
        level: 2,
      },
      id: "123",
      type: "header",
    },
  ],
  version: "2.8.1",
};
function Editor({ onSaveTrigger , fileId , documentFileData }: any) {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateFile)
  const [document, setDocument] = useState(rawDocument);
  useEffect(() => {
    documentFileData&&initEditor();
  }, [documentFileData]);
  useEffect(() => {
    console.log("Tragger value :", onSaveTrigger);
    onSaveTrigger&&onSaveDocument()
  }, [onSaveTrigger]);
  const initEditor = () => {
    const editor = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */
      tools: {
        header: {
          // @ts-ignore
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 3,
          },
          shortcut: "CMD+SHIFT+H",
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        List: {
          // @ts-ignore
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        underline: Underline,
      },
      holder: "editorjs",
      data: documentFileData.document?JSON.parse(documentFileData.document):document,
    });
    ref.current = editor;
  };
  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updateDocument({
            _id : fileId,
            document : JSON.stringify(outputData)
          })
          toast('File Save!')
    })
        .catch((error) => {
            toast('Somthing is wrong!')
          console.log("Saving failed: ", error);
        });
    }
  };
  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
}


export default Editor;
