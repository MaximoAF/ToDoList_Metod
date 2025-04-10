import { FC, useEffect, useState } from "react";
import {
  actualizarTareaBacklog,
  crearTareaBacklog,
} from "../../../../../services/backlog/backlogServices";
import { ICreateTarea } from "../../../../../types/Tarea/ICreateTarea";
import { useBacklogStore } from "../../../../../store/backlogStore";
import styles from "../../Modal.module.css";

interface ModalTareaProps {
  onClose: () => void;
}

// Modal para crear y editar tarea
export const ModalTarea: FC<ModalTareaProps> = ({ onClose }) => {
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [fechaLimite, setFechaLimite] = useState<string>("");

  const isUpdate = useBacklogStore.getState().activeTarea;

  const newTarea: ICreateTarea = {
    titulo: titulo,
    descripcion: descripcion,
    estado: "pendiente",
    fechaLimite: fechaLimite,
  };

  const handelSubmit = async (tarea: ICreateTarea) => {
    try {
      if (isUpdate) {
        const tareaUpdated = {
          id: isUpdate.id,
          ...tarea,
        };
        const tareaActualizada = await actualizarTareaBacklog(tareaUpdated);
        useBacklogStore.getState().updateTarea(tareaActualizada);
        useBacklogStore.getState().clearActiveTarea();
      } else {
        const tareaCreada = await crearTareaBacklog(tarea);
        useBacklogStore.getState().addTarea(tareaCreada);
      }
    } catch (error) {
      console.error("Error procesando la tarea: ", error);
    }
    onClose();
  };

  useEffect(() => {
    if (isUpdate) {
      setTitulo(isUpdate.titulo);
      setDescripcion(isUpdate.descripcion);
      setFechaLimite(isUpdate.fechaLimite);
    }
  }, []);

  return (
    <div className="overlay">
      <form
        className={styles.modal__form}
        onSubmit={(e) => {
          e.preventDefault();
          handelSubmit(newTarea);
        }}
      >
        <h3 className={styles.modal__tittle}>
          {isUpdate ? "Editar tarea" : "Crear tarea"}
        </h3>
        <input
          className={styles.modal__input}
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <textarea
          className={styles.modal__input}
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <input
          className={styles.modal__input}
          type="date"
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
          required
        />
        <div className={styles.modal__containButtons}>
          <button
            className={styles.modal__button}
            onClick={() => onClose()}
            type="button"
          >
            Cerrar
          </button>
          <button className={styles.modal__button} type="submit">
            {isUpdate ? "Aceptar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};
