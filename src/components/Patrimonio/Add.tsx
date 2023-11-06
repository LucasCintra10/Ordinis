import AddCategoryModal from "../Modals/categoria/AddCategoryModal";
import AddLocationModal from "../Modals/localizacao/AddLocationModal";
import * as Icon from "@heroicons/react/24/outline";
import { Condition } from "@/models/condition";
import { Category } from "@/models/category";
import { Property } from "@/models/property";
import Select from "@/components/Select";
import { Origin } from "@/models/origin";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import api from "@/tools/api";
import { ThreeDots } from "react-loader-spinner";
import React from "react";
import getLocations from "@/providers/getLocations";
import getCategories from "@/providers/getCategories";
import TransitionEffect from "../TransitionEffect";

const AddProperty: React.FC = () => {
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
  const [loading, setLoading] = React.useState(false);
  const [isShowing, setIsShowing] = React.useState(true);

  const AddProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
        clearFields();
      })
      .catch((err: any) => {
        toast.error(err?.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(property);

  const clearFields = () => {
    setProperty({} as Property);
    setSelected({
      category: "",
      condition: "",
      location: "",
      origin: "",
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
    getCategories().then((response) => {
      setCategories(response);
    });
    getLocations().then((response) => {
      setLocations(response);
    });
  }, [addCategoryModal, addLocationModal]);

  return (
    <>
      <AddCategoryModal isOpen={addCategoryModal} setIsOpen={setAddCategoryModal} />
      <AddLocationModal isOpen={addLocationModal} setIsOpen={setAddLocationModal} />
      <TransitionEffect isShowing={isShowing}>
        <form
          className="w-[95%] mt-12 bg-white z-1 rounded-xl z-10 p-4 flex flex-wrap gap-8 justify-between"
          onSubmit={(e) => AddProperty(e)}
        >
          <div className="w-[48%] h-10 flex justify-between items-center">
            <Input
              label="Placa"
              name="placa"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={property.placa || ""}
            />
          </div>
          <div className="w-[48%] h-10 flex justify-between items-center">
            <Input
              label="Descrição"
              name="descricao"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={property.descricao || ""}
            />
          </div>
          <div className="w-[48%] h-10 flex justify-between items-center">
            <Input
              label="Valor"
              name="valor"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={property.valor || ""}
            />
          </div>
          <div className="w-[48%] h-10 flex justify-between items-center">
            <label className="w-36 text-c5 font-medium shrink-0">Localização</label>
            <div className="w-full h-full flex items-center justify-between">
              <Select
                selected={selected.location}
                setSelected={(e) => (
                  setProperty({ ...property, id_localizacao: e.id }),
                  setSelected({ ...selected, location: e.descricao })
                )}
                options={locations}
              />
              <button
                className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all ml-4 hover:opacity-90 "
                onClick={(event) => {
                  openModal(event, setAddLocationModal);
                }}
              >
                <Icon.PlusIcon className="w-5 h-5 " />
              </button>
            </div>
          </div>
          <div className="w-[48%] h-10 flex justify-between items-center">
            <label className="w-36 text-c5 font-medium shrink-0">Categoria</label>
            <div className="w-full h-full flex items-center justify-between">
              <Select
                selected={selected.category}
                setSelected={(e) => (
                  setProperty({ ...property, id_categoria: e.id }), setSelected({ ...selected, category: e.descricao })
                )}
                options={categories}
              />
              <button
                className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all ml-4 hover:opacity-90 "
                onClick={(event) => {
                  openModal(event, setAddCategoryModal);
                }}
              >
                <Icon.PlusIcon className="w-5 h-5 " />
              </button>
            </div>
          </div>
          <div className="w-[48%] h-10 flex justify-between items-center">
            <label className="w-36 text-c5 font-medium shrink-0">Conservação</label>
            <Select
              selected={selected.condition}
              setSelected={(e) => {
                setProperty({ ...property, estado: e.descricao }), setSelected({ ...selected, condition: e.descricao });
              }}
              options={conditions}
            />
          </div>
          <div className="w-[48%] h-10 flex justify-between items-center">
            <label className=" w-36 text-c5 font-medium shrink-0">Origem</label>
            <Select
              selected={selected.origin}
              setSelected={(e) => {
                setProperty({ ...property, origem: e.descricao }), setSelected({ ...selected, origin: e.descricao });
              }}
              options={origins}
            />
          </div>

          <div className="w-[48%] h-10 flex justify-between items-center">
            <Input
              label="Data de Entrada"
              name="data_entrada"
              type="date"
              onChange={(e) => handleInputChange(e)}
              value={property.data_entrada || ""}
            />
          </div>
          {loading ? (
            <div className="w-full h-10 flex justify-center items-center">
              <ThreeDots color="#1D539F" height={50} width={50} />
            </div>
          ) : (
            <Button label="Cadastrar" type="submit" />
          )}
        </form>
      </TransitionEffect>
    </>
  );
};

export default AddProperty;
