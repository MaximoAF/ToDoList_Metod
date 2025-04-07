import { ITarea } from "../ITarea";


export interface IBacklogState {
  tareas: ITarea[];
  activeTarea: ITarea | null;

  setActiveTarea: (tarea: ITarea) => void;
  clearActiveTarea: () => void;

  addTarea: (tarea: ITarea) => void;
  updateTarea: (tarea: ITarea) => void;
  removeTarea: (id: string) => void;
}
