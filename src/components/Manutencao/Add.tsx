"use client";
import * as Icon from "@heroicons/react/24/outline";
import { ThreeDots } from "react-loader-spinner";
import { Transition } from "@headlessui/react";
import { Property } from "@/models/property";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import api from "@/tools/api";
import React from "react";
import AddPrestadorModal from "@/components/Modals/prestador/AddPrestadorModal";
import { Prestador } from "@/models/prestador";
import { Maintenance } from "@/models/maintenance";

interface AddMaintenanceProps {
  getMaintances: () => void;
}

const AddMaintenance: React.FC<AddMaintenanceProps> = ({ getMaintances}) => {
  const [property, setProperty] = React.useState({} as Property);
  const [prestadores, setPrestadores] = React.useState([] as Prestador[]);
  const [maintenance, setMaintance] = React.useState({} as Maintenance);

  const [prestadorModal, setPrestadorModal] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const [selected, setSelected] = React.useState("");

  const getProperty = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    api
      .get(`/patrimonio/get-placa/${property?.placa}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        setProperty(response.data.data);
        setDisabled(false);
      })
      .catch((error: any) => {
        toast.error("Erro ao buscar patrimônio");
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

  const AddMaintance = async (event: React.FormEvent) => {
    event.preventDefault();
    api
      .post(
        `/manutencao/create/${property?.id}`,
        {
          ...maintenance,
          valor: Number(maintenance.valor),
          data_fim: new Date(maintenance.data_fim),
          data_inicio: new Date(maintenance.data_inicio),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response: any) => {
        toast.success("Manutenção adicionada com sucesso");
        clearFields();
        getMaintances();
      })
      .catch((err: any) => {
        toast.error(err?.response?.data);
      });
  };

  const clearFields = () => {
    setProperty({} as Property);
    setMaintance({} as Maintenance);
    setSelected("");
    setDisabled(true);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMaintance({ ...maintenance, [event.target.name]: event.target.value });
  };

  const openModal = (event: React.MouseEvent, setModal: any) => {
    event.preventDefault();
    setModal(true);
  };

  React.useEffect(() => {
    getPrestadores();
  }, []);

  return (
    <>
      <AddPrestadorModal isOpen={prestadorModal} setIsOpen={setPrestadorModal} />
      <form
        className="w-full z-1 rounded-xl z-10 p-4 flex flex-wrap gap-8 justify-between"
        onSubmit={(e) => {
          AddMaintance(e);
        }}
      >
        <div className="w-[48%] h-10 flex justify-between items-center">
          <Input
            name="placa"
            label="Placa"
            type="text"
            value={property?.placa || ""}
            onChange={(e) => setProperty({ ...property, placa: e.target.value })}
          />
          {loading ? (
            <div className="ml-4">
              <ThreeDots color={"#4F63D7"} height={45} width={46} />
            </div>
          ) : (
            <button
              type="submit"
              className="w-16 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 ml-4"
              onClick={(event) => {
                getProperty(event);
              }}
            >
              <Icon.MagnifyingGlassIcon className="w-5 h-5 " />
            </button>
          )}
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
          <label className="w-36 text-c5 font-medium shrink-0 ">Prestador</label>
          <div className="w-full h-full flex items-center justify-between">
            <Select
              disabled={disabled}
              selected={selected}
              setSelected={(e) => (setMaintance({ ...maintenance, id_prestador: e.id }), setSelected(e.nome + " " + e.sobrenome))}
              options={prestadores}
            />
            <button
              disabled={disabled}
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 ml-4 "
              onClick={(event) => {
                openModal(event, setPrestadorModal);
              }}
            >
              <Icon.PlusIcon className="w-5 h-5 " />
            </button>
          </div>
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
          <Input 
            disabled={disabled} 
            label="Valor" 
            name="valor" 
            type="text" 
            value={maintenance?.valor || ""}
            onChange={(e) => handleInputChange(e)} 
          />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
          <Input
            disabled={disabled}
            label="Data de Inicio"
            name="data_inicio"
            type="date"
            value={maintenance?.data_inicio || ""}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
          <Input
            disabled={disabled}
            label="Descrição"
            name="descricao"
            type="text"
            value={maintenance?.descricao || ""}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
          <Input
            disabled={disabled}
            label="Prev. de Término"
            name="data_fim"
            type="date"
            value={maintenance?.data_fim || ""}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <Button disabled={disabled} label="Adicionar" type="submit" />
      </form>
    </>
  );
};

export default AddMaintenance;
