import { FC } from "react";
import { useBacklogStore } from "../../../../store/backlogStore";
import styles from "./DeleteTarea.module.css";
import { eliminarTareaBacklog } from "../../../../services/backlog/backlogServices";

interface IDeleteTareaProps {
  onClose: () => void;
}

export const DeleteTarea: FC<IDeleteTareaProps> = ({ onClose }) => {

  const handleDelete = () => {
    const tarea = useBacklogStore.getState().activeTarea;
    if (tarea) {
      useBacklogStore.getState().removeTarea(tarea.id);
      eliminarTareaBacklog(tarea.id);
      useBacklogStore.getState().clearActiveTarea();
    }
    onClose();
  };

  return (
    <div className="overlay">
      <div className={styles.delete__form}>
        <h3
          className={styles.delete__tittle}
        >{`Deseas eliminar esta tarea:`}</h3>
        <h4 className={styles.delete__tittleTarea}>
          {useBacklogStore.getState().activeTarea?.titulo}
        </h4>
        <div className={styles.delete__containButtons}>
          <button className={styles.delete__button} onClick={() => onClose()}>
            Cerrar
          </button>
          <button className={styles.delete__button} onClick={()=>handleDelete()}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
