import { FC } from "react";
import { useBacklogStore } from "../../../../../store/backlogStore";
import styles from "../../Modal.module.css";

interface IViewTareaProps {
  onClose: () => void;
}

export const ViewTarea: FC<IViewTareaProps> = ({ onClose }) => {
  const tarea = useBacklogStore.getState().activeTarea;

  return (
    <div className="overlay">
      <div className={styles.modal__formView}>
        <h3 className={styles.modal__tittle}>{tarea?.titulo}</h3>
        <div>
          <p className={styles.modal__labelTittle}>
            {`Descripción:`}
          </p>
          <p>{tarea?.descripcion}</p>
        </div>
        <div>
          <p className={styles.modal__labelTittle}>
            {`Fecha limite: `}
          </p>
          <p>{tarea?.fechaLimite}</p>
        </div>
        <div className={styles.modal__containButtons}>
          <button className={styles.modal__button} onClick={() => onClose()}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
