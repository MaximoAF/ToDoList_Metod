import { FC } from "react";
import styles from "../../Modal.module.css";
import { useSprintStore } from "../../../../../store/sprintStore";
import { eliminarSprint } from "../../../../../services/sprints/sprintsServices";

interface IDeleteSprintsProps {
  onClose: () => void;
}

export const DeleteSprint:FC<IDeleteSprintsProps> = ({onClose}) => {
  const sprint = useSprintStore.getState().activeSprint;
  const handleDelete =async () => {
    if (sprint) {
      useSprintStore.getState().removeSprint(sprint.id);
      await eliminarSprint(sprint.id);
      useSprintStore.getState().clearActiveSprint();
    }
    onClose();
  };

  return (
    <div className="overlay">
      <div className={styles.modal__form}>
        <h3
          className={styles.modal__tittle}
        >{`Deseas eliminar esta tarea:`}</h3>
        <p className={styles.modal__subTittle}>
          {sprint?.nombre}
        </p>
        <div className={styles.modal__containButtons}>
          <button className={styles.modal__button} onClick={() => onClose()}>
            Cerrar
          </button>
          <button
            className={styles.modal__button}
            onClick={() => handleDelete()}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
