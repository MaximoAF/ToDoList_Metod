import { FC } from "react";
import styles from "./SprintSider.module.css";
import { ISprint } from "../../../types/Sprint/ISprint";
import { useSprintStore } from "../../../store/sprintStore";
import { useNavigate } from "react-router-dom";

interface ISprintSiderProps {
  sprint: ISprint;
  showModal: () => void;
  viewSprint: () => void;
  deleteSprint: () => void;
}
export const SprintSider: FC<ISprintSiderProps> = ({
  sprint,
  showModal,
  viewSprint,
  deleteSprint,
}) => {
  const navigate = useNavigate();
  const handleEditSprint = () => {
    useSprintStore.getState().setActiveSprint(sprint);
    showModal();
  };
  const handleViewSprint = () => {
    useSprintStore.getState().setActiveSprint(sprint);
    viewSprint();
  };
  const handleDeleteSprint = () => {
    useSprintStore.getState().setActiveSprint(sprint);
    deleteSprint();
  };
  const handleNavigate = () => {
    navigate(`/sprint/${sprint.id}`);
  };
  return (
    <div className={styles.sprint__container} onClick={handleNavigate}>
      <h3 style={{ fontSize: "1rem" }}>{sprint.nombre}</h3>
      <div>
        <p style={{ fontSize: "1rem", marginLeft: ".5rem" }}>
          <b>Inicio:</b> {sprint.fechaInicio}
        </p>
        <p style={{ fontSize: "1rem", marginLeft: ".5rem" }}>
          <b>Cierre:</b> {sprint.fechaCierre}
        </p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", gap: ".2rem" }}
      >
        <button
          className={styles.sprint__buttonAction}
          onClick={() => handleViewSprint()}
        >
          <i
            style={{ color: "var(--white-color)" }}
            className="fa-solid fa-eye"
          ></i>
        </button>
        <button
          className={styles.sprint__buttonAction}
          onClick={() => handleEditSprint()}
        >
          <i
            style={{ color: "var(--white-color)" }}
            className="fa-solid fa-pen"
          ></i>
        </button>
        <button
          className={styles.sprint__buttonAction}
          onClick={() => handleDeleteSprint()}
        >
          <i
            style={{ color: "var(--white-color)" }}
            className="fa-solid fa-trash"
          ></i>
        </button>
      </div>
    </div>
  );
};
