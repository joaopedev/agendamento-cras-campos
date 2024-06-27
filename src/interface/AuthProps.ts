import React, { ReactNode } from "react";
import { SignIn, RegisterUserModel, RegisterSchedullingModel, UpdateStatusSchedullingModel } from "../types/auth-data";
import { IUserModel, IUsersModule } from "./User";
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
  getUser: (id: string) => Promise<IUserModel>;
  getUserAll: () => Promise<IUsersModule>
  payload: IPayload | null;
  setPayload: React.Dispatch<React.SetStateAction<IPayload | null>>;
  token: string | null;
  getAllSchedulling: () => Promise<ISchedulingModel>;
  registerSchedulling: (data: RegisterSchedullingModel) => Promise<void>
  updateSchedullingStatus?: (data: UpdateStatusSchedullingModel) => Promise<void>
}
