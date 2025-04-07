import { FC } from 'react';
import styles from './SprintSider.module.css';
import { ISprint } from '../../../types/Sprint/ISprint';

interface ISprintSiderProps {
  sprint: ISprint
}
export const SprintSider:FC<ISprintSiderProps> = ({sprint}) => {
  return (
    <div className={styles.sprint__container}>
      <h3 style={{fontSize: '1rem'}}>{sprint.nombre}</h3>
      <div>
        <p style={{fontSize: '1rem', marginLeft: '.5rem'}}><b>Inicio:</b> {sprint.fechaInicio}</p>
        <p style={{fontSize: '1rem', marginLeft: '.5rem'}}><b>Cierre:</b> {sprint.fechaCierre}</p>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: '.2rem'}}>
        <button className={styles.sprint__buttonAction}><i style={{color: 'var(--white-color)'}} className="fa-solid fa-eye"></i></button>
        <button className={styles.sprint__buttonAction}><i style={{color: 'var(--white-color)'}} className="fa-solid fa-pen"></i></button>
        <button className={styles.sprint__buttonAction}><i style={{color: 'var(--white-color)'}} className="fa-solid fa-trash"></i></button>
      </div>
    </div>
  )
}
