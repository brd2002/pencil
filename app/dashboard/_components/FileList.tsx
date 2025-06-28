import { FileListContext } from "@/app/_context/FileListContext";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Archive, Delete, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
export interface FILE {
  archive: boolean;
  createdBy: string;
  doccument: string;  
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}
function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  useEffect(() => {
    fileList_ && setFileList(fileList_);
    console.log(fileList_);
  }, [fileList_]);
  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">Name</th>
              <th className="px-3 py-2 whitespace-nowrap">Created At</th>
              <th className="px-3 py-2 whitespace-nowrap">Edited</th>
              <th className="px-3 py-2 whitespace-nowrap">Auther</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList &&
              fileList.map((file: FILE, index: number) => (
                <tr className="*:text-gray-900 *:first:font-medium cursor-pointer"
                onClick={()=>{
                  router.push(`/workspace/${file._id}`)
                  console.log('this is clicked')
                }}
                key={index}
                >
                  <td className="px-3 py-2 whitespace-nowrap">
                    {file.fileName}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {moment(file._creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Image
                      src={user?.picture}
                      alt="auther image"
                      height={30}
                      width={30}
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer ">
                          <Archive />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Delete />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
