import React, { useContext } from "react";
import { CardContext } from "../contexts/components/card.context";
import { DialogContext } from "../contexts/components/dialog.context";
import styles from "../styles/components/card.module.css";

export default function Card() {
  const { editDialog, confirmDialog, getProps } = useContext(DialogContext);
  const { getProjects } = useContext(CardContext);
  if (getProjects !== undefined) {
    const projects = getProjects.filter((project) => !project?.finished);
    if (projects.length !== 0) {
      return (
        <>
          {projects.map((project) => {
            const price = project.daily.reduce(
              (elmtOne, elmtTwo) => elmtOne + elmtTwo.hour,
              0
            );
            return (
              <div
                key={project.id}
                data-testid="cardWindow"
                className={styles.card}
                onClick={() => {
                  editDialog.open();
                  getProps(project);
                }}
              >
                <h1 data-testid="heading">{project.title}</h1>
                <span data-testid="status">{`${project.currency} ${
                  (price * project.price).toFixed(2) ||
                  (0).toFixed(2).replace(".", ",")
                }`}</span>
                <p data-testid="paragraph">{project.description}</p>
                <button
                  data-testid="confirmButton"
                  className={styles.confirm}
                  onClick={(e) => {
                    e.stopPropagation();
                    getProps(project);
                    confirmDialog.open();
                  }}
                >
                  ✔
                </button>
              </div>
            );
          })}
        </>
      );
    }
    return <span> No projects yet...</span>;
  }
  return <span> No projects yet...</span>;
}
