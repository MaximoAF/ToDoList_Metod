import { create } from "zustand";
import { IBacklogState } from "../types/IStore/IBacklogState";

export const useBacklogStore = create<IBacklogState>((set) => ({
  tareas: [],
  activeTarea: null,

  setActiveTarea: (tarea) => set({ activeTarea: tarea }),
  clearActiveTarea: () => set({ activeTarea: null }),

  addTarea: (tarea) => {
    set((state) => ({
      tareas: [...state.tareas, tarea],
    }));
  },
  updateTarea: (tarea) => {
    set((state) => ({
      tareas: state.tareas.map((tar) => (tar.id === tarea.id ? tarea : tar)),
    }));
  },
  removeTarea: (id) => {
    set((state) => ({
      tareas: state.tareas.filter((tar) => tar.id !== id),
    }));
  },
}));
