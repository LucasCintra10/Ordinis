import React from "react";
import Select from "@/components/Select";
import { Condition } from "@/models/condition";
import api from "@/tools/api";
import { Category } from "@/models/category";
import { Property } from "@/models/property";
import * as Icon from "@heroicons/react/24/outline";
import AddCategoryModal from "../Modals/category/AddCategoryModal";
import SelectCategory from "../Select/SelectCategory";

const AddProperty: React.FC = () => {
  const conditions: Condition[] = [
    { id: 1, name: "Regular" },
    { id: 2, name: "Bom" },
    { id: 3, name: "Ruim" },
  ];

  const [selected, setSelected] = React.useState({
    category: "",
    condition: "",
  });

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [property, setProperty] = React.useState({} as Property);

  const [addCategoryModal, setAddCategoryModal] = React.useState(false);

  const getCategories = async () => {
    api
      .get("/categoria/get-all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response : any) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error : any) => {
        console.log(error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setProperty({ ...property, [event.target.name]: event.target.value });
  };

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setAddCategoryModal(true);
  };
  React.useEffect(() => {
    getCategories();
  }, []);

  console.log(property);

  return (
    <>
      <AddCategoryModal isOpen={addCategoryModal} setIsOpen={setAddCategoryModal} />
      <form className="w-2/5 h-2/3 mt-4 bg-white z-1 rounded-xl z-10 p-4 flex flex-col gap-4 box-border ">
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
          <input name="valor" type="text" className="w-96 h-full bg-c1 rounded" onChange={(e) => handleInputChange(e)} />
        </div>
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Localização</label>
          <input type="text" className="w-96 h-full bg-c1 rounded" />
        </div>
        <div className="w-full h-32 flex justify-between items-center gap-2">
          <label className=" text-c5 font-medium ">Categoria</label>
          <div className="w-96 h-full flex items-center justify-between">
            <button
              className="w-14 h-full bg-p3 rounded text-white flex items-center justify-center transition-all hover:opacity-90 "
              onClick={(event) => {
                openModal(event);
              }}
            >
              <Icon.PlusIcon className="w-6 h-6 " />
            </button>
            <SelectCategory
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
          <Select selected={property.estado} setSelected={(e) => setProperty({ ...property, estado: e })} options={conditions} />
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

        <button className="w-full h-32  self-center bg-p3 text-white text-xl rounded flex justify-center items-center gap-2  transition-all hover:opacity-90">
          Cadastrar
        </button>
      </form>
      ;
    </>
  );
};

export default AddProperty;
