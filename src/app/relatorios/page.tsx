"use client";
import { ColorRing } from "react-loader-spinner";
import { Transition } from "@headlessui/react";
import { Property } from "@/models/property";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import * as Icon from "@heroicons/react/24/outline";
import * as React from "react";
import api from "@/tools/api";
import { Category } from "@/models/category";
import { Location } from "@/models/location";
import Select from "@/components/Select";
import { Origin } from "@/models/origin";
import { Condition } from "@/models/condition";

export default function RelatoriosPage() {
  const [property, setProperty] = React.useState<Property[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [locations, setLocations] = React.useState<Location[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [isShowing, setIsShowing] = React.useState(false);

  const [display, setDisplay] = React.useState("");

  const origins: Origin[] = [
    { id: 1, descricao: "NV" },
    { id: 2, descricao: "PREFEITURA" },
  ];

  const conditions: Condition[] = [
    { id: 1, descricao: "EXCELENTE" },
    { id: 2, descricao: "OTIMO" },
    { id: 3, descricao: "REGULAR" },
    { id: 4, descricao: "RUIM" },
    { id: 5, descricao: "PESSIMO" },
  ];

  const [selected, setSelected] = React.useState({
    category: "",
    condition: "",
    location: "",
    origin: "",
  });

  const getAllProperties = async () => {
    setLoading(true);
    api
      .get(`/patrimonio/search?`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProperty(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCategories = async () => {
    api
      .get("/categoria/get-all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        setCategories(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getLocations = async () => {
    api
      .get("/localizacao/get-all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        setLocations(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setProperty({ ...property, [event.target.name]: event.target.value });
  };

  const moneyFormat = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };
  const dateFormat = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString("pt-BR");
  };

  React.useEffect(() => {
    setIsShowing(true);
    getAllProperties();
    getCategories();
    getLocations();
  }, []);

  return (
    <main className="w-screen h-screen flex">
      <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
      <Navbar />
      <div className="w-full h-full flex flex-col ml-8">
        <div className="w-[95%] h-1/6 flex items-center">
          <h1 className="text-5xl font-bold text-c5 ">Relatórios</h1>
        </div>
        <div className="w-[50%] flex gap-10 justify-between">
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "all" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("all")}
          >
            <Icon.Bars3Icon className="w-5 h-5" />
            Todos
          </button>
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "filter" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("filter")}
          >
            <Icon.FunnelIcon className="w-5 h-5" />
            Filtrar
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
       
        {display === "filter" && (
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
          <div className="w-[95%] bg-white flex justify-center z-10 gap-2 p-2 rounded-xl mt-6 " >
            <div className="w-[20%] justify-between items-center">
              <label className=" text-c5 font-medium shrink-0 ">Placa</label>
              <input name="placa" type="text" className="w-full h-10 bg-c1 rounded pl-2 outline-none" />
            </div>
            <div className="w-[20%]  items-center justify-between">
              <label className=" text-c5 font-medium shrink-0">Categoria</label>
              <div className="w-full h-10 flex items-center justify-between ">
                <Select
                  selected={selected.category}
                  setSelected={(e) => setSelected({ ...selected, category: e.descricao })}
                  options={categories}
                />
              </div>
            </div>
            <div className="w-[20%] justify-between items-center">
              <label className=" text-c5 font-medium shrink-0">Localização</label>
              <div className="w-full h-10 flex items-center justify-between">
                <Select
                  selected={selected.location}
                  setSelected={(e) => setSelected({ ...selected, location: e.descricao })}
                  options={locations}
                />
              </div>
            </div>
            <div className="w-[20%] justify-between items-center">
              <label className="  text-c5 font-medium shrink-0">Origem</label>
              <div className="w-full h-10 flex items-center justify-between">
                <Select
                  selected={selected.origin}
                  setSelected={(e) => {
                    setSelected({ ...selected, origin: e.descricao });
                  }}
                  options={origins}
                />
              </div>
            </div>
            <div className="w-[20%] justify-between items-center">
              <label className=" text-c5 font-medium shrink-0">Conservação</label>
              <div className="w-full h-10 flex items-center justify-between">
                <Select
                  selected={selected.condition}
                  setSelected={(e) => {
                    setSelected({ ...selected, condition: e.descricao });
                  }}
                  options={conditions}
                />
              </div>
            </div>
          </div>
          </Transition>
        )}
        {loading ? (
          <div className="w-full h-[50%] flex justify-center items-center">
            <ColorRing colors={["#1E35C6", "#3146D0", "#4F63D7", "#677BEC", "#37407A"]} height={80} width={80} />
          </div>
        ) : (
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
            <div className={`w-[95%] max-h-[90%] flex flex-col items-center bg-white rounded-xl p-2 z-0  transition-all ${display === "all" ? "mt-12" : "mt-6"}`}>
              <table className="w-full h-auto flex flex-col items-center rounded-xl overflow-auto no-scrollbar">
                <thead className="w-full flex justify-between items-center ">
                  <tr className="w-full h-auto flex justify-between items-center bg-c1 p-4 ">
                    <th className="w-1/6 h-full flex  items-center">Placa</th>
                    <th className="w-1/6 h-full flex  items-center">Categoria</th>
                    <th className="w-1/6 h-full flex  items-center">Localização</th>
                    <th className="w-1/6 h-full flex  items-center">Valor</th>
                    <th className="w-1/6 h-full flex  items-center">Origem</th>
                    <th className="w-1/6 h-full flex  items-center">Conservação</th>
                    <th className="w-1/6 h-full flex  items-center">Data de Ent.</th>
                  </tr>
                </thead>
                <tbody className="w-full h-5/6 flex flex-col items-center">
                  {property?.map((item: any, index: any) => (
                    <tr className={`w-full flex items-center p-4  ${index % 2 == 0 ? `` : `bg-c1`}`} key={index}>
                      <td className="w-1/6 h-full flex items-center">{item?.placa}</td>
                      <td className="w-1/6 h-full flex items-center">{item?.categoria.descricao}</td>
                      <td className="w-1/6 h-full flex items-center">{item?.localizacao.descricao}</td>
                      <td className="w-1/6 h-full flex items-center">{moneyFormat(item?.valor)}</td>
                      <td className="w-1/6 h-full flex items-center">{item?.origem}</td>
                      <td className="w-1/6 h-full flex items-center">{item?.estado}</td>
                      <td className="w-1/6 h-full flex items-center">{dateFormat(item?.data_entrada)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Transition>
        )}
      </div>
    </main>
  );
}
