"use client";
import * as Icon from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { ColorRing } from "react-loader-spinner";
import { Transition } from "@headlessui/react";
import { Condition } from "@/models/condition";
import { Property } from "@/models/property";
import { Category } from "@/models/category";
import { Location } from "@/models/location";
import Select from "@/components/Select";
import Navbar from "@/components/Navbar";
import { Origin } from "@/models/origin";
import Image from "next/image";
import * as React from "react";
import api from "@/tools/api";
import * as XLSX from "xlsx";
import Table from "@/components/Relatorio/Table";
import moment from "moment";
import "moment/locale/pt-br";

export default function RelatoriosPage() {
  const [property, setProperty] = React.useState<Property[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [locations, setLocations] = React.useState<Location[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [isShowing, setIsShowing] = React.useState(false);

  const [display, setDisplay] = React.useState("all");
  const [placa, setPlaca] = React.useState("");

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

  const [filter, setFilter] = React.useState({
    categoria: "",
    localizacao: "",
    origem: "",
    conservacao: "",
  });

  const [selected, setSelected] = React.useState({
    category: "",
    condition: "",
    location: "",
    origin: "",
  });

  const getPatrimonios = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setLoading(true);
    api
      .get(`/patrimonio/search`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          ...(placa && { placa: placa }),
          ...(filter.conservacao && { estado: filter.conservacao }),
          ...(filter.categoria && { categoria: filter.categoria }),
          ...(filter.localizacao && { localizacao: filter.localizacao }),
          ...(filter.origem && { origem: filter.origem }),
        },
      })
      .then((res) => {
        setProperty(res.data.data);
      })
      .catch((err) => {
        setProperty([]);
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
        setCategories(response.data.data);
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
        setLocations(response.data.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const moneyFormat = (value: any) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const clearFilter = () => {
    setSelected({
      category: "",
      condition: "",
      location: "",
      origin: "",
    });
    setFilter({
      categoria: "",
      localizacao: "",
      origem: "",
      conservacao: "",
    });
    setPlaca("");
  };

  const exportToExcel = () => {
    const sheetName = "Patrimônios";
    const fileName = "patrimonios.xlsx";
    const data = [
      [
        "Placa",
        "Categoria",
        "Localização",
        "Valor",
        "Origem",
        "Conservação",
        "Data de Entrada",
        "Resp. Entrada",
        "Status",
        "Data de Saída",
        "Resp. Entrega",
        "Resp. Retirada",
      ],
      ...property.map((patrimonio) => [
        patrimonio.placa,
        patrimonio.categoria.descricao,
        patrimonio.localizacao.descricao,
        moneyFormat(patrimonio?.valor),
        patrimonio.origem,
        patrimonio.estado,
        moment.utc(patrimonio.data_entrada).format("DD/MM/YYYY"),
        patrimonio.usuario.nome + " " + patrimonio.usuario.sobrenome,
        patrimonio.status === 1 ? "Ativo" : "Baixado",
        patrimonio.data_saida ? moment.utc(patrimonio.data_saida).format("DD/MM/YYYY") : "-",
        patrimonio.resp_entrega ? patrimonio.resp_entrega : "-",
        patrimonio.resp_retirada ? patrimonio.resp_retirada : "-",
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
  };

  React.useEffect(() => {
    setIsShowing(true);
    getCategories();
    getLocations();
  }, []);

  React.useEffect(() => {
    if (display === "all") {
      clearFilter();
    }
  }, [display]);

  React.useEffect(() => {
    getPatrimonios();
  }, [filter]);

  return (
    <main className="w-screen h-screen flex relative">
      <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
      <Navbar />
      <div className="w-full h-full flex flex-col ml-8">
        <div className="w-[95%] h-1/6 flex items-center">
          <h1 className="text-5xl font-bold text-c5 ">Relatórios</h1>
        </div>
        <div className="w-[50%] flex gap-4">
          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "all" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={() => setDisplay("all")}
          >
            <Icon.Bars3Icon className="w-5 h-5" />
            Patrimônios
          </button>

          <button
            className={`w-48 h-16 cursor-pointer  rounded-2xl flex justify-center items-center gap-2  transition-colors hover:bg-c4 hover:text-c2 ${
              display === "edit" ? "bg-c4 text-c2" : "bg-c2 text-c5"
            }`}
            onClick={exportToExcel}
          >
            <Icon.ArrowTopRightOnSquareIcon className="w-5 h-5" />
            Exportar
          </button>
        </div>
        <form
          className="w-[95%] bg-white flex justify-center z-10 gap-2 p-2 rounded-xl mt-6 relative"
          onSubmit={(e) => {
            getPatrimonios(e);
          }}
        >
          {(filter.categoria || filter.localizacao || filter.origem || filter.conservacao || placa) && (
            <XCircleIcon className="w-6 h-6 absolute -top-1 -right-1" onClick={clearFilter} />
          )}
          <div className="w-[20%] justify-between items-center">
            <label className=" text-c5 font-medium shrink-0 ">Placa</label>
            <input
              name="placa"
              type="text"
              value={placa}
              className="w-full h-10 bg-c1 rounded pl-2 outline-none"
              onChange={(e) => {
                setPlaca(e.target.value);
              }}
            />
          </div>
          <div className="w-[20%]  items-center justify-between">
            <label className=" text-c5 font-medium shrink-0">Categoria</label>
            <div className="w-full h-10 flex items-center justify-between ">
              <Select
                selected={selected.category}
                setSelected={(e) => {
                  setSelected({ ...selected, category: e.descricao }), setFilter({ ...filter, categoria: e.id });
                }}
                options={categories}
              />
            </div>
          </div>
          <div className="w-[20%] justify-between items-center">
            <label className=" text-c5 font-medium shrink-0">Localização</label>
            <div className="w-full h-10 flex items-center justify-between">
              <Select
                selected={selected.location}
                setSelected={(e) => {
                  setSelected({ ...selected, location: e.descricao }), setFilter({ ...filter, localizacao: e.id });
                }}
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
                  setSelected({ ...selected, origin: e.descricao }), setFilter({ ...filter, origem: e.descricao });
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
                  setSelected({ ...selected, condition: e.descricao }),
                    setFilter({ ...filter, conservacao: e.descricao });
                }}
                options={conditions}
              />
            </div>
          </div>
        </form>

        {loading && display === "all" ? (
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
            <div
              className={`w-[95%] h-96 flex flex-col items-center bg-white rounded-xl p-2 z-0  transition-all 
                mt-7`}
            >
              {loading && display === "filter" ? (
                <div className="w-full h-[50%] flex justify-center items-center">
                  <ColorRing colors={["#1E35C6", "#3146D0", "#4F63D7", "#677BEC", "#37407A"]} height={80} width={80} />
                </div>
              ) : (
                <>
                  {property.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <h1 className="text-2xl font-bold text-c5">Nenhum patrimônio encontrado</h1>
                      <Icon.DocumentMagnifyingGlassIcon className="w-10 h-10 text-c5 ml-2" />
                    </div>
                  ) : (
                    <Table property={property} />
                  )}
                </>
              )}
            </div>
          </Transition>
        )}
      </div>
    </main>
  );
}
