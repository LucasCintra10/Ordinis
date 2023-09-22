import React from "react";
import Select from "@/components/Select";
import { Condition } from "@/models/condition";
import api from "@/tools/api";
import { Category } from "@/models/category";
import { Property } from "@/models/property";
import * as Icon from "@heroicons/react/24/outline";
import AddCategoryModal from "../Modals/property/AddCategoryModal";
import AddLocationModal from "../Modals/property/AddLocationModal";
import { Origin } from "@/models/origin";
import { Location } from "@/models/location";
import { toast } from "react-toastify";

const EditProperty: React.FC = () => {
  const conditions: Condition[] = [
    { id: 2, descricao: "OTIMO" },
    { id: 3, descricao: "REGULAR" },
    { id: 4, descricao: "RUIM" },
  ];

  const origins: Origin[] = [
    { id: 1, descricao: "NV" },
    { id: 2, descricao: "PREFEITURA" },
  ];

  const [selected, setSelected] = React.useState({
    category: "",
    condition: "",
    location: "",
    origin: "",
  });

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [property, setProperty] = React.useState({} as Property);

  const [addCategoryModal, setAddCategoryModal] = React.useState(false);
  const [addLocationModal, setAddLocationModal] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

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

  const openModal = (event: React.MouseEvent, setModal: any) => {
    event.preventDefault();
    setModal(true);
  };
  React.useEffect(() => {
    getCategories();
    getLocations();
  }, []);

  const getProperty = async (event: React.MouseEvent) => {
    event.preventDefault();
    api
      .get("/patrimonio/search", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          placa: property?.placa,
        },
      })
      .then((response: any) => {
        setProperty(response.data.data[0]);
        setDisabled(false);
      })
      .catch((error: any) => {
        toast.error("Erro ao buscar patrimônio");
        console.log(error);
      });
  };

  return (
    <>
      <AddCategoryModal isOpen={addCategoryModal} setIsOpen={setAddCategoryModal} />
      <AddLocationModal isOpen={addLocationModal} setIsOpen={setAddLocationModal} />
      <form className="w-[50%] h-2/3 mt-4 bg-white z-1 rounded-xl z-10 p-4 flex flex-col gap-4 box-border">
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className="text-c5 font-medium ">Placa</label>
          <div className="w-96 h-full flex items-center justify-between">
            <input
              name="placa"
              type="text"
              className="w-72 h-full bg-c1 rounded"
              onChange={(e) => handleInputChange(e)}
            />
            <button
              type="submit"
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 "
              onClick={(event) => {
                getProperty(event);
              }}
            >
              <Icon.MagnifyingGlassIcon className="w-6 h-6 " />
            </button>
          </div>
        </div>
        <div className={`w-full h-32 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <label className="w-auto text-c5 font-medium ">Descrição</label>
          <input
            disabled={disabled}
            name="descricao"
            value={property?.descricao}
            type="text"
            className="w-96 h-full bg-c1 rounded"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={`w-full h-32 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <label className=" text-c5 font-medium ">Valor</label>
          <input
            disabled={disabled}
            value={property?.valor}
            name="valor"
            className="w-96 h-full bg-c1 rounded"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={`w-full h-32 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <label className=" text-c5 font-medium ">Localização</label>
          <div className="w-96 h-full flex items-center justify-between">
            <button
              disabled={disabled}
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 "
              onClick={(event) => {
                openModal(event, setAddLocationModal);
              }}
            >
              <Icon.PlusIcon className="w-6 h-6 " />
            </button>
            <Select
              disabled={disabled}
              selected={selected.location}
              setSelected={(e) => (
                setProperty({ ...property, id_localizacao: e.id }), setSelected({ ...selected, location: e.descricao })
              )}
              options={locations}
            />
          </div>
        </div>
        <div className={`w-full h-32 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>

          <label className=" text-c5 font-medium ">Categoria</label>
          <div className="w-96 h-full flex items-center justify-between">
            <button
              disabled={disabled}
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 "
              onClick={(event) => {
                openModal(event, setAddCategoryModal);
              }}
            >
              <Icon.PlusIcon className="w-6 h-6 " />
            </button>
            <Select
              disabled={disabled}
              selected={selected.category}
              setSelected={(e) => (
                setProperty({ ...property, id_categoria: e.id }), setSelected({ ...selected, category: e.descricao })
              )}
              options={categories}
            />
          </div>
        </div>
        <div className={`w-full h-32 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>

          <label className=" text-c5 font-medium ">Conservação</label>
          <Select
            disabled={disabled}
            selected={selected.condition || property?.estado}
            setSelected={(e) => {
              setProperty({ ...property, estado: e.descricao }), setSelected({ ...selected, condition: e.descricao });
            }}
            options={conditions}
          />
        </div>
        <div className={`w-full h-32 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>

          <label className=" text-c5 font-medium ">Origem</label>
          <Select
            disabled={disabled}
            selected={selected.origin || property?.origem}
            setSelected={(e) => {
              setProperty({ ...property, origem: e.descricao }), setSelected({ ...selected, origin: e.descricao });
            }}
            options={origins}
          />
        </div>
        <div className={`w-full h-32 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>

          <label className=" text-c5 font-medium ">Data de Entrada</label>
          <input
            disabled={disabled}
            name="data_entrada"
            type="date"
            className="w-96 h-full bg-c1 rounded text-center"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={`w-full h-32 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>

          <label className="w-auto text-c5 font-medium ">Responsável</label>
          <input
            disabled={disabled}
            value={property?.resp_entrega}
            name="resp_entrega"
            type="text"
            className="w-96 h-full bg-c1 rounded"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button
          disabled={disabled}
          type="submit"
          className={`w-full h-32  self-center bg-p3 text-white rounded flex justify-center items-center gap-2  transition-all hover:opacity-90 ${disabled && "opacity-60"}`}
        >
          Editar
        </button>
      </form>
    </>
  );
};

export default EditProperty;
