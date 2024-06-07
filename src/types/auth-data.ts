import { TipoUsuario, Cras, IEndereco } from "../interface/User";

export type SignIn = {
  cpf: string;
  password: string;
};

export type RegisterUser = {
  tipoUsuario: TipoUsuario;
  cras: Cras;
  name: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  password: string;
  endereco: IEndereco;
};
