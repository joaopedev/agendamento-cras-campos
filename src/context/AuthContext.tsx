import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { IAuthContext, IAuthProvider, IPayload } from "../interface/AuthProps";
import { SignIn, RegisterUserModel, RegisterSchedullingModel, RegisterEmployee } from "../types/auth-data";
import {
  getUserRequest,
  loginRequest,
  registerRequest,
  getSchedullingRequest,
  registerSchedullingRequest,
  getAllUsersRequest,
  registerEmployeeRequest,
} from "../services/auth-request";
import { IAllUsers, IUserModel } from "../interface/User";
import { ISchedulingModel } from "../interface/Schedulling";

export const AuthContext = createContext({} as IAuthContext);
export const AuthProvider = ({ children }: IAuthProvider) => {
  const [payload, setPayload] = useState<IPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getUserFromToken = (token: string) => {
    try {
      const decoded = jwtDecode<any>(token);
      return decoded;
    } catch (error) {
      return null;
    }
  };

  const getToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = getUserFromToken(token);
      if (payload) {
        setToken(token);
        setPayload(payload);
        setIsAuthenticated(true);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      } else {
        localStorage.removeItem("token");
        setToken(null);
        setPayload(null);
        setIsAuthenticated(false);
        delete axios.defaults.headers.common["Authorization"];
      }
    }
  };

  useEffect(() => {
    getToken();
  }, [token]);

  const signIn = async ({ cpf, password }: SignIn) => {
    const { data } = await loginRequest({
      cpf,
      password,
    });
    const { token } = data;
    localStorage.setItem("token", token);
    setToken(token);
    setPayload(getUserFromToken(token));
  };

  const registerUser = async ({
    cpf,
    cras,
    dataNascimento,
    email,
    endereco,
    name,
    password,
    telefone,
    tipoUsuario,
  }: RegisterUserModel) => {
    await registerRequest({
      cpf,
      cras,
      dataNascimento,
      email,
      endereco,
      name,
      password,
      telefone,
      tipoUsuario,
    });
  };

  const getUser = async (id: string): Promise<IUserModel> => {
    const { data } = await getUserRequest(id);
    return data;
  };

  const registerSchedulling = async ({
    name,
    usuario_id,
    servico,
    description,
    duracao_estimada,
    data_hora,
    cras,
    status,
  }: RegisterSchedullingModel) => {
    await registerSchedullingRequest({
      name,
      usuario_id,
      servico,
      description,
      duracao_estimada,
      data_hora,
      cras,
      status,
    });
  };

  const registerEmployee = async ({
    cpf,
    cras,
    dataNascimento,
    email,
    name,
    password,
    telefone,
    tipoUsuario,
  }: RegisterEmployee) => {
    await registerEmployeeRequest({
      cpf,
      cras,
      dataNascimento,
      email,
      name,
      password,
      telefone,
      tipoUsuario,
    });
  };

  const getAllSchedulling = async (): Promise<ISchedulingModel> => {
    const { data } = await getSchedullingRequest();
    return data;
  };

  const getEmployee = async (): Promise<IAllUsers> => {
    const { data } = await getAllUsersRequest();
    return data;
  };
  
  const signOut = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setPayload(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        registerEmployee,
        payload,
        setPayload,
        isAuthenticated,
        signIn,
        registerUser,
        signOut,
        getUser,
        getAllUsers: getEmployee,
        token,
        getAllSchedulling,
        registerSchedulling
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
