import { ISprint } from "../ISprint";
import { ITarea } from "../ITarea";

export interface ISprintState {
  sprints: ISprint[];
  activeSprint: ISprint | null;

  setActiveSprint: (sprint: ISprint) => void;
  clearActiveSprint: () => void;

  addSprint: (sprint: ISprint) => void;
  removeSprint: (sprintID: string) => void;
  updateSprint: (sprint: ISprint) => void;
  addTareaASprint: (tarea: ITarea, sprintID: string) => void;
}
