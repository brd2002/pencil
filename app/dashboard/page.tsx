"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import React, { useEffect } from "react";
import DashboardHeader from "./_components/Header";
import FileList from "./_components/FileList";



function Dashboard() {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();
  // const getUser = useQuery(api.user.getUser, { email: user?.email });
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    checkUser()
    // console.log(user)
    return () => {};
  }, [user]);
  //NOTE -  for this async and await we create another function
  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (user) {
      if (!result?.length) {
        createUser({
          name: user.given_name,
          email: user.email,
          image: user.picture,
        }).then((res) => {
          // console.log(res);
        });
      } else {
        // console.log(result);
      }
    }
  };
  return (
    <div>
      {/* <h1>This is dashboard</h1>
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button> */}
      <div className="p-8">
        <DashboardHeader/>
        <FileList/>
      </div>
    </div>
  );
}

export default Dashboard;
