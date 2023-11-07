import { Maintenance } from "@/models/maintenance";
import moment from "moment";
import React from "react";
import api from "@/tools/api";
import { toast } from "react-toastify";
import TransitionEffect from "../TransitionEffect";

interface TableProps {
  maintenance: Maintenance[];
}

const Report: React.FC<TableProps> = ({ maintenance }) => {
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
      })
      .catch((error: any) => {
        toast.error("Erro ao finalizar manutenção");
      });
  };

  return (
    <TransitionEffect isShowing={isShowing} >
      <table className="w-full max-h-[24rem] h-auto flex flex-col items-center rounded-xl overflow-auto scrollbar-thin">
        <thead className="w-full flex justify-between items-center ">
          <tr className="w-full h-auto flex justify-between items-center bg-c1 p-4 gap-2">
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
          {maintenance?.map((item: any, index: any) => (
            <tr className={`w-full flex items-center p-4 gap-2  ${index % 2 == 0 ? `` : `bg-c1`}`} key={index}>
              <td className="w-1/6 h-full flex items-center">{item?.patrimonio?.placa}</td>
              <td className="w-2/6 h-full flex items-center">{item?.descricao}</td>
              <td className="w-1/6 h-full flex items-center">{moment.utc(item.data_inicio).format("DD/MM/YYYY")}</td>
              <td className="w-1/6 h-full flex items-center">{moment.utc(item.data_fim).format("DD/MM/YYYY")}</td>
              <td className="w-1/6 h-full flex items-center truncate ">
                {item?.prestador?.nome} {item?.prestador?.sobrenome}
              </td>
              <td className="w-24 h-full flex items-center truncate">{moneyMask(item?.valor)}</td>
              <td className="w-24 h-full flex justify-center items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={item?.status === 0}
                  disabled={item?.status === 0}
                  onChange={() => {
                    updateMaintance(item.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TransitionEffect>
  );
};

export default Report;
