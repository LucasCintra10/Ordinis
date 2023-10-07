import * as Icon from "@heroicons/react/24/outline";
import { ColorRing } from "react-loader-spinner";
import { Condition } from "@/models/condition";
import { Category } from "@/models/category";
import { Property } from "@/models/property";
import { Location } from "@/models/location";
import Select from "@/components/Select";
import { Origin } from "@/models/origin";
import { toast } from "react-toastify";
import api from "@/tools/api";
import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

const RemoveProperty: React.FC = () => {
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
    getCategories();
    getLocations();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => deleteProperty(e)}
        className="w-[95%]  mt-12 bg-white z-1 rounded-xl z-10 p-4 flex flex-wrap gap-8 justify-between"
      >
        <div className="w-[48%] h-10 flex justify-between items-center gap-2">
          <Input name="placa" label="Placa" type="text" onChange={(e) => handleInputChange(e)} />
          {loading ? (
            <ColorRing colors={["#1E35C6", "#3146D0", "#4F63D7", "#677BEC", "#37407A"]} height={45} width={45} />
          ) : (
            <button
              type="submit"
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 ml-4 "
              onClick={(event) => {
                getProperty(event);
              }}
            >
              <Icon.MagnifyingGlassIcon className="w-5 h-5 " />
            </button>
          )}
        </div>

        <div className={`w-[48%] h-10 flex justify-between items-center gap-2  opacity-60`}>
          <Input
            label="Descrição"
            name="descricao"
            type="text"
            disabled={disabled}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2  opacity-60`}>
          <Input label="Valor" name="valor" type="text" disabled={disabled} onChange={(e) => handleInputChange(e)} />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2  opacity-60`}>
          <label className=" text-c5 font-medium ">Localização</label>
          <Select
            disabled={true}
            selected={selected.location || property?.localizacao?.descricao}
            setSelected={(e) => (
              setProperty({ ...property, id_localizacao: e.id }), setSelected({ ...selected, location: e.descricao })
            )}
            options={locations}
          />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2  opacity-60`}>
          <label className=" text-c5 font-medium ">Categoria</label>
          <Select
            disabled={true}
            selected={selected.category || property?.categoria?.descricao}
            setSelected={(e) => (
              setProperty({ ...property, id_categoria: e.id }), setSelected({ ...selected, category: e.descricao })
            )}
            options={categories}
          />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2  opacity-60`}>
          <label className=" text-c5 font-medium ">Conservação</label>
          <Select
            disabled={true}
            selected={selected.condition || property?.estado}
            setSelected={(e) => {
              setProperty({ ...property, estado: e.descricao }), setSelected({ ...selected, condition: e.descricao });
            }}
            options={conditions}
          />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2  opacity-60`}>
          <label className=" text-c5 font-medium ">Origem</label>
          <Select
            disabled={true}
            selected={selected.origin || property?.origem}
            setSelected={(e) => {
              setProperty({ ...property, origem: e.descricao }), setSelected({ ...selected, origin: e.descricao });
            }}
            options={origins}
          />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <Input
            label="Data de Saída"
            name="data_saida"
            type="date"
            disabled={disabled}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <Input
            label="Data de Aquisição"
            name="data_aquisicao"
            type="date"
            disabled={disabled}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={`w-[48%] h-10 flex justify-between items-center gap-2 ${disabled && "opacity-60"}`}>
          <Input
            label="Responsável pela retirada"
            name="resp_retirada"
            type="text"
            disabled={disabled}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <Button label="Baixar" type="submit" disabled={disabled} />
      </form>
    </>
  );
};

export default RemoveProperty;
