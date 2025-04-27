import { ICreateSprint } from "../../types/Sprint/ICreateSprint";
import { ISprint } from "../../types/Sprint/ISprint";
import { ITarea } from "../../types/Tarea/ITarea";

const BASE_URL = `${import.meta.env.VITE_API_URL}/sprintList`;

/* 🔹 Obtener todos los sprints */
export const getAllSprints = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data.sprints;
};

/* 🔹 Obtener sprint por ID */
export const getSprintById = async (id: string) => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data.sprints.find((s: ISprint) => s.id === id);
};

/* 🔹 Crear nuevo sprint */
export const crearSprint = async (sprint: ICreateSprint) => {
  const sprints = await getAllSprints();
  const nuevoSprint = { ...sprint, id: Date.now().toString(), tareas: [] };
  const nuevosSprints = [...sprints, nuevoSprint];

  await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sprints: nuevosSprints }),
  });

  return nuevoSprint;
};

/* 🔹 Actualizar sprint */
export const actualizarSprint = async (sprint: ISprint) => {
  const sprints = await getAllSprints();
  const nuevosSprints = sprints.map((s: ISprint) =>
    s.id === sprint.id ? sprint : s
  );

  await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sprints: nuevosSprints }),
  });

  return sprint;
};

/* 🔹 Agregar tarea a sprint */
export const agregarTareaASprint = async (sprintId: string, tarea: ITarea) => {
  const sprints = await getAllSprints();
  const nuevosSprints = sprints.map((s: ISprint) =>
    s.id === sprintId
      ? { ...s, tareas: [...s.tareas, { ...tarea, id: Date.now().toString() }] }
      : s
  );

  await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sprints: nuevosSprints }),
  });

  return true;
};

/* 🔹 Actualizar tarea de sprint */
export const updateTareaASprint = async (sprintId: string, tarea: ITarea) => {
  const sprints = await getAllSprints();
  const nuevosSprints = sprints.map((s: ISprint) => {
    if (s.id === sprintId) {
      const tareasActualizadas = s.tareas.map((t) =>
        t.id === tarea.id ? tarea : t
      );
      return { ...s, tareas: tareasActualizadas };
    }
    return s;
  });

  await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sprints: nuevosSprints }),
  });

  return true;
};

/* 🔹 Eliminar tarea de sprint */
export const eliminarTareaDeSprint = async (sprintId: string, tareaId: string) => {
  const sprints = await getAllSprints();
  const nuevosSprints = sprints.map((s: ISprint) => {
    if (s.id === sprintId) {
      const nuevasTareas = s.tareas.filter((t) => t.id !== tareaId);
      return { ...s, tareas: nuevasTareas };
    }
    return s;
  });

  await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sprints: nuevosSprints }),
  });

  return true;
};

/* 🔹 Eliminar sprint */
export const eliminarSprint = async (id: string) => {
  const sprints = await getAllSprints();
  const nuevosSprints = sprints.filter((s: ISprint) => s.id !== id);

  await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sprints: nuevosSprints }),
  });

  return true;
};
