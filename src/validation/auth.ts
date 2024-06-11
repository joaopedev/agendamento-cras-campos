import * as Yup from "yup";
import { TipoUsuario, Cras } from "../interface/User";

export const loginSchema = Yup.object().shape({
  cpf: Yup.string().required("O CPF é obrigatório"),
  password: Yup.string().required("A senha é obrigatória"),
});

export const EnderecoSchema = Yup.object().shape({
  rua: Yup.string().required("Rua é obrigatória"),
  numero: Yup.number()
    .typeError("Insira um número inteiro")
    .required("Número é obrigatório")
    .integer("Insira um número inteiro"),
  bairro: Yup.string().required("Bairro é obrigatório"),
});

export const RegisterUserSchema = Yup.object().shape({
  name: Yup.string().required("Nome completo é obrigatório"),
  cpf: Yup.string()
    .required("CPF é obrigatório")
    .min(11, "Insira 11 números")
    .max(11, "Insira 11 números"),
  dataNascimento: Yup.string().required("Data de nascimento é obrigatória"),
  telefone: Yup.string().required("Telefone é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(8, "Insira no minímo 8 caracteres")
    .max(16, "Insira no máximo 16 caracteres"),
  endereco: EnderecoSchema.required("Endereço é obrigatório"),
  tipoUsuario: Yup.mixed<TipoUsuario>()
    .oneOf(Object.values(TipoUsuario) as number[])
    .required("Selecione o tipo do usuário"),
  cras: Yup.mixed<Cras>()
    .oneOf(Object.values(Cras) as number[])
    .required("Selecione o CRAS"),
});

export const RegisterSchedullingSchema = Yup.object().shape({
  name: Yup.string().required("Nome do agendamento obrigatorio"),
  usuario_id: Yup.string()
    .required("CPF é obrigatório")
    .min(11, "Insira 11 números")
    .max(11, "Insira 11 números"),
  servico: Yup.number(),
  description: Yup.string().required("Telefone é obrigatório"),
  duracao_estimada: Yup.string().required("Data e hora"),
  data_hora: Yup.string().required("Data e hora"),
  cras: Yup.mixed<Cras>()
    .oneOf(Object.values(Cras) as number[])
    .required("Selecione o CRAS"),
  status: Yup.number()  
});
