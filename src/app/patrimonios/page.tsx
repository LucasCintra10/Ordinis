"use client";
import RemoveProperty from "@/components/Patrimonio/Remove";
import EditProperty from "@/components/Patrimonio/Edit";
import * as Icon from "@heroicons/react/24/outline";
import AddProperty from "@/components/Patrimonio/Add";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

export default function PatrimoniosPage() {
  
  const [display, setDisplay] = React.useState("register");

  return (
    <main className="w-screen h-screen flex">
      <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
      <Navbar />
      <div className="w-full h-full flex flex-col ml-8">
        <div className="w-[50%] h-1/6 flex items-center">
          <h1 className="text-5xl font-bold text-c5 ">Patrimônios</h1>
        </div>
        <div className="w-[50%] flex gap-10 justify-between">
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "register" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("register")}
          >
            <Icon.FolderPlusIcon className="w-5 h-5" />
            Cadastro
          </button>
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "remove" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("remove")}
          >
            <Icon.FolderMinusIcon className="w-5 h-5" />
            Baixa
          </button>
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "edit" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("edit")}
          >
            <Icon.PencilSquareIcon className="w-5 h-5" />
            Edição
          </button>
        </div>
        {display === "register" && <AddProperty />}
        {display === "edit" && <EditProperty />}
        {display === "remove" && <RemoveProperty />}
      </div>
    </main>
  );
}
