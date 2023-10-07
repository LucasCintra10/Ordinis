import AddCategoryModal from "../Modals/property/AddCategoryModal";
import AddLocationModal from "../Modals/property/AddLocationModal";
import * as Icon from "@heroicons/react/24/outline";
import { ColorRing } from "react-loader-spinner";
import { Condition } from "@/models/condition";
import { Category } from "@/models/category";
import { Property } from "@/models/property";
import { Location } from "@/models/location";
import { Origin } from "@/models/origin";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import api from "@/tools/api";
import React from "react";

const EditProperty: React.FC = () => {
  const conditions: Condition[] = [
    { id: 1, descricao: "EXCELENTE" },
    { id: 2, descricao: "OTIMO" },
    { id: 3, descricao: "REGULAR" },
    { id: 4, descricao: "RUIM" },
    { id: 5, descricao: "PESSIMO" },
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
  const [loading, setLoading] = React.useState(false);

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

  const getProperty = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
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
        console.log(response.data.data[0]);
        setDisabled(false);
      })
      .catch((error: any) => {
        toast.error("Erro ao buscar patrimônio");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateProperty = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .put(
        `/patrimonio/update/${property?.id}`,
        {
          placa: property?.placa,
          descricao: property?.descricao,
          valor: Number.parseFloat(property?.valor),
          origem: property?.origem,
          estado: property?.estado,
          id_localizacao: property?.id_localizacao || property?.localizacao?.id,
          id_categoria: property?.id_categoria || property?.categoria?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response: any) => {
        toast.success("Patrimônio atualizado com sucesso");
      })
      .catch((error: any) => {
        toast.error("Erro ao atualizar patrimônio");
        console.log(error);
      });
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
        onSubmit={(e) => updateProperty(e)}
        className="w-[95%]  mt-12 bg-white z-1 rounded-xl z-10 p-4 flex flex-wrap gap-8 justify-between"
      >
        <div className="w-[48%] h-10 flex justify-between items-center gap-2">
          <Input name="placa" label="Placa" type="text" onChange={(e) => handleInputChange(e)} />
          {loading ? (
            <ColorRing colors={["#1E35C6", "#3146D0", "#4F63D7", "#677BEC", "#37407A"]} height={45} width={45} />
          ) : (
            <button
              type="submit"
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 ml-4"
              onClick={(event) => {
                getProperty(event);
              }}
            >
              <Icon.MagnifyingGlassIcon className="w-5 h-5 " />
            </button>
          )}
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <Input label="Descrição" name="descricao" type="text" disabled={disabled} onChange={(e) => handleInputChange(e)} />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <Input label="Valor" name="valor" type="text" disabled={disabled} onChange={(e) => handleInputChange(e)} />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <label className=" text-c5 font-medium ">Localização</label>
          <div className="w-96 h-full flex items-center justify-between">
            <Select
              disabled={disabled}
              selected={selected.location || property?.localizacao?.descricao}
              setSelected={(e) => (
                setProperty({ ...property, id_localizacao: e.id }), setSelected({ ...selected, location: e.descricao })
              )}
              options={locations}
            />
            <button
              disabled={disabled}
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 ml-4 "
              onClick={(event) => {
                openModal(event, setAddLocationModal);
              }}
            >
              <Icon.PlusIcon className="w-5 h-5 " />
            </button>
          </div>
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <label className=" text-c5 font-medium ">Categoria</label>
          <div className="w-96 h-full flex items-center justify-between">
            <Select
              disabled={disabled}
              selected={selected.category || property?.categoria?.descricao}
              setSelected={(e) => (
                setProperty({ ...property, id_categoria: e.id }), setSelected({ ...selected, category: e.descricao })
              )}
              options={categories}
            />
            <button
              disabled={disabled}
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 ml-4"
              onClick={(event) => {
                openModal(event, setAddCategoryModal);
              }}
            >
              <Icon.PlusIcon className="w-5 h-5 " />
            </button>
          </div>
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
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
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
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
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <Input label="Data de Aquisição" name="data_aquisicao" disabled={disabled} type="date" onChange={(e) => handleInputChange(e)} />
        </div>
      <Button label="Editar" type="submit" disabled={disabled} />
      </form>
    </>
  );
};

export default EditProperty;
