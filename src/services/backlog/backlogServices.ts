import { ICreateTarea } from "../../types/Tarea/ICreateTarea";
import { ITarea } from "../../types/Tarea/ITarea";

const BASE_URL = `${import.meta.env.VITE_API_URL}/backlog`;

export const getAllTareasBacklog = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

export const getTareaBacklogById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return await res.json();
};

export const crearTareaBacklog = async (tarea: ICreateTarea) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarea),
  });
  return await res.json();
};

export const actualizarTareaBacklog = async (tarea: ITarea) => {
  const res = await fetch(`${BASE_URL}/${tarea.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarea),
  });
  return await res.json();
};

export const eliminarTareaBacklog = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
