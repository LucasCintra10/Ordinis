import React from "react";
import Select from "@/components/Select";
import { Condition } from "@/models/condition";
import api from "@/tools/api";
import { Category } from "@/models/category";
import { Property } from "@/models/property";
import * as Icon from "@heroicons/react/24/outline";
import AddCategoryModal from "../Modals/property/AddCategoryModal";
import SelectCategory from "../Select/SelectCategory";
import AddLocationModal from "../Modals/property/AddLocationModal";

const AddProperty: React.FC = () => {

  const conditions: Condition[] = [
    { id: 1, descricao: "Regular" },
    { id: 2, descricao: "Bom" },
    { id: 3, descricao: "Ruim" },
  ];

  const [selected, setSelected] = React.useState({
    category: "",
    condition: "",
    location: "",
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
        console.log(response.data);
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
      .post("/patrimonio/create", {
        ...property,
        valor: Number(property.valor),
        data_entrada: new Date(property.data_entrada),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        console.log(response.data);
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

  console.log(property);

  return (
    <>
      <AddCategoryModal isOpen={addCategoryModal} setIsOpen={setAddCategoryModal} />
      <AddLocationModal isOpen={addLocationModal} setIsOpen={setAddLocationModal} />
      <form
        className="w-[50%] h-2/3 mt-4 bg-white z-1 rounded-xl z-10 p-4 flex flex-col gap-4 box-border"
        onSubmit={(e) => AddProperty(e)}
      >
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className="text-c5 font-medium ">Placa</label>
          <input name="placa" type="text" className="w-96 h-full bg-c1 rounded" onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className="text-c5 font-medium ">Origem</label>
          <input name="origem" type="text" className=" w-96 h-full bg-c1 rounded" onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className="w-auto text-c5 font-medium ">Descrição</label>
          <input name="descricao" type="text" className="w-96 h-full bg-c1 rounded" onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Valor</label>
          <input name="valor" type="number" className="w-96 h-full bg-c1 rounded" onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Localização</label>
          <div className="w-96 h-full flex items-center justify-between">
            <button
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 "
              onClick={(event) => {
                openModal(event, setAddLocationModal);
              }}
            >
              <Icon.PlusIcon className="w-6 h-6 " />
            </button>
            <Select
              selected={selected.location}
              setSelected={(e) => (
                setProperty({ ...property, id_localizacao: e.id }), setSelected({ ...selected, location: e.descricao })
              )}
              options={locations}
            />
          </div>
        </div>
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Categoria</label>
          <div className="w-96 h-full flex items-center justify-between">
            <button
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 "
              onClick={(event) => {
                openModal(event, setAddCategoryModal);
              }}
            >
              <Icon.PlusIcon className="w-6 h-6 " />
            </button>
            <Select
              selected={selected.category}
              setSelected={(e) => (
                setProperty({ ...property, id_categoria: e.id }), setSelected({ ...selected, category: e.descricao })
              )}
              options={categories}
            />
          </div>
        </div>
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Conservação</label>
          <Select
            selected={selected.condition}
            setSelected={(e) => {
              setProperty({ ...property, estado: e.descricao }), setSelected({ ...selected, condition: e.descricao });
            }}
            options={conditions}
          />
        </div>
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Data de Entrada</label>
          <input
            name="data_entrada"
            type="date"
            className="w-96 h-full bg-c1 rounded text-center"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className="w-auto text-c5 font-medium ">Responsável</label>
          <input name="resp_entrega" type="text" className="w-96 h-full bg-c1 rounded" onChange={(e) => handleInputChange(e)} />
        </div>
        <button
          type="submit"
          className="w-full h-32  self-center bg-p3 text-white rounded flex justify-center items-center gap-2  transition-all hover:opacity-90"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
};

export default AddProperty;
