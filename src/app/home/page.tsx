"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function HomePage() {
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      toast.warning("Você precisa estar logado para acessar")
    }
  }, []);

  return (
    <main className="w-screen h-screen">
      <Image src="/vector16.svg" alt="Ilustração" width={900} height={900} className="absolute bottom-0 right-0" />
      <Navbar />
    </main>
  );
}
