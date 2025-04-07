import { FC } from "react";
import styles from "./ViewTarea.module.css";
import { useBacklogStore } from "../../../../store/backlogStore";

interface IViewTareaProps {
  onClose: () => void;
}

export const ViewTarea: FC<IViewTareaProps> = ({ onClose }) => {
  const tarea = useBacklogStore.getState().activeTarea;

  return (
    <div className="overlay">
      <div className={styles.view__container}>
        <h3 className={styles.view__tittle}>{tarea?.titulo}</h3>
        <div>
          <p style={{color: 'var(--palet-color-1)'}}><b>{`Descripción:`}</b></p>
          <p>{tarea?.descripcion}</p>
        </div>
        <div>
          <p style={{color: 'var(--palet-color-1)'}}><b>{`Fecha limite: `}</b></p>
          <p>{tarea?.fechaLimite}</p>
        </div>
        <div className={styles.view__containButtons}>
          <button className={styles.view__button} onClick={() => onClose()}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
