import { useEffect } from "react";
import { SprintSider } from "../../ui/SprintSider/SprintSider";
import styles from "./Home.module.css";
import { useBacklogStore } from "../../../store/backlogStore";
import { ITarea } from "../../../types/ITarea";
import { ISprint } from "../../../types/ISprint";
import { useSprintStore } from "../../../store/sprintStore";
import { TareaBacklog } from "../../ui/TareaBacklog/TareaBacklog";

export const Home = () => {
  const tareas = useBacklogStore((state) => state.tareas);
  const sprints = useSprintStore((state) => state.sprints);

  //Obtenemos los datos y asignamos los valores iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/db.json");
        const data: {
          backlog: { tareas: ITarea[] };
          sprintList: { sprints: ISprint[] };
        } = await response.json();

        useBacklogStore.setState({
          tareas: data.backlog.tareas,
        });

        useSprintStore.setState({
          sprints: data.sprintList.sprints,
        });
      } catch (error) {
        console.error("Error cargando los datos:", error);
      }
    };

    fetchData();
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
              <button className={styles.home__siderButtonAdd}><i className="fa-solid fa-plus"></i></button>
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
            <button className={styles.home__mainButtonAdd}>
              Crear tarea{" "}
              <span style={{ color: "#FFFFFF", fontSize: "1rem" }}><i className="fa-solid fa-plus"></i></span>
            </button>
          </div>
          {/* Mostramos las tareas */}
          {tareas.length > 0 ? (
                  tareas.map((tra) => {
                    console.log(tra.titulo);
                    return <TareaBacklog tarea={tra} />;
                  })
                ) : (
                  <p className={styles.home__siderNoSprints}>No hay Tareas</p>
                )}
        </div>
      </div>
    </div>
  );
};
