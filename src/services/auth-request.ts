import { api } from '../api';
import {
  SignIn,
  RegisterUserModel,
  RegisterSchedullingModel,
} from '../types/auth-data';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../interface/Feedeback';
import { ISchedulingModel } from '../interface/Schedulling';

export const loginRequest = async (data: SignIn) => {
  try {
    const response = await api.post('/login', data);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = '';
    if (errors.response && errors.response.data instanceof Error) {
      errorMessage = (errors.response.data as IErrorResponse).message;
      alert(errorMessage);
      throw new Error(errorMessage);
    } else {
      alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const registerRequest = async (data: RegisterUserModel) => {
  try {
    const response = await api.post('/registerUsers', data);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = '';
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as IErrorResponse).message;
      throw new Error(errorMessage);
    } else {
      alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const getUserRequest = async (id: string) => {
  try {
    const response = await api.get(`/private/accountById/${id}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = '';
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as IErrorResponse).message;
      alert(errorMessage);
      throw new Error(errorMessage);
    } else {
      alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const getAllUsersRequest = async () => {
  try {
    const response = await api.get(`/private/account`);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = '';
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as IErrorResponse).message;
      alert(errorMessage);
      throw new Error(errorMessage);
    } else {
      alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const getSchedullingRequest = async () => {
  try {
    const response = await api.get(`/private/scheduling`);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = '';
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as IErrorResponse).message;
      alert(errorMessage);
      throw new Error(errorMessage);
    } else {
      alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const registerSchedullingRequest = async (
  data: RegisterSchedullingModel
) => {
  try {
    const response = await api.post('private/registerScheduling', data);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = '';
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as IErrorResponse).message;
      throw new Error(errorMessage);
    } else {
      alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const getAllSchedullingCrasRequest = async (cras: number) => {
  try {
    const response = await api.get(`/private/crasScheduling/${cras}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = '';
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as IErrorResponse).message;
      alert(errorMessage);
      throw new Error(errorMessage);
    } else {
      alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};

export const updateSchedulingRequest = async (
  id: number,
  usuario_id: string,
  updates: Partial<ISchedulingModel>
) => {
  try {
    const response = await api.put(
      `/private/updateScheduling/?id=${id}&usuario_id=${usuario_id}`,
      updates
    );
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = '';
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as IErrorResponse).message;
      alert(errorMessage);
    } else {
      errorMessage = errors?.message || 'Erro desconhecido';
      alert(errorMessage);
    }
    throw new Error(errorMessage);
  }
};
