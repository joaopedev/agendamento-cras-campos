import { api } from "../api";
import { SignIn, RegisterUser, RegisterSchedulling } from "../types/auth-data";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interface/Feedeback";

export const loginRequest = async (data: SignIn) => {
  try {
    const response = await api.post("/login", data);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = "";
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

export const registerRequest = async (data: RegisterUser) => {
  try {
    const response = await api.post("/registerUsers", data);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = "";
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
    let errorMessage = "";
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
    let errorMessage = "";
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

export const registerSchedullingRequest = async (data: RegisterSchedulling) => {
  try {
    const response = await api.post("/registerUsers", data);
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    let errorMessage = "";
    if (errors.response && errors.response.data) {
      errorMessage = (errors.response.data as IErrorResponse).message;
      throw new Error(errorMessage);
    } else {
      alert(errors?.message);
      throw new Error(errors?.message);
    }
  }
};