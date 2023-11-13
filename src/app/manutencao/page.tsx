"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import * as Icon from "@heroicons/react/24/outline";
import AddMaintance from "@/components/Manutencao/Add";
import Table from "@/components/Manutencao/Table";
import { Maintenance } from "@/models/maintenance";
import api from "@/tools/api";
import { toast } from "react-toastify";
import { ColorRing, ThreeDots } from "react-loader-spinner";
import Report from "@/components/Manutencao/Report";
import TransitionEffect from "@/components/TransitionEffect";
import Input from "@/components/Input";
import { Prestador } from "@/models/prestador";
import Select from "@/components/Select";

export default function ManutencaoPage() {
  const [display, setDisplay] = React.useState("add");
  const [filter, setFilter] = React.useState("");
  const [search, setSearch] = React.useState("");

  const [maintenances, setMaintenances] = React.useState([] as Maintenance[]);
  const [prestadores, setPrestadores] = React.useState([] as Prestador[]);

  const [selected, setSelected] = React.useState("");

  const [isShowing, setIsShowing] = React.useState(true);
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

  const filterMaintenances = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setLoading(true);
    api
      .get(`/manutencao/get/${filter}/${search}`, {
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

  const getPrestadores = async () => {
    api
      .get(`/prestador/get-all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        setPrestadores(response.data.data);
      })
      .catch((error: any) => {
        toast.error("Erro ao buscar prestadores");
      });
  };

  React.useEffect(() => {
    getMaintenances();
    getPrestadores();
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
            Registrar
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
        <TransitionEffect isShowing={isShowing}>
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
            <section className="w-[95%] ">
              <form
                className="w-full mt-6 bg-white z-1 rounded-xl z-10 p-2 flex flex-wrap gap-2 justify-between items-center"
                onSubmit={(e) => {
                  filterMaintenances(e);
                }}
              >
                <div className="flex w-[45%] gap-2 h-10">
                  <input
                    type="radio"
                    name="filter"
                    id="placa"
                    value="patr"
                    className="w-5"
                    onChange={(e) => {
                      setFilter(e.target.value);
                      setSearch("");
                      setSelected("");
                    }}
                  />
                  <div className="w-full justify-between items-center flex gap-2">
                    <label className="text-c5 font-medium shrink-0 cursor-pointer" htmlFor="placa">
                      Patrimônio
                    </label>
                    <Input
                      name="placa"
                      placeholder="Placa"
                      type="text"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      disabled={filter !== "patr"}
                    />
                  </div>
                </div>
                <div className="flex w-[45%] gap-2">
                  <input
                    type="radio"
                    name="filter"
                    id="prestador"
                    value="prestador"
                    className="w-5"
                    onChange={(e) => {
                      setFilter(e.target.value);
                      setSearch("");
                      setSelected("");
                    }}
                  />
                  <div className="w-full h-10 justify-between items-center flex gap-2">
                    <label className=" text-c5 font-medium shrink-0 cursor-pointer " htmlFor="prestador">
                      Prestador
                    </label>
                    <Select
                      disabled={filter !== "prestador"}
                      selected={selected}
                      setSelected={(e) => (setSearch(e.id), setSelected(e.nome + " " + e.sobrenome))}
                      options={prestadores}
                    />
                  </div>
                </div>
                {loading ? (
                  <div className="ml-4">
                    <ThreeDots color={"#4F63D7"} height={45} width={46} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-11 h-11 bg-p3 rounded-full text-white flex items-center justify-center transition-all hover:opacity-90 ml-4"
                    onClick={(event) => {
                      filterMaintenances();
                    }}
                  >
                    <Icon.MagnifyingGlassIcon className="w-5 h-5 " />
                  </button>
                )}
              </form>
              <div className="w-full mt-6 bg-white z-1 rounded-xl z-10 p-2 flex flex-wrap gap-2 justify-between">
                <Report maintenance={maintenances} />
              </div>
            </section>
          )}
        </TransitionEffect>
      </div>
    </main>
  );
}
