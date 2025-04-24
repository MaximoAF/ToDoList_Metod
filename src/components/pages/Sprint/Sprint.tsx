import { useEffect, useState } from "react";
import { SprintSider } from "../../ui/SprintSider/SprintSider";
import styles from "../Main.module.css";
import loadingAnimation from "../../../assets/Loading_icon.gif";
import { useBacklogStore } from "../../../store/backlogStore";
import { useSprintStore } from "../../../store/sprintStore";
import { getAllTareasBacklog } from "../../../services/backlog/backlogServices";
import {
  getAllSprints,
  getSprintById,
} from "../../../services/sprints/sprintsServices";
import { ModalTarea } from "../../ui/Modals/Tarea/ModalTarea/ModalTarea";
import { DeleteTarea } from "../../ui/Modals/Tarea/DeleteTarea/DeleteTarea";
import { ViewTarea } from "../../ui/Modals/Tarea/ViewTarea/ViewTarea";
import { ModalSprint } from "../../ui/Modals/Sprint/ModalSprint/ModalSprint";
import { ViewSprint } from "../../ui/Modals/Sprint/VeiwSprint/ViewSprint";
import { DeleteSprint } from "../../ui/Modals/Sprint/DeleteSprint/DeleteSprint";
import { useNavigate, useParams } from "react-router-dom";
import { CardTareaSprint } from "../../ui/CardTareaSprint/CardTareaSprint";

export const Sprint = () => {
  const sprintId = useParams().id || "";
  const [cargandoTar, setCargandoTar] = useState<boolean>(true);
  const [cargandoSpr, setCargandoSpr] = useState<boolean>(true);

  const sprints = useSprintStore((state) => state.sprints);
  const sprint = sprints.find(s => s.id === sprintId) || null;

  const navigate = useNavigate();

  // Modals de Tarea
  const [showModalTarea, setShowModalTarea] = useState<boolean>(false);
  const [showDeleteTarea, setShowDeleteTarea] = useState<boolean>(false);
  const [showViewTarea, setShowViewTarea] = useState<boolean>(false);

  // Modals de Sprint
  const [showModalSprint, setShowModalSprint] = useState<boolean>(false);
  const [showDeleteSprint, setShowDeleteSprint] = useState<boolean>(false);
  const [showViewSprint, setShowViewSprint] = useState<boolean>(false);

  // Obtenemos los datos y asignamos los valores iniciales
  useEffect(() => {
    // Cargamos las Tareas del backlog
    const fetchDataBacklog = async () => {
      try {
        const response = await getAllTareasBacklog();

        useBacklogStore.setState({
          tareas: response,
        });
      } catch (error) {
        console.error("Error cargando las tareas: ", error);
      }
    };

    // Cargamos los Sprints
    const fetchDataSprints = async () => {
      try {
        const response = await getAllSprints();

        useSprintStore.setState({
          sprints: response,
        });
      } catch (error) {
        console.error("Error cargando los sprints: ", error);
      } finally {
        setCargandoSpr(false);
      }
    };

    // Ejecutamos las funciones de carga
    fetchDataBacklog();
    fetchDataSprints();
  }, []);

  return (
    <div className={styles.main__container}>
      <div className={styles.main__headerContainer}>
        <h1 className={styles.main__headerTittle}>Administracion de Tareas</h1>
      </div>

      <div className={styles.main__contentContainer}>
        <div className={styles.main__contentSider}>
          <button
            className={styles.main__siderButton}
            onClick={() => navigate("/")}
          >
            Backlog
          </button>
          <div className={styles.main__siderTareasContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontSize: "1.5rem" }}>Lista Sprints</h3>
              <button
                className={styles.main__siderButtonAdd}
                onClick={() => setShowModalSprint(true)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {/* ---Mostramos los sprints--- */}
                {sprints.length > 0 ? (
                  sprints.map((spr) => (
                    <SprintSider
                      sprint={spr}
                      showModal={() => setShowModalSprint(true)}
                      viewSprint={() => setShowViewSprint(true)}
                      deleteSprint={() => setShowDeleteSprint(true)}
                    />
                  ))
                ) : cargandoSpr ? (
                  <img
                    src={loadingAnimation}
                    alt="cargando..."
                    style={{ width: "30rem" }}
                  />
                ) : (
                  <p className={styles.main__siderNoSprints}>No hay sprints</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ------Seccion del contenido principal--- */}
        {!sprint ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10rem",
            }}
          >
            <div>
              {cargandoTar ? (
                <img
                  src={loadingAnimation}
                  alt="cargando..."
                  style={{ width: "30rem" }}
                />
              ) : (
                <h1 style={{ fontSize: "2rem" }}>No se encontro el Sprint</h1>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.main__contentMain}>
            <div>
              <h1 style={{ fontSize: "2rem" }}>Sprint: {sprint.nombre}</h1>
            </div>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <h3 style={{ fontSize: "2rem", fontWeight: "normal" }}>
                Tareas del sprint
              </h3>
              <button
                className={styles.main__mainButtonAdd}
                onClick={() => {
                  console.log(showModalTarea);
                  setShowModalTarea(true);
                }}
              >
                Crear tarea{" "}
                <span style={{ color: "#FFFFFF", fontSize: "1rem" }}>
                  <i className="fa-solid fa-plus"></i>
                </span>
              </button>
            </div>
            {/* ---Mostramos las tareas--- */}
            {sprint.tareas.length > 0 ? (
              <div className={styles.sprint__tareasGrid}>
                <div className={styles.sprint__tareaEstado}>
                  <p className={styles.sprint__estadoTittle}>Pendiente</p>
                  <div className={styles.sprint__contCard}>
                    {sprint.tareas.map(
                      (tar) =>
                        tar.estado === "pendiente" && (
                          <CardTareaSprint
                            tarea={tar}
                            showModale={() => setShowModalTarea(true)}
                            deleteTarea={() => setShowDeleteTarea(true)}
                            viewTarea={() => setShowViewTarea(true)}
                          />
                        )
                    )}
                  </div>
                </div>
                <div className={styles.sprint__tareaEstado}>
                  <p className={styles.sprint__estadoTittle}>En proceso</p>
                  <div className={styles.sprint__contCard}>
                    {sprint.tareas.map(
                      (tar) =>
                        tar.estado === "en proceso" && (
                          <CardTareaSprint
                            tarea={tar}
                            showModale={() => setShowModalTarea(true)}
                            deleteTarea={() => setShowDeleteTarea(true)}
                            viewTarea={() => setShowViewTarea(true)}
                          />
                        )
                    )}
                  </div>
                </div>
                <div className={styles.sprint__tareaEstado}>
                  <p className={styles.sprint__estadoTittle}>Finalizada</p>
                  <div className={styles.sprint__contCard}>
                    {sprint.tareas.map(
                      (tar) =>
                        tar.estado === "finalizada" && (
                          <CardTareaSprint
                            tarea={tar}
                            showModale={() => setShowModalTarea(true)}
                            deleteTarea={() => setShowDeleteTarea(true)}
                            viewTarea={() => setShowViewTarea(true)}
                          />
                        )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className={styles.main__siderNoSprints}>No hay Tareas</p>
            )}
          </div>
        )}
      </div>

      {/* ---Modals de Tarea--- */}
      {showModalTarea && (
        <ModalTarea onClose={() => setShowModalTarea(false)} />
      )}
      {showDeleteTarea && (
        <DeleteTarea onClose={() => setShowDeleteTarea(false)} />
      )}
      {showViewTarea && <ViewTarea onClose={() => setShowViewTarea(false)} />}

      {/* ---Modals de Sprint--- */}
      {showModalSprint && (
        <ModalSprint onClose={() => setShowModalSprint(false)} />
      )}
      {showViewSprint && (
        <ViewSprint onClose={() => setShowViewSprint(false)} />
      )}
      {showDeleteSprint && (
        <DeleteSprint onClose={() => setShowDeleteSprint(false)} />
      )}
    </div>
  );
};
