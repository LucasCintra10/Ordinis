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
  status: number;
  id_localizacao: string;
  id_categoria: string;
  usuario: {
    id: string;
    nome: string;
    sobrenome: string;
  }
  localizacao: {
    id: string;
    descricao: string;
  };
  categoria: {
    id: string;
    descricao: string;
  }
}
