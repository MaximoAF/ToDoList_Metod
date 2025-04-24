import { create } from "zustand";
import { ISprintState } from "../types/Sprint/IStore/ISprintState";

export const useSprintStore = create<ISprintState>((set) => ({
  sprints: [],
  activeSprint: null,

  setActiveSprint: (sprint) => set({ activeSprint: sprint }),
  clearActiveSprint: () => set({ activeSprint: null }),

  addSprint: (sprint) => {
    set((state) => ({
      sprints: [...state.sprints, sprint],
    }));
  },
  removeSprint: (sprintID) => {
    set((state) => ({
      sprints: state.sprints.filter((spr) => spr.id !== sprintID),
    }));
  },
  updateSprint: (sprint) => {
    set((state) => ({
      sprints: state.sprints.map((spr) =>
        spr.id === sprint.id ? sprint : spr
      ),
    }));
  },
  addTareaASprint: (tarea, sprintId) => {
    set((state) => ({
      sprints: state.sprints.map((spr) =>
        spr.id === sprintId ? { ...spr, tareas: [...spr.tareas, tarea] } : spr
      ),
    }));
  },
  removeTareaASprint: (tareaId, sprintId) =>
    set(state => ({
      sprints: state.sprints.map(spr =>
        spr.id === sprintId
          ? { ...spr, tareas: spr.tareas.filter(t => String(t.id)  !== String(tareaId)) }
          : spr
      ),
    })),
}));
