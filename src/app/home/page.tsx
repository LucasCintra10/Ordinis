"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import getLocations from "@/providers/getLocations";
import { Location } from "@/models/location";
import Select from "@/components/Select";
import * as Icon from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import exportToExcel from "@/tools/exportExcel";
import api from "@/tools/api";
import { Property } from "@/models/property";

export default function HomePage() {

  const [locations, setLocations] = React.useState<Location[]>([]);
  const [property, setProperty] = React.useState<Property[]>([]);

  const [selected, setSelected] = React.useState({} as Location);

  const getPatrimonios = async () => {
    api
      .get(`/patrimonio/search`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          localizacao: selected.id,
        },
      })
      .then((res) => {
        setProperty(res.data.data);
      })
      .catch((err) => {
        setProperty([]);
      })
  };

  console.log(property)

  React.useEffect(() => {
    getLocations().then((response) => {
      setLocations(response);
    });
  }, []);

  React.useEffect(() => {
    getPatrimonios();
  }, [selected]);

  return (
    <main className="w-screen h-screen flex">
      <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
      <Navbar />
      <div className="w-full h-full flex flex-col ml-8">
        <div className="w-[50%] h-1/6 flex items-center">
          <h1 className="text-5xl font-bold text-c5 ">Home</h1>
        </div>
        <div className="w-[95%] h-[30%] rounded-xl bg-white p-2" >
          <div className="w-[20%] h-[100%] p-2 pr-4 border-r-2 border-c5 flex flex-col justify-between items-center">
            <Icon.ChevronDoubleDownIcon className="w-5 h-5" />
            <p>Relátorio dos Patrimônios</p>
            <div className="w-[100%] h-10 items-center justify-center">
              <Select
                selected={selected.descricao}
                setSelected={(e) => {
                  setSelected(e);
                }}
                options={locations}
                placeholder="Selecionar"
              />
            </div>
            <div className="w-[100%]">
              <Button
                onClick={() => {
                  console.log("click");
                }}
                label="Exportar"
                type="button"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
