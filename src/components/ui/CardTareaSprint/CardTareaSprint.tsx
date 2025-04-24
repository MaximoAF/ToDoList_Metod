import { FC } from "react";
import { ITarea } from "../../../types/Tarea/ITarea";
import styles from "./CardTareaSprint.module.css";
import { useBacklogStore } from "../../../store/backlogStore";
import { useSprintStore } from "../../../store/sprintStore";
import { ISprint } from "../../../types/Sprint/ISprint";
import { updateTareaASprint } from "../../../services/sprints/sprintsServices";
import { actualizarTareaBacklog } from "../../../services/backlog/backlogServices";
import { differenceInCalendarDays, parseISO } from "date-fns";

interface ICardTareaSprintProps {
  tarea: ITarea;
  sprint: ISprint;
  showModale: () => void;
  deleteTarea: () => void;
  viewTarea: () => void;
}

export const CardTareaSprint: FC<ICardTareaSprintProps> = ({
  tarea,
  sprint,
  showModale,
  deleteTarea,
  viewTarea,
}) => {
  // Obtenemos los dias faltantes
  const diasRestantes = differenceInCalendarDays(
    parseISO(tarea.fechaLimite),
    new Date()
  );
  const handleEditTarea = () => {
    useBacklogStore.getState().setActiveTarea(tarea);
    useSprintStore.getState().setActiveSprint(sprint);
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
  const handleState = () => {
    const tareaNueva = {
      ...tarea,
      estado:
        tarea.estado === "pendiente"
          ? "en proceso"
          : tarea.estado === "en proceso"
          ? "finalizada"
          : "pendiente",
    };
    updateTareaASprint(sprint.id, tareaNueva);
    useSprintStore.getState().editTareaEnSprint(tareaNueva, sprint.id);

    actualizarTareaBacklog(tareaNueva);
    useBacklogStore.getState().updateTarea(tareaNueva);
  };
  return (
    <div
      className={`${styles.container} 
        ${
          tarea.estado !== "finalizada" && diasRestantes < 10
            ? diasRestantes < 3
              ? styles.containerRed
              : styles.containerYellow
            : styles.container
        }
      `}
    >
      <div>
        <p className={styles.tittle}>{tarea.titulo}</p>
        <p>{tarea.descripcion}</p>
        <p>Fecha limite: {tarea.fechaLimite}</p>
        {tarea.estado !== "finalizada" && diasRestantes < 10 && (
          <p
            className={
              tarea.estado !== "finalizada" && diasRestantes < 3
                ? styles.colorRed
                : styles.colorYellow
            }
          >
            {diasRestantes < 1 ? `Tarea atrazada!`: `Faltan: ${diasRestantes} día/s`}
          </p>
        )}
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
        <button className={styles.input} onClick={() => handleState()}>
          {`${tarea.estado} `}
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
