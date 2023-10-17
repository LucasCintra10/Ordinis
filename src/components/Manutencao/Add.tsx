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
import { Maintance } from "@/models/maintance";

const AddMaintance: React.FC = () => {
  const [property, setProperty] = React.useState({} as Property);
  const [prestadores, setPrestadores] = React.useState([] as Prestador[]);
  const [maintance, setMaintance] = React.useState({} as Maintance);

  const [prestadorModal, setPrestadorModal] = React.useState(false);
  const [isShowing, setIsShowing] = React.useState(true);
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setProperty({ ...property, [event.target.name]: event.target.value });
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
        <form className="w-[95%] mt-12 bg-white z-1 rounded-xl z-10 p-4 flex flex-wrap gap-8 justify-between">
          <div className="w-[48%] h-10 flex justify-between items-center">
            <Input name="placa" label="Placa" type="text" onChange={(e) => handleInputChange(e)} />
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
                setSelected={(e) => (setMaintance({ ...maintance, id_prestador: e.id }), setSelected(e.descricao))}
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
            <Input disabled={disabled} label="Valor" name="valor" type="text" onChange={(e) => handleInputChange(e)} />
          </div>

          <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
            <Input
              disabled={disabled}
              label="Data de Inicio"
              name="data_entrada"
              type="date"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <Button disabled={disabled} label="Adicionar" type="submit" />
        </form>
      </Transition>
    </>
  );
};

export default AddMaintance;
