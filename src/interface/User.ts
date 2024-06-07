export interface IEndereco {
  rua: string;
  numero: number;
  bairro: string;
}

export enum TipoUsuario {
  comum = 1,
  admin,
  superAmin,
}

export enum Cras {
  CODIN = 1,
  CUSTODÓPOLIS,
  JARDIM_CARIOCA,
  PARQUE_ESPLANADA,
  CHATUBA,
  MATADOURO,
  PENHA,
  GOITACAZES,
  PARQUE_GUARU,
  TRAVESSAO,
  MORRO_DO_COCO,
  TAPERA,
}

export interface IUserModel {
  id?: string;
  name: string;
  email?: string;
  cpf: string;
  dataNascimento: string;
  password: string;
  telefone: string;
  endereco: IEndereco;
  tipoUsuario: TipoUsuario;
  cras: Cras;
  ativo: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  [key: string]: any;
}
