import { FC } from 'react'
import { ITarea } from '../../../types/ITarea'
import styles from './TareaBacklog.module.css'

interface ITareaBacklogProps {
  tarea: ITarea
}

export const TareaBacklog:FC<ITareaBacklogProps> = ({tarea}) => {
  return (
    <div className={styles.tareaBacklog__container}>
      <p><b>{tarea.titulo}:</b> {tarea.descripcion}</p>
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: '.2rem'}}>
        <button className={styles.tareaBacklog__input}>Enviar a{" "} <span><i className="fa-solid fa-envelope"></i></span></button>
        <select 
          id="options"  
          onChange={(e) => e.preventDefault}
          className={styles.tareaBacklog__input}
        >
          <option value="">Seleccione un Sprint</option>
          <option value="opcion1">Sprint 1</option>
          <option value="opcion2">Sprint 2</option>
          <option value="opcion3">Sprint 3</option>
        </select>
        <button className={styles.tareaBacklog__buttonAction}><i style={{color: 'var(--white-color)'}} className="fa-solid fa-eye"></i></button>
        <button className={styles.tareaBacklog__buttonAction}><i style={{color: 'var(--white-color)'}} className="fa-solid fa-pen"></i></button>
        <button className={styles.tareaBacklog__buttonAction}><i style={{color: 'var(--white-color)'}} className="fa-solid fa-trash"></i></button>
      </div>
    </div>
  )
}
