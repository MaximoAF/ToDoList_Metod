import { FC } from "react";
import { ITarea } from "../../../types/Tarea/ITarea";
import styles from "./TareaBacklog.module.css";
import { useBacklogStore } from "../../../store/backlogStore";
import { useSprintStore } from "../../../store/sprintStore";

interface ITareaBacklogProps {
  tarea: ITarea;
  showModale: () => void;
  deleteTarea: () => void;
  viewTarea: () => void;
}

export const TareaBacklog: FC<ITareaBacklogProps> = ({
  tarea,
  showModale,
  deleteTarea,
  viewTarea
}) => {
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
          onChange={(e) => e.preventDefault}
          className={styles.tareaBacklog__input}
        >
          <option value="">Seleccione un Sprint</option>
          {useSprintStore.getState().sprints.map((spr) => (
            <option value={spr.nombre}>{spr.nombre}</option>
          ))}
        </select>
        <button 
        className={styles.tareaBacklog__buttonAction}
        onClick={() => handleViewTarea()}>
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
