import { Property } from "@/models/property";
import moment from "moment";
interface TableProps {
  property: Property[];
}

const Table: React.FC<TableProps> = ({ property }) => {
  const moneyFormat = (value: any) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <table className="w-full h-auto flex flex-col items-center rounded-xl overflow-auto scrollbar-thin">
      <thead className="w-full flex justify-between items-center ">
        <tr className="w-full h-auto flex justify-between items-center bg-c1 p-4 ">
          <th className="w-1/6 h-full flex  items-center">Placa</th>
          <th className="w-1/6 h-full flex  items-center">Categoria</th>
          <th className="w-1/6 h-full flex  items-center">Localização</th>
          <th className="w-1/6 h-full flex  items-center">Valor</th>
          <th className="w-1/6 h-full flex  items-center">Origem</th>
          <th className="w-1/6 h-full flex  items-center">Conservação</th>
          <th className="w-1/6 h-full flex  items-center">Data de Ent.</th>
          <th className="w-24 h-full flex  items-center">Status</th>

        </tr>
      </thead>
      <tbody className="w-full h-5/6 flex flex-col items-center">
        {property?.map((item: any, index: any) => (
          <tr className={`w-full flex items-center p-4  ${index % 2 == 0 ? `` : `bg-c1`}`} key={index}>
            <td className="w-1/6 h-full flex items-center truncate">{item?.placa}</td>
            <td className="w-1/6 h-full flex items-center truncate">{item?.categoria.descricao}</td>
            <td className="w-1/6 h-full flex items-center truncate">{item?.localizacao.descricao}</td>
            <td className="w-1/6 h-full flex items-center truncate">{moneyFormat(item?.valor)}</td>
            <td className="w-1/6 h-full flex items-center truncate">{item?.origem}</td>
            <td className="w-1/6 h-full flex items-center truncate">{item?.estado}</td>
            <td className="w-1/6 h-full flex items-center truncate">{moment.utc(item.data_entrada).format("DD/MM/YYYY")}</td>
            <td className="w-24 h-full flex items-center truncate">{item?.status === 1 ? "Ativo": "Baixado"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
