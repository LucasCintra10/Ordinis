import * as XLSX from "xlsx";
import moment from "moment";
import { Property } from "@/models/property";

export default function exportToExcel(property: Property[]) {

  const moneyFormat = (value: any) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const sheetName = "Patrimônios";
  const fileName = "patrimonios.xlsx";
  const data = [
    [
      "Placa",
      "Categoria",
      "Localização",
      "Valor",
      "Origem",
      "Conservação",
      "Data de Entrada",
      "Resp. Entrada",
      "Status",
      "Data de Saída",
      "Resp. Entrega",
      "Resp. Retirada",
    ],
    ...property?.map((patrimonio) => [
      patrimonio.placa,
      patrimonio.categoria.descricao,
      patrimonio.localizacao.descricao,
      moneyFormat(patrimonio?.valor),
      patrimonio.origem,
      patrimonio.estado,
      moment.utc(patrimonio.data_entrada).format("DD/MM/YYYY"),
      patrimonio.usuario.nome + " " + patrimonio.usuario.sobrenome,
      patrimonio.status === 1 ? "Ativo" : "Baixado",
      patrimonio.data_saida ? moment.utc(patrimonio.data_saida).format("DD/MM/YYYY") : "-",
      patrimonio.resp_entrega ? patrimonio.resp_entrega : "-",
      patrimonio.resp_retirada ? patrimonio.resp_retirada : "-",
    ]),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);

}
