import { FC } from "react";
import { useSprintStore } from "../../../../../store/sprintStore";
import {
  actualizarSprint,
  crearSprint,
} from "../../../../../services/sprints/sprintsServices";
import { ICreateSprint } from "../../../../../types/Sprint/ICreateSprint";
import styles from "../../Modal.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

interface IModalSprintProps {
  onClose: () => void;
}

/* --- Yup schema --- */
const today = new Date().toISOString().split("T")[0];

const sprintSchema = yup.object({
  nombre: yup.string().required("nombre obligatorio").max(40, "nombre muy largo"),
  fechaInicio: yup
    .string()
    .test("min-hoy", "fecha ≥ hoy", (v) => !!v && v >= today)
    .required("fecha obligatoria"),
  fechaCierre: yup
    .string()
    .test("after-inicio", "cierre ≥ inicio", function (v) {
      const { fechaInicio } = this.parent;
      return !!v && !!fechaInicio && v >= fechaInicio;
    })
    .required("fecha obligatoria"),
});

export const ModalSprint: FC<IModalSprintProps> = ({ onClose }) => {
  const isUpdate = useSprintStore.getState().activeSprint;

  /* valores iniciales */
  const initialValues: ICreateSprint = isUpdate
    ? {
        nombre: isUpdate.nombre,
        fechaInicio: isUpdate.fechaInicio,
        fechaCierre: isUpdate.fechaCierre,
        tareas: isUpdate.tareas,
      }
    : { nombre: "", fechaInicio: "", fechaCierre: "", tareas: [] };

  /* submit */
  const handelSubmit = async (sprint: ICreateSprint) => {
    try {
      if (isUpdate) {
        const actualizado = await actualizarSprint({ id: isUpdate.id, ...sprint });
        useSprintStore.getState().updateSprint(actualizado);
        useSprintStore.getState().clearActiveSprint();
      } else {
        const creado = await crearSprint(sprint);
        useSprintStore.getState().addSprint(creado);
      }
    } catch (err) {
      console.error("Error procesando el sprint:", err);
    }
    onClose();
  };

  return (
    <div className="overlay">
      <Formik
        initialValues={initialValues}
        validationSchema={sprintSchema}
        onSubmit={handelSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.modal__form}>
            <h3 className={styles.modal__tittle}>
              {isUpdate ? "Editar sprint" : "Crear sprint"}
            </h3>

            <div>
              <Field
                className={styles.modal__input}
                name="nombre"
                placeholder="Nombre"
              />
              <ErrorMessage name="nombre" component="span" className={styles.modal__error} />
            </div>

            <div>
              <p className={styles.modal__labelTittle}>Fecha inicio</p>
              <Field className={styles.modal__input} name="fechaInicio" type="date" />
              <ErrorMessage name="fechaInicio" component="span" className={styles.modal__error} />
            </div>

            <div>
              <p className={styles.modal__labelTittle}>Fecha cierre</p>
              <Field className={styles.modal__input} name="fechaCierre" type="date" />
              <ErrorMessage name="fechaCierre" component="span" className={styles.modal__error} />
            </div>

            <div className={styles.modal__containButtons}>
              <button className={styles.modal__button} type="button" onClick={onClose}>
                Cerrar
              </button>
              <button className={styles.modal__button} type="submit" disabled={isSubmitting}>
                {isUpdate ? "Aceptar" : "Crear"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
