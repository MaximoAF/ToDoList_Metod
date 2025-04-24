import { ICreateSprint } from "../../types/Sprint/ICreateSprint";
import { ISprint } from "../../types/Sprint/ISprint";
import { ITarea } from "../../types/Tarea/ITarea";

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

export const actualizarSprint = async (sprint: ISprint) => {
  const res = await fetch(`${BASE_URL}/${sprint.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sprint),
  });
  return await res.json();
};

export const agregarTareaASprint = async (sprintId: string, tarea: ITarea) => {
  const sprintRes = await fetch(`${BASE_URL}/${sprintId}`);
  const sprint = await sprintRes.json();

  const nuevasTareas = [...sprint.tareas, tarea];

  const res = await fetch(`${BASE_URL}/${sprintId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tareas: nuevasTareas }),
  });

  return await res.json();
};

export const updateTareaASprint = async (sprintId: string, tarea: ITarea) => {
  const sprintRes = await fetch(`${BASE_URL}/${sprintId}`);
  const sprint: ISprint = await sprintRes.json();

  /* 2. Buscamos si la tarea ya existe */
  const tareasActualizadas = sprint.tareas.some((t) => t.id === tarea.id)
    ? sprint.tareas.map((t) => (t.id === tarea.id ? tarea : t)) // reemplazar
    : [...sprint.tareas, tarea]; // agregar al final

  /* 3. Enviamos el PATCH (solo cambia el array tareas) */
  const res = await fetch(`${BASE_URL}/${sprintId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tareas: tareasActualizadas }),
  });

  return await res.json();
};

export const eliminarTareaDeSprint = async (sprintId: string, tareaId: string) => {
  const res = await fetch(`${BASE_URL}/${sprintId}`);
  const sprint = await res.json();

  // Filtrar las tareas para eliminar la deseada
  const nuevasTareas = sprint.tareas.filter((t:ITarea) => t.id !== tareaId);

  const updateRes = await fetch(`${BASE_URL}/${sprintId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tareas: nuevasTareas }),
  });

  return await updateRes.json();
};

export const eliminarSprint = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
