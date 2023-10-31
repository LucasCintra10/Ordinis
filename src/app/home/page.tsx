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
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import InfoPropertyModal from "@/components/Modals/patrimonio/InfoProperty";

export default function HomePage() {
  
  const [locations, setLocations] = React.useState<Location[]>([]);

  const ReportsProperty: React.FC = () => {
    const [locations, setLocations] = React.useState<Location[]>([]);
    const [properties, setProperties] = React.useState<Property[]>([]);

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
          setProperties(res.data.data);
        });
    };

    React.useEffect(() => {
      if (selected.id) {
        getPatrimonios();
      }
    }, [selected]);

    return (
      <>
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
              exportToExcel(properties);
            }}
            label="Exportar"
            type="button"
            disabled={!selected.id}
          />
        </div>
      </>
    );
  };

  const InfoProperty: React.FC = () => {
    const [search, setSearch] = React.useState("");
    const [property, setProperty] = React.useState({} as Property);

    const [infoPropertyModal, setInfoPropertyModal] = React.useState(false);

    const getPatrimonio = async () => {
      api
        .get(`/patrimonio/get-placa/${search}`, {
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
        });
    };

    return (
      <>
        <InfoPropertyModal isOpen={infoPropertyModal} setIsOpen={setInfoPropertyModal} data={property} />
        <Icon.ChevronDoubleDownIcon className="w-5 h-5" />
        <p>Informações do Patrimônio</p>
        <div className="w-[100%] h-10 items-center justify-center">
          <Input
            name="placaInfo"
            type="text"
            placeholder="Placa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-[100%]">
          <Button
            onClick={() => {
              getPatrimonio();
            }}
            label="Visualizar"
            type="button"
            disabled={!search}
          />
        </div>
      </>
    );
  };

  const AlterLocation: React.FC = () => {
    const [search, setSearch] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [property, setProperty] = React.useState({} as Property);
    const [selected, setSelected] = React.useState({} as Location);

    const getPatrimonio = async () => {
      api
        .get(`/patrimonio/get-placa/${search}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response: any) => {
          setProperty(response.data.data);
        })
        .catch((error: any) => {
          toast.error("Erro ao buscar patrimônio");
        });
    };

    return (
      <>
        <Icon.ChevronDoubleDownIcon className="w-5 h-5" />
        <p>Alterar Localização</p>
        <div className="w-full h-10 flex justify-between items-center">
          <Input
            name="placaLoc"
            placeholder="Placa"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {loading ? (
            <div className="ml-4">
              <ThreeDots color={"#4F63D7"} height={45} width={46} />
            </div>
          ) : (
            <button
              type="submit"
              className="w-16 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 ml-4"
              onClick={() => {
                getPatrimonio();
              }}
            >
              <Icon.MagnifyingGlassIcon className="w-5 h-5 " />
            </button>
          )}
        </div>
        <div className="w-[100%] h-10 items-center justify-center">
          <Select
            selected={property.localizacao?.descricao}
            setSelected={(e) => {
              setSelected(e);
            }}
            options={locations}
            placeholder="Localização"
          />
        </div>
      </>
    );
  };

  React.useEffect(() => {
    getLocations().then((res) => {
      setLocations(res);
    });
  }, []);

  return (
    <>
      <main className="w-screen h-screen flex">
        <Image src="/vectorBR.svg" alt="Ilustração" width={400} height={400} className="absolute bottom-0 right-0" />
        <Navbar />
        <div className="w-full h-full flex flex-col ml-8">
          <div className="w-[50%] h-1/6 flex items-center">
            <h1 className="text-5xl font-bold text-c5 ">Home</h1>
          </div>
          <div className="w-[95%] h-[30%] rounded-xl flex bg-white p-2">
            <div className="w-[60%] h-[100%] flex flex-col p-1 justify-around items-center">
              <ReportsProperty />
            </div>
            <div className="h-full w-1 bg-c1 rounded-full mx-8" />
            <div className="w-[60%] h-[100%] p-1 flex flex-col justify-around items-center">
              <InfoProperty />
            </div>
            <div className="h-full w-1 bg-c1 rounded-full mx-8" />
            <div className="w-full h-[100%] p-1 flex flex-col justify-around items-center">
              <AlterLocation />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
