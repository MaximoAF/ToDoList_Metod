import styles from './Tarea.module.css';

export const Tarea = () => {
  return (
    <div className={styles.tarea__container}>
      <h3 style={{fontSize: '1rem'}}>Tarea</h3>
      <p style={{fontSize: '1rem', marginLeft: '.5rem'}}><b>Inicio:</b> 2025-03-04</p>
      <p style={{fontSize: '1rem', marginLeft: '.5rem'}}><b>Cierre:</b> 2025-03-14</p>
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: '.2rem'}}>
        <button className={styles.tarea__buttonAction}></button>
        <button className={styles.tarea__buttonAction}></button>
        <button className={styles.tarea__buttonAction}></button>
      </div>
    </div>
  )
}
