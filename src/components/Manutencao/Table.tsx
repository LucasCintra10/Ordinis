import { Maintance } from "@/models/maintance";
import moment from "moment";
interface TableProps {
  maintance: Maintance[];
}

const Table: React.FC<TableProps> = ({ maintance }) => {
  const moneyFormat = (value: any) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <table className="w-full max-h-72 overflow-y-scroll flex flex-col items-center rounded-xl overflow-auto border-2 border-c4 ">
      <thead className="w-full flex justify-between items-center ">
        <tr className="w-full h-auto flex justify-between items-center bg-c1 p-4 ">
          <th className="w-1/6 h-full flex  items-center">Patrimônio</th>
          <th className="w-2/6 h-full flex  items-center">Descrição</th>
          <th className="w-1/6 h-full flex  items-center">Data de Inicío</th>
          <th className="w-1/6 h-full flex  items-center">Data de Término</th>
          <th className="w-1/6 h-full flex  items-center">Resp. Manutenção</th>
          <th className="w-1/6 h-full flex  items-center">Valor</th>
        </tr>
      </thead>
      <tbody className="w-full h-5/6 flex flex-col items-center">
        {maintance?.map((item: any, index: any) => (
          <tr className={`w-full flex items-center p-4  ${index % 2 == 0 ? `` : `bg-c1`}`} key={index}>
            <td className="w-1/6 h-full flex items-center">{item?.patrimonio?.placa}</td>
            <td className="w-2/6 h-full flex items-center">{item?.descricao}</td>
            <td className="w-1/6 h-full flex items-center">{moment.utc(item.data_inicio).format("DD/MM/YYYY")}</td>
            <td className="w-1/6 h-full flex items-center">{moment.utc(item.data_fim).format("DD/MM/YYYY")}</td>
            <td className="w-1/6 h-full flex items-center">
              {item?.prestador?.nome} {item?.prestador?.sobrenome}
            </td>
            <td className="w-1/6 h-full flex items-center">{item?.valor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
