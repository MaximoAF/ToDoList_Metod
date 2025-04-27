import { ICreateTarea } from "../../types/Tarea/ICreateTarea";
import { ITarea } from "../../types/Tarea/ITarea";

const BASE_URL = `${import.meta.env.VITE_API_URL}/backlog`;

/* 🔹 Obtener todas las tareas */
export const getAllTareasBacklog = async (): Promise<ITarea[]> => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data.tareas;
};

/* 🔹 Crear nueva tarea */
export const crearTareaBacklog = async (nuevaTarea: ICreateTarea): Promise<ITarea> => {
  const tareas = await getAllTareasBacklog();
  const nuevaConId = { ...nuevaTarea, id: Date.now().toString() };
  const nuevasTareas = [...tareas, nuevaConId];

  await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tareas: nuevasTareas }),
  });

  return nuevaConId;
};

/* 🔹 Obtener tarea por ID */
export const getTareaBacklogById = async (id: string): Promise<ITarea | undefined> => {
  const tareas = await getAllTareasBacklog();
  return tareas.find((t) => t.id === id);
};

/* 🔹 Actualizar tarea */
export const actualizarTareaBacklog = async (tareaActualizada: ITarea): Promise<ITarea> => {
  const tareas = await getAllTareasBacklog();
  const nuevasTareas = tareas.map((t) =>
    t.id === tareaActualizada.id ? tareaActualizada : t
  );

  await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tareas: nuevasTareas }),
  });

  return tareaActualizada;
};

/* 🔹 Eliminar tarea */
export const eliminarTareaBacklog = async (id: string): Promise<void> => {
  const tareas = await getAllTareasBacklog();
  const nuevasTareas = tareas.filter((t) => t.id !== id);

  await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tareas: nuevasTareas }),
  });
};
