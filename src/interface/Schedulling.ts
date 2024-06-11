import { Cras } from "./User";

export interface ISchedulingModel {
  id?: string;
  name: string;
  usuario_id: string;
  servico: TipoServico;
  description: string;
  duracao_estimada: Date;
  data_hora: Date;
  cras: Cras;
  status: Status;
  message: string,
  agendamentos: []
}

export interface ISchedulingResponse {
  message: string;
  agendamentos: ISchedulingModel[];
}

export enum Status {
  cancelado = 0,
  realizado,
  pendente,
  ausente,
}

export enum TipoServico {
  cadastramento = 1,
  outros,
}
