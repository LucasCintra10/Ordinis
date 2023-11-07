"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import * as Icon from "@heroicons/react/24/outline";
import AddMaintance from "@/components/Manutencao/Add";
import { Transition } from "@headlessui/react";
import Table from "@/components/Manutencao/Table";
import { Maintenance } from "@/models/maintenance";
import api from "@/tools/api";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import Report from "@/components/Manutencao/Report";

export default function ManutencaoPage() {
  const [display, setDisplay] = React.useState("add");
  const [isShowing, setIsShowing] = React.useState(true);
  const [maintenances, setMaintenances] = React.useState([] as Maintenance[]);
  const [loading, setLoading] = React.useState(false);

  const getMaintenances = async () => {
    setLoading(true);
    api
      .get(`/manutencao/get-all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        setMaintenances(response.data.data);
      })
      .catch((error: any) => {
        toast.error("Erro ao buscar manutenções");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getMaintenances();
  }, []);

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
              display === "add" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("add")}
          >
            <Icon.WrenchIcon className="w-5 h-5" />
            Adicionar
          </button>
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "maintenances" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("maintenances")}
          >
            <Icon.WrenchScrewdriverIcon className="w-5 h-5" />
            Manutenções
          </button>
        </div>
        <Transition
          appear={true}
          show={isShowing}
          enter={`transition-all ease-in-out duration-700`}
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {display === "add" && (
            <section className="w-[95%] mt-6 bg-white z-1 rounded-xl z-10 p-4 flex flex-wrap gap-2 justify-between">
              <AddMaintance getMaintances={() => getMaintenances()} />
              {loading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <ColorRing colors={["#1E35C6", "#3146D0", "#4F63D7", "#677BEC", "#37407A"]} height={80} width={80} />
                </div>
              ) : (
                <div className="w-full h-full">
                  <Table maintenance={maintenances} getMaintenances={() => getMaintenances()} />
                </div>
              )}
            </section>
          )}
          {display === "maintenances" && (
            <section className="w-[95%] mt-6 bg-white z-1 rounded-xl z-10 p-2 flex flex-wrap gap-2 justify-between">
              <Report maintenance={maintenances} />
            </section>
          )}
        </Transition>
      </div>
    </main>
  );
}
