import { Tarea } from "../../ui/Tarea/Tarea";
import { TareaMustra } from "../../ui/TareaMuestra/TareaMustra";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.home__container}>
      <div className={styles.home__headerContainer}>
        <h1 className={styles.home__headerTittle}>Administracion de Tareas</h1>
      </div>

      <div className={styles.home__contentContainer}>
        <div className={styles.home__contentSider}>
          <button className={styles.home__siderButton}>Backlog</button>
          <div className={styles.home__siderTareasContainer}>
            <div style={{display: 'flex', justifyContent:'space-around', alignItems: "center"}}>
              <h3 style={{ fontSize: "1.5rem" }}>Lista Tareas</h3>
              <button className={styles.home__siderButtonAdd}>+</button>
            </div>
            <div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <Tarea/>
                <Tarea/>
                <Tarea/>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.home__contentMain}>
          <div>
            <h1 style={{fontSize: '2rem'}}>Backlog</h1>
          </div>
          <div style={{display: "flex",gap: '2rem', alignItems: "center"}}>
            <h3 style={{fontSize: '2rem', fontWeight: 'normal'}}>Tareas en el Backlog</h3>
            <button className={styles.home__mainButtonAdd}>Crear tarea <span style={{color: '#FFFFFF', fontSize: '1rem'}}>+</span></button>
          </div>
            <TareaMustra/>
        </div>
      </div>
    </div>
  );
};
