import { FC } from "react";
import styles from "../../Modal.module.css";
import { useSprintStore } from '../../../../../store/sprintStore';

interface IViewSprintProps {
  onClose: () => void;
}
export const ViewSprint:FC<IViewSprintProps> = ({onClose}) => {
  const sprint = useSprintStore.getState().activeSprint
  const handleClose = ()=>{
      useSprintStore.getState().clearActiveSprint();
      onClose()
    }

  return (
    <div className="overlay">
      <div className={styles.modal__formView}>
        <h3 className={styles.modal__tittle}>{sprint?.nombre}</h3>
        <div>
          <p className={styles.modal__labelTittle}>{`Fecha inicio:`}</p>
          <p>{sprint?.fechaInicio}</p>
        </div>
        <div>
          <p className={styles.modal__labelTittle}>{`Fecha cierre: `}</p>
          <p>{sprint?.fechaCierre}</p>
        </div>
        <div className={styles.modal__containButtons}>
          <button className={styles.modal__button} onClick={() => handleClose()}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
