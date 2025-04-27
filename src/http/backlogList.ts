import axios from "axios";
import { ITarea } from '../types/Tarea/ITarea';
const BASE_URL = `${import.meta.env.VITE_API_URL}`;

// 🔹 Obtener todas las tareas del backlog
export const getBacklogList = async (): Promise<{ tareas: ITarea[] }> => {
  const response = await axios.get<{ tareas: ITarea[] }>(`${BASE_URL}/backlog`);
  return response.data;
};

// 🔹 Reemplazar toda la lista del backlog
export const putBacklogList = async (tareas: ITarea[]) => {
  await axios.put(`${BASE_URL}/backlog`, { tareas });
};
