'use client';
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="w-screen h-screen">
      <Image src="/vector16.svg" alt="Ilustração" width={900} height={900} className="absolute bottom-0 right-0" />
        <Navbar />
    </main>
  );
}
