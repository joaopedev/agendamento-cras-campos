import React, { ReactNode } from "react";
import { SignIn, RegisterUserModel, RegisterSchedullingModel, RegisterEmployee } from "../types/auth-data";
import { IAllUsers, IUserModel } from "./User";
import { ISchedulingModel } from "./Schedulling";

export interface IAuthProvider {
  children: ReactNode;
}

export interface IPayload {
  email: string;
  id: string;
  exp: number;
  iat: number;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  signIn: (data: SignIn) => Promise<void>;
  signOut: () => Promise<void>;
  registerUser: (data: RegisterUserModel) => Promise<void>;
  registerEmployee: (data: RegisterEmployee) => Promise<void>;
  getUser: (id: string) => Promise<IUserModel>;
  getAllUsers: () => Promise<IAllUsers>;
  payload: IPayload | null;
  setPayload: React.Dispatch<React.SetStateAction<IPayload | null>>;
  token: string | null;
  getAllSchedulling: () => Promise<ISchedulingModel>;
  registerSchedulling: (data: RegisterSchedullingModel) => Promise<void>
}
