import { ITarea } from "../Tarea/ITarea";


export interface ISprint {
  id: string;
  fechaInicio: string;
  fechaCierre: string;
  nombre: string;
  tareas: ITarea[];
}
