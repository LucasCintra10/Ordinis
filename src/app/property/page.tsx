"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import * as Icon from "@heroicons/react/24/outline";

export default function PropertyPage() {
  return (
    <main className="w-screen h-screen flex">
      <Image src="/vector16.svg" alt="Ilustração" width={900} height={900} className="absolute bottom-0 right-0" />
      <Navbar />
      <div className="w-full h-full flex flex-col ml-8 box-border">
        <div className="w-full h-1/6 flex items-center">
          <h1 className="text-5xl font-bold text-c5 ">Registros</h1>
        </div>
        <div className="w-full h-1/6 flex gap-4">
          <button className="w-48 h-16 bg-c2 rounded-2xl flex justify-center items-center gap-2 text-c5 hover:bg-c4 hover:text-c2">
            <Icon.DocumentIcon className="w-5 h-5" />
            Patrimônio
          </button>
          <button className="w-48 h-16 bg-c2 rounded-2xl flex justify-center items-center gap-2 text-c5 hover:bg-c4 hover:text-c2">
            <Icon.WrenchScrewdriverIcon className="w-5 h-5" />
            Manutenção
          </button>
        </div>
        <form className="w-95 h-3/5 bg-white z-1 rounded-xl z-10 p-4 flex flex-col gap-4 ">
          <div className="w-full flex justify-between">
            <div className="w-1/5 h-10 flex justify-between items-center gap-1">
              <label className="text-c5 font-medium ">Placa</label>
              <input type="text" className="w-full h-full bg-c1 rounded" />
            </div>
            <div className="w-40 h-10 flex justify-between items-center gap-1">
              <label className="text-c5 font-medium ">Origem</label>
              <input type="text" className=" w-full h-full bg-c1 rounded" />
            </div>
            <div className="w-auto h-10 flex justify-between items-center gap-1">
              <label className=" text-c5 font-medium truncate">Data de Entrada</label>
              <input type="date" className="w-72 h-full bg-c1 rounded" />
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-70 h-10 flex justify-between items-center gap-1">
              <label className=" text-c5 font-medium truncate">Descrição</label>
              <input type="text" className="w-89 h-full bg-c1 rounded" />
            </div>
            <div className="w-auto h-10 flex justify-between items-center gap-1">
              <label className=" text-c5 font-medium truncate">Valor</label>
              <input type="text" className="w-72 h-full bg-c1 rounded" />
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-auto h-10 flex justify-between items-center gap-1">
              <label className=" text-c5 font-medium truncate">Localização</label>
              <input type="text" className="w-72 h-full bg-c1 rounded" />
            </div>
            <div className="w-auto h-10 flex justify-between items-center gap-1">
              <label className=" text-c5 font-medium truncate">Categoria</label>
              <input type="text" className="w-72 h-full bg-c1 rounded" />
            </div>
            <div className="w-auto h-10 flex justify-between items-center gap-1">
              <label className=" text-c5 font-medium truncate">Conservação</label>
              <input type="text" className="w-72 h-full bg-c1 rounded" />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
