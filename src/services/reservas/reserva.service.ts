import axios, { AxiosResponse } from "axios";
import { ReservaBody } from "../../pages/Reservar/Reservar";

const API_URL = "http://localhost:3001/reservas";

export type Reserva = {
  nombre: string;
  _id?: string;
  apellido: string;
  reserva: string;
  start: string | Date;
  end: string | Date;
  status: string | undefined;
};

export const getAllReservas = (
  params: any
): Promise<AxiosResponse<Reserva[]>> => {
  return axios.get<Reserva[]>(API_URL, { params });
};

export const createReserva = (
  reserva: ReservaBody
): Promise<AxiosResponse<Reserva>> => {
  return axios.post<Reserva>(API_URL, reserva);
};

export const updateReserva = (
  reserva: Reserva
): Promise<AxiosResponse<Reserva>> => {
  return axios.patch<Reserva>(`${API_URL}/${reserva._id}`, reserva);
};
