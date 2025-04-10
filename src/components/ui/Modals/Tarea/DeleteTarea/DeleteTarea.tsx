import { FC } from "react";
import { useBacklogStore } from "../../../../../store/backlogStore";
import { eliminarTareaBacklog } from "../../../../../services/backlog/backlogServices";
import styles from "../../Modal.module.css";

interface IDeleteTareaProps {
  onClose: () => void;
}

export const DeleteTarea: FC<IDeleteTareaProps> = ({ onClose }) => {
  const tarea = useBacklogStore.getState().activeTarea;
  const handleDelete = () => {
    if (tarea) {
      useBacklogStore.getState().removeTarea(tarea.id);
      eliminarTareaBacklog(tarea.id);
      useBacklogStore.getState().clearActiveTarea();
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
          {tarea?.titulo}
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
