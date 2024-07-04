import React, { ReactNode } from 'react';
import {
  SignIn,
  RegisterUserModel,
  RegisterSchedullingModel,

} from '../types/auth-data';
import { IAllUsers, IUserModel } from './User';
import { ISchedulingModel, ISchedulingResponse } from './Schedulling';

export interface IAuthProvider {
	children: ReactNode;
}

export interface IPayload {
  email: string;
  id: string;
  tipo_usuario: number;
  cras: number;
  exp: number;
  iat: number;
  name: string;
  cpf: string;
  telefone: string;
  endereco: {
    rua: string;
    numero: number;
    bairro: string;
  };
  data_nascimento: string;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  token: string | null;
  payload: IPayload | null;
  setPayload: React.Dispatch<React.SetStateAction<IPayload | null>>;
  signIn: (data: SignIn) => Promise<void>;
  signOut: () => Promise<void>;
  getAllUsers: () => Promise<IAllUsers>;
  registerUser: (data: RegisterUserModel) => Promise<void>;
  updateUser: (
    id: string,
    updates: Partial<IUserModel>
  ) => Promise<void>;
  getAllSchedulling: () => Promise<ISchedulingModel>;
  registerSchedulling: (data: RegisterSchedullingModel) => Promise<void>;
  getAllSchedullingCras: (cras: number) => Promise<ISchedulingResponse>;
  updateScheduling: (
    id: number,
    usuario_id: string,
    updates: Partial<ISchedulingModel>
  ) => Promise<void>;
}
