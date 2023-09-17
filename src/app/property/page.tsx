"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import * as Icon from "@heroicons/react/24/outline";
import React from "react";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Condition } from "@/models/condition";

export default function PropertyPage() {

  const conditions: Condition[] = [
    { id: 1, name: "Regular" },
    { id: 2, name: "Bom" },
    { id: 3, name: "Ruim" },
  ];

  const router = useRouter();


  const [selectedCondition, setSelectedCondition] = React.useState<Condition>(conditions[0]);
  const [display, setDisplay] = React.useState("property");


  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      toast.warning("Você precisa estar logado para acessar")
    }
  }, []);

  return (
    <main className="w-screen h-screen flex">
      <Image src="/vector16.svg" alt="Ilustração" width={900} height={900} className="absolute bottom-0 right-0" />
      <Navbar />
      <div className="w-full h-full flex flex-col ml-8 box-border">
        <div className="w-full h-1/6 flex items-center">
          <h1 className="text-5xl font-bold text-c5 ">Registros</h1>
        </div>
        <div className="w-full flex gap-4">
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "property" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("property")}
          >
            <Icon.DocumentIcon className="w-5 h-5" />
            Patrimônio
          </button>
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "maintenance" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("maintenance")}
          >
            <Icon.WrenchScrewdriverIcon className="w-5 h-5" />
            Manutenção
          </button>
        </div>
        <form className="w-95 h-2/3 mt-4 bg-white z-1 rounded-xl z-10 p-4 flex flex-col gap-4 ">
          {display === "property" && (
            <>
              <div className="w-full flex justify-between">
                <div className="w-1/5 h-10 flex justify-between items-center gap-2">
                  <label className="text-c5 font-medium ">Placa</label>
                  <input type="text" className="w-full h-full bg-c1 rounded" />
                </div>
                <div className="w-40 h-10 flex justify-between items-center gap-2">
                  <label className="text-c5 font-medium ">Origem</label>
                  <input type="text" className=" w-full h-full bg-c1 rounded" />
                </div>
                <div className="w-auto h-10 flex justify-between items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Data de Entrada</label>
                  <input type="date" className="w-64 h-full bg-c1 rounded text-center" />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="w-70 h-10 flex justify-between items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Descrição</label>
                  <input type="text" className="w-89 h-full bg-c1 rounded" />
                </div>
                <div className="w-auto h-10 flex justify-between items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Valor</label>
                  <input type="text" className="w-72 h-full bg-c1 rounded" />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="w-auto h-10 flex justify-between items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Localização</label>
                  <input type="text" className="w-72 h-full bg-c1 rounded" />
                </div>
                <div className="w-auto h-10 flex justify-between items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Categoria</label>
                  <input type="text" className="w-72 h-full bg-c1 rounded" />
                </div>
                <div className="w-auto h-10 flex justify-between items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Conservação</label>
                  <Select selected={selectedCondition} setSelected={setSelectedCondition} options={conditions} />
                </div>
              </div>
              <div className="w-full flex items-center gap-4">
                <input type="checkbox" className="w-6 h-6 " />
                <label className=" text-c5 font-medium truncate">Patrimônio Baixado ?</label>
              </div>
              <div className="w-full h-auto p-4 border-solid border-2 border-c5 rounded-xl flex flex-col gap-4">
                <div className="w-full flex justify-between">
                  <div className="w-auto h-10 flex justify-between items-center gap-2">
                    <label className=" text-c5 font-medium truncate">Data de Saida</label>
                    <input type="date" className="w-64 h-full bg-c1 rounded text-center" />
                  </div>
                  <div className="w-full h-10 flex justify-end items-center gap-2">
                    <label className=" text-c5 font-medium truncate">Responsavel Entrega</label>
                    <input type="text" className="w-8/12 h-full bg-c1 rounded" />
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <div className="w-full h-10 flex justify-start items-center gap-2">
                    <label className=" text-c5 font-medium truncate">Responsavel Saida</label>
                    <input type="text" className="w-8/12 h-full bg-c1 rounded" />
                  </div>
                  <div className="w-auto h-10 flex justify-between items-center gap-2">
                    <label className=" text-c5 font-medium truncate">Conservação</label>
                    <Select selected={selectedCondition} setSelected={setSelectedCondition} options={conditions} />
                  </div>
                </div>
              </div>
              <div className="w-full h-full flex items-end gap-2">
                <button className="w-32 h-10 bg-c2 rounded flex justify-center items-center gap-2 text-c5 transition-colors hover:bg-c4 hover:text-c2">
                  Novo
                </button>
                <button className="w-32 h-10 bg-c2 rounded flex justify-center items-center gap-2 text-c5 transition-colors hover:bg-c4 hover:text-c2">
                  Editar
                </button>
                <button className="w-32 h-10 bg-c2 rounded flex justify-center items-center gap-2 text-c5 transition-colors hover:bg-c4 hover:text-c2">
                  Consultar
                </button>
              </div>
            </>
          )}
          {display === "maintenance" && (
            <>
              <div className="w-full flex justify-between">
                <div className="w-auto h-10 flex justify-between items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Defeito</label>
                  <input type="text" className="w-72 h-full bg-c1 rounded" />
                </div>
                <div className="w-auto h-10 flex justify-between items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Data de Saida</label>
                  <input type="date" className="w-64 h-full bg-c1 rounded text-center" />
                </div>
                <div className="w-auto h-10 flex justify-between items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Prev. de Entrada</label>
                  <input type="date" className="w-64 h-full bg-c1 rounded text-center" />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="w-70 h-10 flex items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Resp. Manutenção</label>
                  <input type="text" className="w-9/12 h-full bg-c1 rounded" />
                </div>
                <div className="w-auto h-10 flex justify-start items-center gap-2">
                  <label className=" text-c5 font-medium truncate">Valor</label>
                  <input type="text" className="w-72 h-full bg-c1 rounded" />
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </main>
  );
}
