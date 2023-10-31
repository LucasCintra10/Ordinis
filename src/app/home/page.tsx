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
import Input from "@/components/Input";
import InfoPropertyModal from "@/components/Modals/patrimonio/InfoProperty";
import { toast } from "react-toastify";
import { get } from "axios";

export default function HomePage() {
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [property, setProperty] = React.useState<Property[]>([]);

  const [infoPropertyModal, setInfoPropertyModal] = React.useState(false);

  const [placa, setPlaca] = React.useState("");

  const [selected, setSelected] = React.useState({} as Location);

  const getPatrimonio = async () => {
    
    api
      .get(`/patrimonio/get-placa/${placa}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        setProperty(response.data.data);
        setInfoPropertyModal(true);
      })
      .catch((error: any) => {
        toast.error("Erro ao buscar patrimônio");
      })
  };

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

  React.useEffect(() => {
    getLocations().then((response) => {
      setLocations(response);
    });

  }, []);

  React.useEffect(() => {
    if (selected.id) {
      getPatrimonios();
    }
  }, [selected]);

  return (
    <>
      <InfoPropertyModal isOpen={infoPropertyModal} setIsOpen={setInfoPropertyModal} data={property} />
      <main className="w-screen h-screen flex">
        <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
        <Navbar />
        <div className="w-full h-full flex flex-col ml-8">
          <div className="w-[50%] h-1/6 flex items-center">
            <h1 className="text-5xl font-bold text-c5 ">Home</h1>
          </div>
          <div className="w-[95%] h-[30%] rounded-xl flex bg-white p-2">
            <div className="w-[25%] h-[100%] flex flex-col p-1 justify-around items-center">
              <Icon.ChevronDoubleDownIcon className="w-5 h-5" />
              <p>Relátorio dos Patrimônios</p>
              <div className="w-[100%] h-10 items-center justify-center">
                <Select
                  selected={selected?.descricao}
                  setSelected={(e) => {
                    setSelected(e);
                  }}
                  options={locations}
                  placeholder="Localização"
                />
              </div>
              
              <div className="w-[100%]">
                <Button
                  onClick={() => {
                    exportToExcel(property);
                  }}
                  label="Exportar"
                  type="button"
                  disabled={!selected.id}
                />
              </div>
            </div>
            <div className="h-full w-1 bg-c1 rounded-full mx-8" />
            <div className="w-[25%] h-[100%] p-1 flex flex-col justify-around items-center">
              <Icon.ChevronDoubleDownIcon className="w-5 h-5" />
              <p>Informações do Patrimônio</p>
              <div className="w-[100%] h-10 items-center justify-center">
                <Input
                  name="placa"
                  type="text"
                  placeholder="Placa"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                />
              </div>
              
              <div className="w-[100%]">
                <Button
                  onClick={() => {
                    getPatrimonio();
                  }}
                  label="Visualizar"
                  type="button"
                  disabled={!placa}
                />
              </div>
            </div>
            <div className="h-full w-1 bg-c1 rounded-full mx-8" />

          </div>
        </div>
      </main>
    </>
  );
}
