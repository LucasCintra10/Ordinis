import * as Icon from "@heroicons/react/24/outline";
import { ThreeDots } from "react-loader-spinner";
import { Condition } from "@/models/condition";
import { Transition } from "@headlessui/react";
import { Category } from "@/models/category";
import { Property } from "@/models/property";
import { Location } from "@/models/location";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { Origin } from "@/models/origin";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import api from "@/tools/api";
import React from "react";

const RemoveProperty: React.FC = () => {
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

  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [isShowing, setIsShowing] = React.useState(false);

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
        setDisabled(false);
      })
      .catch((error: any) => {
        toast.error("Erro ao buscar patrimônio");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteProperty = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .delete(`/patrimonio/baixa/${property?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          data_saida: new Date(property?.data_saida),
          resp_retirada: property?.resp_retirada,
        },
      })
      .then((response: any) => {
        toast.success("Patrimônio baixado com sucesso!");
      })
      .catch((error: any) => {
        toast.error("Erro ao baixar patrimônio!");
      });
  };

  React.useEffect(() => {
    setIsShowing(true);
    getCategories();
    getLocations();
  }, []);

  return (
    <>
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
          onSubmit={(e) => deleteProperty(e)}
          className="w-[95%]  mt-12 bg-white z-1 rounded-xl z-10 p-4 flex flex-wrap gap-8 justify-between"
        >
          <div className="w-[48%] h-10 flex justify-between items-center">
            <Input name="placa" label="Placa" type="text" onChange={(e) => handleInputChange(e)} />
            {loading ? (
              <div className="ml-4">
                <ThreeDots color={"#4F63D7"} height={45} width={46} />
              </div>
            ) : (
              <button
                type="submit"
                className="w-16 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 ml-4 "
                onClick={(event) => {
                  getProperty(event);
                }}
              >
                <Icon.MagnifyingGlassIcon className="w-5 h-5 " />
              </button>
            )}
          </div>

          <div className={`w-[48%] h-10 flex justify-between items-center  opacity-60`}>
            <Input
              label="Descrição"
              name="descricao"
              type="text"
              value={property?.descricao}
              disabled={disabled}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center  opacity-60`}>
            <Input
              label="Valor"
              name="valor"
              type="text"
              disabled={disabled}
              value={property?.valor}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center  opacity-60`}>
            <label className="w-36 text-c5 font-medium shrink-0">Localização</label>
            <Select
              disabled={true}
              selected={selected.location || property?.localizacao?.descricao}
              setSelected={(e) => (
                setProperty({ ...property, id_localizacao: e.id }), setSelected({ ...selected, location: e.descricao })
              )}
              options={locations}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center  opacity-60`}>
            <label className="w-36 text-c5 font-medium shrink-0">Categoria</label>
            <Select
              disabled={true}
              selected={selected.category || property?.categoria?.descricao}
              setSelected={(e) => (
                setProperty({ ...property, id_categoria: e.id }), setSelected({ ...selected, category: e.descricao })
              )}
              options={categories}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center  opacity-60`}>
            <label className="w-36 text-c5 font-medium shrink-0 ">Conservação</label>
            <Select
              disabled={true}
              selected={selected.condition || property?.estado}
              setSelected={(e) => {
                setProperty({ ...property, estado: e.descricao }), setSelected({ ...selected, condition: e.descricao });
              }}
              options={conditions}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center  opacity-60`}>
            <label className="w-36 text-c5 font-medium shrink-0">Origem</label>
            <Select
              disabled={true}
              selected={selected.origin || property?.origem}
              setSelected={(e) => {
                setProperty({ ...property, origem: e.descricao }), setSelected({ ...selected, origin: e.descricao });
              }}
              options={origins}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
            <Input
              label="Data de Saída"
              name="data_saida"
              type="date"
              disabled={disabled}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
            <Input
              label="Data de Aquisição"
              name="data_aquisicao"
              type="date"
              disabled={disabled}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={`w-[48%] h-10 flex justify-between items-center ${disabled && "opacity-60"}`}>
            <Input
              label="Resp. pela Retirada"
              name="resp_retirada"
              type="text"
              disabled={disabled}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <Button label="Baixar" type="submit" disabled={disabled} />
        </form>
      </Transition>
    </>
  );
};

export default RemoveProperty;
