import { ICreateSprint } from "../../types/Sprint/ICreateSprint";
import { ISprint } from "../../types/Sprint/ISprint";

const BASE_URL = `${import.meta.env.VITE_API_URL}/sprints`;

export const getAllSprints = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

export const getSprintById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return await res.json();
};

export const crearSprint = async (sprint: ICreateSprint) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sprint),
  });
  return await res.json();
};

export const actualizarSprint = async (id: string, sprint: ISprint) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sprint),
  });
  return await res.json();
};

export const eliminarSprint = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
