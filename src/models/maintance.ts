export interface Maintance {
  description: string;
  data_inicio: Date;
  data_fim: Date;
  valor: number;
  id_prestador: string;
  patrimonio?: {
    id: string;
    placa: string;
  };
  prestador?: {
    id: string;
    nome: string;
    sobrenome: string;
  };
  id_usuario?: string;
}
