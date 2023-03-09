import React, { useContext } from "react";
import { CardContext } from "../contexts/components/card.context";
import { DialogContext } from "../contexts/components/dialog.context";
import { Check, X } from "lucide-react";

import styles from "../styles/components/card.module.css";

function Card() {
  const { editDialog, confirmDialog, getProps } = useContext(DialogContext);
  const { getProjects } = useContext(CardContext);
  if (getProjects !== undefined) {
    const projects = getProjects.filter((project) => !project.finished);
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
                <span data-testid="status">{`${project.currency} ${(
                  price * project.price
                ).toFixed(2)}`}</span>
                <p data-testid="paragraph">{project.description}</p>
                <button
                  data-testid="finishButton"
                  className={styles.confirm}
                  onClick={(e) => {
                    e.stopPropagation();
                    getProps(project);
                    confirmDialog.open();
                  }}
                >
                  <Check />
                </button>
              </div>
            );
          })}
        </>
      );
    }
    return <span data-testid="message"> No projects yet...</span>;
  }
  return <span data-testid="message"> No projects yet...</span>;
}
function FinishedCard() {
  const { editDialog, confirmDialog, getProps, DeleteProject } =
    useContext(DialogContext);
  const { getProjects } = useContext(CardContext);
  if (getProjects !== undefined) {
    const finishedProjects = getProjects.filter((project) => project.finished);
    if (finishedProjects.length !== 0) {
      return (
        <>
          {finishedProjects.map((project) => {
            const price = project.daily.reduce(
              (elmtOne, elmtTwo) => elmtOne + elmtTwo.hour,
              0
            );
            return (
              <div
                key={project.id}
                data-testid="finished-card"
                className={styles["finished-card"]}
              >
                <h1 data-testid="heading">{project.title}</h1>
                <span data-testid="status">{`${project.currency} ${(
                  price * project.price
                ).toFixed(2)}`}</span>
                <p data-testid="paragraph">{project.description}</p>
                <button
                  data-testid="delete-finished"
                  className={styles.delete}
                  onClick={(e) => {
                    e.stopPropagation();
                    getProps(project);
                    DeleteProject();
                  }}
                >
                  <X />
                </button>
              </div>
            );
          })}
        </>
      );
    }
    return <></>;
  }
  return <span data-testid="message"> No projects yet...</span>;
}

export { Card, FinishedCard };
