import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Remove this line
import { createContext, useEffect, useState, useCallback } from 'react';
import { IAuthContext, IAuthProvider, IPayload } from '../interface/AuthProps';
import {
  SignIn,
  RegisterUser,
  RegisterSchedulling,
  RegisterEmployee,
} from '../types/auth-data';
import {
  getUserRequest,
  loginRequest,
  registerRequest,
  registerEmployeeRequest,
  getSchedullingRequest,
  registerSchedullingRequest,
} from '../services/auth-request';
import { IUserModel } from '../interface/User';
import { ISchedulingModel } from '../interface/Schedulling';

export const AuthContext = createContext({} as IAuthContext);
export const AuthProvider = ({ children }: IAuthProvider) => {
  const [payload, setPayload] = useState<IPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [funcionarios, setFuncionarios] = useState<IUserModel[]>([]); // Inside useEffect to prevent re-creation on every render

  function getUserFromToken(token: string): IPayload | null {
    try {
      // Decode the token and extract the payload
      return jwtDecode(token);
    } catch (error) {
      // Handle invalid tokens (e.g., expired or malformed)
      console.error('Error decoding token:', error);
      return null;
    }
  }

  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = getUserFromToken(token);
        if (payload) {
          setToken(token);
          setPayload(payload);
          setIsAuthenticated(true);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        } else {
          localStorage.removeItem('token');
          setToken(null);
          setPayload(null);
          setIsAuthenticated(false);
          delete axios.defaults.headers.common['Authorization'];
        }
      }
    };
    getToken();
  }, []); // Empty dependency array ensures this runs only once on mount

  const fetchFuncionarios = useCallback(async () => {
    try {
      const response = await axios.get('/api/users', {
        params: { tipoUsuario: 2 },
      });
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFuncionarios();
    }
  }, [isAuthenticated, fetchFuncionarios]);

  const signIn = async ({ cpf, password }: SignIn) => {
    const { data } = await loginRequest({
      cpf,
      password,
    });
    const { token } = data;
    localStorage.setItem('token', token);
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
  }: RegisterUser) => {
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
  }: RegisterSchedulling) => {
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

  const getSchedulling = async (): Promise<ISchedulingModel> => {
    const { data } = await getSchedullingRequest();
    return data;
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setToken(null);
    setPayload(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        payload,
        setPayload,
        isAuthenticated,
        signIn,
        registerUser,
        registerEmployee,
        signOut,
        getUser,
        token,
        getSchedulling,
        registerSchedulling,
        funcionarios,
        fetchFuncionarios,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
