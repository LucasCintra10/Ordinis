import AddCategoryModal from "../Modals/categoria/AddCategoryModal";
import AddLocationModal from "../Modals/localizacao/AddLocationModal";
import * as Icon from "@heroicons/react/24/outline";
import { ThreeDots } from "react-loader-spinner";
import { Condition } from "@/models/condition";
import { Transition } from "@headlessui/react";
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
import moment from "moment";

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

  const [loading, setLoading] = React.useState({
    search: false,
    update: false,
  })

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [property, setProperty] = React.useState({} as Property);

  const [addCategoryModal, setAddCategoryModal] = React.useState(false);
  const [addLocationModal, setAddLocationModal] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [isShowing, setIsShowing] = React.useState(true);

  const getCategories = async () => {
    api
      .get("/categoria/get-all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: any) => {
        setCategories(response.data.data);
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
        setLocations(response.data.data);
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
    setLoading({ ...loading, search: true})
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
        setLoading({ ...loading, search: false})
      });
  };

  const updateProperty = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading({ ...loading, update: true})
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
      .catch((err: any) => {
        toast.error(err?.response?.data)
      })
      .finally(() => {
        setLoading({ ...loading, update: false})
      });
  };

  React.useEffect(() => {
    getCategories();
    getLocations();
  }, [addCategoryModal, addLocationModal]);

  return (
    <>
      <AddCategoryModal isOpen={addCategoryModal} setIsOpen={setAddCategoryModal} />
      <AddLocationModal isOpen={addLocationModal} setIsOpen={setAddLocationModal} />
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
        <form
          onSubmit={(e) => updateProperty(e)}
          className="w-[95%] mt-12 bg-white z-1 rounded-xl z-10 p-4 flex flex-wrap gap-8 justify-between"
        >
          <div className="w-[48%] h-10 flex justify-between items-center">
            <Input name="placa" label="Placa" type="text" onChange={(e) => handleInputChange(e)} />
            {loading.search ? (
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
            <Input
              label="Descrição"
              name="descricao"
              type="text"
              value={property?.descricao}
              disabled={disabled}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
            <Input
              label="Valor"
              name="valor"
              type="text"
              disabled={disabled}
              value={property?.valor}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
            <label className="w-36 text-c5 font-medium shrink-0 ">Localização</label>
            <div className="w-full h-full flex items-center justify-between">
              <Select
                disabled={disabled}
                selected={selected.location || property?.localizacao?.descricao}
                setSelected={(e) => (
                  setProperty({ ...property, id_localizacao: e.id }),
                  setSelected({ ...selected, location: e.descricao })
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
          <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
            <label className="w-36 text-c5 font-medium shrink-0 ">Categoria</label>
            <div className="w-full h-full flex items-center justify-between">
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
          <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
            <label className="w-36 text-c5 font-medium shrink-0 ">Conservação</label>
            <Select
              disabled={disabled}
              selected={selected.condition || property?.estado}
              setSelected={(e) => {
                setProperty({ ...property, estado: e.descricao }), setSelected({ ...selected, condition: e.descricao });
              }}
              options={conditions}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
            <label className="w-36 text-c5 font-medium shrink-0">Origem</label>
            <Select
              disabled={disabled}
              selected={selected.origin || property?.origem}
              setSelected={(e) => {
                setProperty({ ...property, origem: e.descricao }), setSelected({ ...selected, origin: e.descricao });
              }}
              options={origins}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center  opacity-60`}>
            <Input
              label="Data de Entrada"
              name="data_entrada"
              value={property?.data_entrada ? moment(property?.data_entrada).format("YYYY-MM-DD") : ""}
              disabled={true}
              type="date"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          {loading.update ? (
            <div className="w-full h-10 flex justify-center items-center">
              <ThreeDots color={"#4F63D7"} height={50} width={50} />
            </div>
          ) : (
            <Button label="Editar" type="submit" disabled={disabled} />
          )}
        </form>
      </Transition>
    </>
  );
};

export default EditProperty;
