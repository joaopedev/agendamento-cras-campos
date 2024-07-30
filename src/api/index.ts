import axios from "axios";

export const api = axios.create({
  baseURL: String(process.env.REACT_APP_API_URL),
  timeout: 5000,
  headers: {'AUTHORIZATION': 'agendamento'}
});
