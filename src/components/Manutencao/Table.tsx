import { Maintance } from "@/models/maintance";
import moment from "moment";
import React from "react";
import { Transition } from "@headlessui/react";
import api from "@/tools/api";
import { toast } from "react-toastify";

interface TableProps {
  maintance: Maintance[];
  getMaintances: () => void;
}

const Table: React.FC<TableProps> = ({ maintance, getMaintances }) => {
  const [isShowing, setIsShowing] = React.useState(true);

  const moneyMask = (value: any) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const updateMaintance = async (id: number) => {
    api
      .put(
        `/manutencao/baixa/${id}`,
        {
          data_fim: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response: any) => {
        toast.success("Manutenção finalizada com sucesso");
        getMaintances();
      })
      .catch((error: any) => {
        toast.error("Erro ao finalizar manutenção");
      });
  };

  return (
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
      <table className="w-full max-h-40 overflow-y-scroll flex flex-col items-center rounded-xl overflow-auto border-2 border-c4 scrollbar-thin">
        <thead className="w-full flex justify-between items-center ">
          <tr className="w-full h-auto flex justify-between items-center bg-c1 p-4 ">
            <th className="w-1/6 h-full flex  items-center">Patrimônio</th>
            <th className="w-2/6 h-full flex  items-center">Descrição</th>
            <th className="w-1/6 h-full flex  items-center">Inicío</th>
            <th className="w-1/6 h-full flex  items-center">Término</th>
            <th className="w-1/6 h-full flex  items-center">Prestador</th>
            <th className="w-24 h-full flex  items-center">Valor</th>
            <th className="w-24 h-full flex  items-center justify-center">Status</th>
          </tr>
        </thead>
        <tbody className="w-full h-5/6 flex flex-col items-center">
          {maintance?.map((item: any, index: any) => (
            <tr className={`w-full flex items-center p-4  ${index % 2 == 0 ? `` : `bg-c1`}`} key={index}>
              <td className="w-1/6 h-full flex items-center">{item?.patrimonio?.placa}</td>
              <td className="w-2/6 h-full flex items-center">{item?.descricao}</td>
              <td className="w-1/6 h-full flex items-center">{moment.utc(item.data_inicio).format("DD/MM/YYYY")}</td>
              <td className="w-1/6 h-full flex items-center">{moment.utc(item.data_fim).format("DD/MM/YYYY")}</td>
              <td className="w-1/6 h-full flex items-center ">
                {item?.prestador?.nome} {item?.prestador?.sobrenome}
              </td>
              <td className="w-24 h-full flex items-center">{moneyMask(item?.valor)}</td>
              <td className="w-24 h-full flex justify-center items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={item?.status === 0}
                  onChange={() => {
                    updateMaintance(item.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Transition>
  );
};

export default Table;
