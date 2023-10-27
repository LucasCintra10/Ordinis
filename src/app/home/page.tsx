"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import getLocations from "@/providers/getLocations";
import { Location } from "@/models/location";


export default function HomePage() {

  const [locations, setLocations] = React.useState<Location[]>([]);

  React.useEffect(() => {
    getLocations().then((response) => {
      setLocations(response);
    });
  }, []);

  return (
    <main className="w-screen h-screen flex">
      <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
      <Navbar />
      <div className="w-full h-full flex flex-col ml-8">
        <div className="w-[50%] h-1/6 flex items-center">
          <h1 className="text-5xl font-bold text-c5 ">Home</h1>
        </div>
        <div className="w-[95%] h-10 rounded-xl bg-white">

        </div>
      </div>
    </main>
  );
}
