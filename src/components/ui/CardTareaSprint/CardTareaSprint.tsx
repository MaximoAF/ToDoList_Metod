import { FC } from "react";
import { ITarea } from "../../../types/Tarea/ITarea";
import styles from "./CardTareaSprint.module.css";
import { useBacklogStore } from "../../../store/backlogStore";

interface ICardTareaSprintProps {
  tarea: ITarea;
  showModale: () => void;
  deleteTarea: () => void;
  viewTarea: () => void;
}

export const CardTareaSprint: FC<ICardTareaSprintProps> = ({
  tarea,
  showModale,
  deleteTarea,
  viewTarea,
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
    <div className={styles.container}>
      <div>
      <p className={styles.tittle}>{tarea.titulo}</p>
      <p>{tarea.descripcion}</p>
      <p>Fecha limite: {tarea.fechaLimite}</p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", gap: ".2rem" }}
      >
        <button className={styles.input}>
          Enviar a{" "}
          <span>
            <i className="fa-solid fa-envelope"></i>
          </span>
        </button>
        <button className={styles.input}>
          Pendiente {" "}
          <span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </button>
        <button
          className={styles.buttonAction}
          onClick={() => handleViewTarea()}
        >
          <i
            style={{ color: "var(--white-color)" }}
            className="fa-solid fa-eye"
          ></i>
        </button>
        <button
          className={styles.buttonAction}
          onClick={() => handleEditTarea()}
        >
          <i
            style={{ color: "var(--white-color)" }}
            className="fa-solid fa-pen"
          ></i>
        </button>
        <button
          className={styles.buttonAction}
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
