// import { Button } from "@/components/ui/button";
"use client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useEffect } from "react";

export default function Home() {
  const {user} = useKindeBrowserClient();
  useEffect(() => {
    console.log(user)
  
    return () => {
      
    }
  }, [user])
  
  return (
    <div className="">
      <Header/>
      <Hero/>
    </div>
  );
}
