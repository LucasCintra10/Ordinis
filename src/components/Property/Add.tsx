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
import { toast } from "react-toastify";

const AddProperty: React.FC = () => {

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

  const AddProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post(
        "/patrimonio/create",
        {
          ...property,
          valor: Number.parseFloat(property.valor),
          data_entrada: new Date(property.data_entrada),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response: any) => {
        toast.success("Patrimônio cadastrado com sucesso!");
      })
      .catch((error: any) => {
        toast.error("Erro ao cadastrar patrimônio!");
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

  return (
    <>
      <AddCategoryModal isOpen={addCategoryModal} setIsOpen={setAddCategoryModal} />
      <AddLocationModal isOpen={addLocationModal} setIsOpen={setAddLocationModal} />
      <form
        className="w-[85%]  mt-4 bg-white z-1 rounded-xl z-10 p-4 flex flex-wrap gap-8 justify-between box-border"
        onSubmit={(e) => AddProperty(e)}
      >
        <div className="w-[45%] h-10 flex justify-between items-center gap-2">
          <label className="text-c5 font-medium ">Placa</label>
          <input
            name="placa"
            type="text"
            className="w-full h-full bg-c1 rounded pl-2"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="w-[45%] h-10 flex justify-between items-center gap-2">
          <label className="w-auto text-c5 font-medium ">Descrição</label>
          <input
            name="descricao"
            type="text"
            className="w-full h-full bg-c1 rounded pl-2"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="w-[45%] h-10 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Valor</label>
          <input name="valor" className="w-full h-full bg-c1 rounded pl-2" onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="w-[45%] h-10 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Localização</label>
          <div className="w-96 h-full flex items-center justify-between">
            <Select
              selected={selected.location}
              setSelected={(e) => (
                setProperty({ ...property, id_localizacao: e.id }), setSelected({ ...selected, location: e.descricao })
              )}
              options={locations}
            />
            <button
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 "
              onClick={(event) => {
                openModal(event, setAddLocationModal);
              }}
            >
              <Icon.PlusIcon className="w-5 h-5 " />
            </button>
          </div>
        </div>
        <div className="w-[45%] h-10 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Categoria</label>
          <div className="w-96 h-full flex items-center justify-between">
            
            <Select
              selected={selected.category}
              setSelected={(e) => (
                setProperty({ ...property, id_categoria: e.id }), setSelected({ ...selected, category: e.descricao })
              )}
              options={categories}
            />
            <button
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 "
              onClick={(event) => {
                openModal(event, setAddCategoryModal);
              }}
            >
              <Icon.PlusIcon className="w-5 h-5 " />
            </button>
          </div>
        </div>
        <div className="w-[45%] h-10 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Conservação</label>
          <Select
            selected={selected.condition}
            setSelected={(e) => {
              setProperty({ ...property, estado: e.descricao }), setSelected({ ...selected, condition: e.descricao });
            }}
            options={conditions}
          />
        </div>
        <div className="w-[45%] h-10 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Origem</label>
          <Select
            selected={selected.origin}
            setSelected={(e) => {
              setProperty({ ...property, origem: e.descricao }), setSelected({ ...selected, origin: e.descricao });
            }}
            options={origins}
          />
        </div>

        <div className="w-[45%] h-10 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium w-40">Data de Entrada</label>
          <input
            name="data_entrada"
            type="date"
            className="w-96 h-full bg-c1 rounded text-center"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button
          type="submit"
          className="w-full h-10  self-center bg-p3 text-white rounded flex justify-center items-center gap-2  transition-all hover:opacity-90 uppercase"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
};

export default AddProperty;
