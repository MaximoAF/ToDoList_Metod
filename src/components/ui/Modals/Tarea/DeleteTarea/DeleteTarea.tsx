import { FC, useState } from "react";
import { useBacklogStore } from "../../../../../store/backlogStore";
import { eliminarTareaBacklog } from "../../../../../services/backlog/backlogServices";
import { useSprintStore } from "../../../../../store/sprintStore";
import { eliminarTareaDeSprint } from "../../../../../services/sprints/sprintsServices";
import styles from "../../Modal.module.css";
import loadingAnimation from "../../../../../assets/Loading_icon.gif";

interface IDeleteTareaProps {
  onClose: () => void;
}

export const DeleteTarea: FC<IDeleteTareaProps> = ({ onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const tarea = useBacklogStore.getState().activeTarea;
  const sprints = useSprintStore((state) => state.sprints);
      
  const handleDelete = async () => {
    if (tarea) {
      setLoading(true);
      
      console.log('paso uno')
      // Buscamos si la tarea esta en un spr
      const sprint = sprints.find((s) =>
        s.tareas.some((t) => String(t.id) === String(tarea.id))
      );
      
      // La quitamos del sprint
      if (sprint) {
        await useSprintStore.getState().removeTareaASprint(tarea.id, sprint.id)
        await eliminarTareaDeSprint(sprint.id, tarea.id);

        console.log(sprints)
        
      }
      
      useBacklogStore.getState().removeTarea(tarea.id);
      await eliminarTareaBacklog(tarea.id);
      
      useBacklogStore.getState().clearActiveTarea();
      setLoading(false);
    }
    onClose();
  };

  return (
    <div className="overlay">
      <div className={styles.modal__form}>
        {loading && <img style={{position: 'absolute'}} src={loadingAnimation} />}
        <h3
          className={styles.modal__tittle}
        >{`Deseas eliminar esta tarea:`}</h3>
        <p className={styles.modal__subTittle}>{tarea?.titulo}</p>
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
