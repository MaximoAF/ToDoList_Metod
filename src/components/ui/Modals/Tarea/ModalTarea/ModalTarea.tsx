import { FC } from "react";
import {
  actualizarTareaBacklog,
  crearTareaBacklog,
} from "../../../../../services/backlog/backlogServices";
import { ICreateTarea } from "../../../../../types/Tarea/ICreateTarea";
import { useBacklogStore } from "../../../../../store/backlogStore";
import styles from "../../Modal.module.css";
import { useSprintStore } from "../../../../../store/sprintStore";
import { agregarTareaASprint, updateTareaASprint } from "../../../../../services/sprints/sprintsServices";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

interface ModalTareaProps {
  onClose: () => void;
}

// Yup esquema
const today = new Date().toISOString().split("T")[0];

const tareaSchema = yup.object({
  titulo: yup.string().required("titulo es obligatoria").max(40, "titulo muy grande"),
  descripcion: yup.string().required("descripcion obligatoria").max(200, "descripcion muy grande"),
  fechaLimite: yup
    .string() // <‑‑ cambia a date
    .test(
      "min-hoy",
      "la fecha debe ser hoy o posterior",
      (v) => !!v && v >= today // compara strings "YYYY-MM-DD"
    )
    .required("fecha es obligatoria"),
});

// Modal para crear y editar tarea
export const ModalTarea: FC<ModalTareaProps> = ({ onClose }) => {
  const isUpdate = useBacklogStore.getState().activeTarea;
  const isInSprint = useSprintStore.getState().activeSprint;

  const initialValues = isUpdate
    ? {
        titulo: isUpdate.titulo,
        descripcion: isUpdate.descripcion,
        fechaLimite: isUpdate.fechaLimite,
        estado: isUpdate.estado,
      }
    : {
        titulo: "",
        descripcion: "",
        fechaLimite: "",
        estado: "pendiente",
      };

  const handelSubmit = async (tarea: ICreateTarea) => {
    try {
      if (isUpdate) {
        const tareaUpdated = {
          id: isUpdate.id,
          ...tarea,
        };
        // Actualizamos
        const tareaActualizada = await actualizarTareaBacklog(tareaUpdated);
        useBacklogStore.getState().updateTarea(tareaActualizada);
        useBacklogStore.getState().clearActiveTarea();
        if (isInSprint) {
          await updateTareaASprint(isInSprint.id, tareaActualizada);
          useSprintStore.getState().editTareaEnSprint(tareaActualizada, isInSprint.id);
          useSprintStore.getState().clearActiveSprint();
        }
      } else {
        // Creamos 
        const tareaCreada = await crearTareaBacklog(tarea);
        useBacklogStore.getState().addTarea(tareaCreada);
        if (isInSprint) {
          await agregarTareaASprint(isInSprint.id, tareaCreada);
          useSprintStore.getState().addTareaASprint(tareaCreada, isInSprint.id);
          useSprintStore.getState().clearActiveSprint();
        }
      }
    } catch (error) {
      console.error("Error procesando la tarea: ", error);
    }
    onClose();
  };

  return (
    <div className="overlay">
      <Formik
        initialValues={initialValues}
        validationSchema={tareaSchema}
        onSubmit={(values) => handelSubmit(values)}
      >
        {({ isSubmitting }) => (
        <Form className={styles.modal__form}>
          <h3 className={styles.modal__tittle}>
            {isUpdate ? "Editar tarea" : "Crear tarea"}
          </h3>

          <div>
            <Field
              className={styles.modal__input}
              name="titulo"
              placeholder="Título"
            />
            <ErrorMessage
              name="titulo"
              component="span"
              className={styles.modal__error}
              
            />
          </div>

          <div>
            <Field
              as="textarea"
              className={styles.modal__input}
              name="descripcion"
              placeholder="Descripción"
            />
            <ErrorMessage
              name="descripcion"
              component="span"
              className={styles.modal__error}
              
            />
          </div>

          <div>
            <Field
              className={styles.modal__input}
              name="fechaLimite"
              type="date"
            />
            <ErrorMessage
              name="fechaLimite"
              component="span"
              className={`${styles.modal__error}`}
              
            />
          </div>

          <div className={styles.modal__containButtons}>
            <button
              className={styles.modal__button}
              type="button"
              onClick={onClose}
            >
              Cerrar
            </button>
            <button
              className={styles.modal__button}
              type="submit"
              disabled={isSubmitting}
            >
              {isUpdate ? "Aceptar" : "Crear"}
            </button>
          </div>
        </Form>
      )}
      </Formik>
    </div>
  );
};
