import { TipoUsuario, Cras, IEndereco } from '../interface/User';

export type SignIn = {
  cpf: string;
  password: string;
};

export type RegisterUserModel = {
  tipoUsuario: TipoUsuario;
  cras: Cras;
  name: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email?: string;
  password: string;
  endereco: IEndereco;
};

export interface RegisterSchedullingModel {
  servico?: number;
  status?: number;
  name: string;
  cras: NonNullable<Cras>;
  usuario_id: string;
  description: string;
  data_hora: string;
}

export interface UpdateStatusSchedullingModel {
  status?: number;
  usuario_id: string;
}