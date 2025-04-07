import { useEffect, useState } from "react";
import { SprintSider } from "../../ui/SprintSider/SprintSider";
import styles from "./Home.module.css";
import { useBacklogStore } from "../../../store/backlogStore";
import { useSprintStore } from "../../../store/sprintStore";
import { TareaBacklog } from "../../ui/TareaBacklog/TareaBacklog";
import { getAllTareasBacklog } from "../../../services/backlog/backlogServices";
import { getAllSprints } from "../../../services/sprints/sprintsServices";
import { ModalTarea } from "../../ui/Modals/ModalTarea/ModalTarea";
import { DeleteTarea } from "../../ui/Modals/DeleteTarea/DeleteTarea";
import { ViewTarea } from "../../ui/Modals/ViewTarea/ViewTarea";

export const Home = () => {
  const tareas = useBacklogStore((state) => state.tareas);
  const sprints = useSprintStore((state) => state.sprints);

  const [showModalTarea, setShowModalTarea] = useState<boolean>(false);
  const [showDeleteTarea, setShowDeleteTarea] = useState<boolean>(false);
  const [showViewTarea, setShowViewTarea] = useState<boolean>(false);

  //Obtenemos los datos y asignamos los valores iniciales
  useEffect(() => {
    `${import.meta.env.API_URL}/sprints`;

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
      }
    };

    // Ejecutamos las funciones de carga
    fetchDataBacklog();
    fetchDataSprints();
  }, []);

  return (
    <div className={styles.home__container}>
      <div className={styles.home__headerContainer}>
        <h1 className={styles.home__headerTittle}>Administracion de Tareas</h1>
      </div>

      <div className={styles.home__contentContainer}>
        <div className={styles.home__contentSider}>
          <button className={styles.home__siderButton}>Backlog</button>
          <div className={styles.home__siderTareasContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontSize: "1.5rem" }}>Lista Sprints</h3>
              <button className={styles.home__siderButtonAdd}>
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
                {/* Mostramos los sprints */}
                {sprints.length > 0 ? (
                  sprints.map((spr) => {
                    console.log(spr.nombre);
                    return <SprintSider sprint={spr} />;
                  })
                ) : (
                  <p className={styles.home__siderNoSprints}>No hay sprints</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.home__contentMain}>
          <div>
            <h1 style={{ fontSize: "2rem" }}>Backlog</h1>
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <h3 style={{ fontSize: "2rem", fontWeight: "normal" }}>
              Tareas en el Backlog
            </h3>
            <button
              className={styles.home__mainButtonAdd}
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
          {/* Mostramos las tareas */}
          {tareas.length > 0 ? (
            tareas.map((tra) => (
              <TareaBacklog
                tarea={tra}
                showModale={() => setShowModalTarea(true)}
                deleteTarea={() => setShowDeleteTarea(true)}
                viewTarea={() => setShowViewTarea(true)}
              />
            ))
          ) : (
            <p className={styles.home__siderNoSprints}>No hay Tareas</p>
          )}
        </div>
      </div>

      {/* Modals de Tarea*/}
      {showModalTarea && (
        <ModalTarea onClose={() => setShowModalTarea(false)} />
      )}
      {showDeleteTarea && (
        <DeleteTarea onClose={() => setShowDeleteTarea(false)} />
      )}
      {showViewTarea && (
        <ViewTarea onClose={() => setShowViewTarea(false)} />
      )}
    </div>
  );
};
