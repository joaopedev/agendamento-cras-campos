import { Status, TipoServico } from '../interface/Schedulling';
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

export type RegisterEmployee = {
  tipoUsuario: TipoUsuario;
  cras: Cras;
  name: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email?: string;
  password: string;
};

export interface RegisterSchedullingModel {
  servico?: number;
  status?: number;
  name: string;
  cras: NonNullable<Cras>; // Ensure this matches your Yup schema type
  usuario_id: string;
  description: string;
  duracao_estimada: string;
  data_hora: string;
}
