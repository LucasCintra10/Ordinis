"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import * as Icon from "@heroicons/react/24/outline";
import AddMaintance from "@/components/Manutencao/Add";

export default function ManutencaoPage() {
  const [display, setDisplay] = React.useState("add");

  return (
    <main className="w-screen h-screen flex relative">
      <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
      <Navbar />
      <div className="w-full h-full flex flex-col ml-8">
        <div className="w-[95%] h-1/6 flex items-center">
          <h1 className="text-5xl font-bold text-c5 ">Manutenções</h1>
        </div>
        <div className="w-[50%] flex gap-4">
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "all" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("add")}
          >
            <Icon.Bars3Icon className="w-5 h-5" />
            Abrir
          </button>
          <button
            className={`w-48 h-16 cursor-pointer relative rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "filter" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("filter")}
          >
            <Icon.FunnelIcon className="w-5 h-5" />
            Encerrar
          </button>
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "edit" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
          >
            <Icon.ArrowTopRightOnSquareIcon className="w-5 h-5" />
            Exportar
          </button>
        </div>
        {display === "add" && <AddMaintance />}
      </div>
    </main>
  );
}
