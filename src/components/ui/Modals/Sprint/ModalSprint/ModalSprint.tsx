import { FC, useEffect, useState } from "react";
import { useSprintStore } from "../../../../../store/sprintStore";
import { ICreateSprint } from "../../../../../types/Sprint/ICreateSprint";
import {
  actualizarSprint,
  crearSprint,
} from "../../../../../services/sprints/sprintsServices";
import styles from "../../Modal.module.css";

interface IModalSprintProps {
  onClose: () => void;
}

export const ModalSprint: FC<IModalSprintProps> = ({ onClose }) => {
  const [nombre, setNombre] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaCierre, setFechaCierre] = useState<string>("");

  const isUpdate = useSprintStore.getState().activeSprint;

  const newSprint: ICreateSprint = {
    nombre: nombre,
    fechaInicio: fechaInicio,
    fechaCierre: fechaCierre,
    tareas: [],
  };

  const handelSubmit = async (sprint: ICreateSprint) => {
    try {
      if (isUpdate) {
        const sprintUpdated = {
          id: isUpdate.id,
          ...sprint,
        };
        const sprintActualizado = await actualizarSprint(sprintUpdated);
        useSprintStore.getState().updateSprint(sprintActualizado);
        useSprintStore.getState().clearActiveSprint();
      } else {
        const sprintCreado = await crearSprint(sprint);
        useSprintStore.getState().addSprint(sprintCreado);
      }
    } catch (error) {
      console.error("Error procesando el Sprint: ", error);
    }
    onClose();
  };

  useEffect(() => {
    if (isUpdate) {
      setNombre(isUpdate.nombre);
      setFechaInicio(isUpdate.fechaInicio);
      setFechaCierre(isUpdate.fechaCierre);
    }
  }, []);

  return (
    <div className="overlay">
      <form
        className={styles.modal__form}
        onSubmit={(e) => {
          e.preventDefault();
          handelSubmit(newSprint);
        }}
      >
        <h3 className={styles.modal__tittle}>
          {isUpdate ? "Editar sprint" : "Crear sprint"}
        </h3>
        <input
          className={styles.modal__input}
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <div>
          <p className={styles.modal__labelTittle}>Fecha inicio</p>
          <input
            className={styles.modal__input}
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>

        <div>
          <p className={styles.modal__labelTittle}>Fecha cierre</p>
          <input
            className={styles.modal__input}
            type="date"
            value={fechaCierre}
            onChange={(e) => setFechaCierre(e.target.value)}
            required
          />
        </div>

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
