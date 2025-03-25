import styles from './Home.module.css'

export const Home = () => {
  return (
    <div className={styles.home__container}>
      <div className={styles.home__headerContainer}>
      <h1 className={styles.home__headerTittle}>Administracion de Tareas</h1>
      </div>

      <div className={styles.home__contentContainer}>
        <div className={styles.home__contentSider}></div>
        <div className={styles.home__contentMain}></div>
      </div>
    </div>
  )
}
