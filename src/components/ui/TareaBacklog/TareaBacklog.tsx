import { FC, useState } from "react";
import { ITarea } from "../../../types/Tarea/ITarea";
import styles from "./TareaBacklog.module.css";
import { useBacklogStore } from "../../../store/backlogStore";
import { useSprintStore } from "../../../store/sprintStore";
import { ISprint } from "../../../types/Sprint/ISprint";
import { agregarTareaASprint, eliminarTareaDeSprint } from "../../../services/sprints/sprintsServices";

interface ITareaBacklogProps {
  tarea: ITarea;
  sprints: ISprint[];
  showModale: () => void;
  deleteTarea: () => void;
  viewTarea: () => void;
}

export const TareaBacklog: FC<ITareaBacklogProps> = ({
  tarea,
  sprints,
  showModale,
  deleteTarea,
  viewTarea,
}) => {
  const [loading, setLoading] = useState(false);
  const handleEditTarea = () => {
    useBacklogStore.getState().setActiveTarea(tarea);
    showModale();
  };
  const handleDeleteTarea = () => {
    useBacklogStore.getState().setActiveTarea(tarea);
    deleteTarea();
  };
  const handleViewTarea = () => {
    useBacklogStore.getState().setActiveTarea(tarea);
    viewTarea();
  };

  const obtenerSprintId = () => {
    const sprintID = sprints.find((s) =>
      s.tareas.some((t) => String(t.id) === String(tarea.id))
    );
    return sprintID ? sprintID.id : "";
  };

  const handleSelectSprint = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true)
    const sprintId = e.target.value;
  
    const sprintAnterior = sprints.find((s) =>
      s.tareas.some((t) => String(t.id) === String(tarea.id))
    );
  
    if (sprintAnterior) {
      await eliminarTareaDeSprint(sprintAnterior.id, tarea.id);
      useSprintStore.getState().removeTareaASprint(tarea.id, sprintAnterior.id);
    }
  
    if (!sprintId) return setLoading(false);
  
    await agregarTareaASprint(sprintId, tarea);
    useSprintStore.getState().addTareaASprint(tarea, sprintId);
    setLoading(false)
  };

  return (
    <div className={styles.tareaBacklog__container}>
      <p>
        <b>{tarea.titulo}:</b> {tarea.descripcion}
      </p>
      <div
        style={{ display: "flex", justifyContent: "flex-end", gap: ".2rem" }}
      >
        <button className={styles.tareaBacklog__input}>
          Enviar a{" "}
          <span>
            <i className="fa-solid fa-envelope"></i>
          </span>
        </button>
        <select
          id="options"
          onChange={handleSelectSprint}
          className={styles.tareaBacklog__input}
          style={{width: "12rem"}}
          value={obtenerSprintId()}
        >
          <option value="">{loading ? "Cargando..." : "Seleccione un Sprint"}</option>
          {sprints.map((spr) => (
            <option key={spr.id} value={spr.id}>
              {spr.nombre}
            </option>
          ))}
        </select>
        <button
          className={styles.tareaBacklog__buttonAction}
          onClick={() => handleViewTarea()}
        >
          <i
            style={{ color: "var(--white-color)" }}
            className="fa-solid fa-eye"
          ></i>
        </button>
        <button
          className={styles.tareaBacklog__buttonAction}
          onClick={() => handleEditTarea()}
        >
          <i
            style={{ color: "var(--white-color)" }}
            className="fa-solid fa-pen"
          ></i>
        </button>
        <button
          className={styles.tareaBacklog__buttonAction}
          onClick={() => handleDeleteTarea()}
        >
          <i
            style={{ color: "var(--white-color)" }}
            className="fa-solid fa-trash"
          ></i>
        </button>
      </div>
    </div>
  );
};
