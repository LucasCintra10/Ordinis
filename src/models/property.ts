export interface Property {
  id: string;
  placa: string;
  descricao: string;
  estado: string;
  valor: string;
  origem: string;
  data_entrada: Date;
  data_saida: Date;
  resp_entrega: string;
  resp_retirada: string;
  id_localizacao: string;
  id_categoria: string;
}
