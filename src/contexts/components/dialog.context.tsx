import React, { createContext, ReactNode, useState } from "react";
import type { Property as CSS } from "csstype";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  FINISH_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT,
} from "../../queries/project.query";
import { AUTHENTICATE } from "../../queries/user.query";
import Cookies from "../../lib/cookies";

interface DialogContext {
  createDialog: IDisplay;
  editDialog: IDisplay;
  confirmDialog: IDisplay;
  CreateProject: () => void;
  EditProject: () => void;
  DeleteProject: () => void;
  Finish: () => void;
  getProps: (project: Project) => void;
  handleValue: (props: { name: string; value: string | number }) => void;
  isFix: (e: boolean) => void;
}

interface IDisplay {
  display: CSS.Display;
  open: () => void;
  close: () => void;
}
type day = {
  hour: number;
  todo: string;
};

type Project = {
  id: string;
  title?: string;
  dateStart: Date;
  dateFinish: Date;
  description?: string;
  currency?: string;
  price?: number;
  finished?: boolean;
  timeStart?: string;
  timeEnd?: string;
  todo?: string;
  daily: day[];
};

export const DialogContext = createContext({} as DialogContext);

export default function DialogProvider({ children }: { children: ReactNode }) {
  const [createProject] = useMutation(CREATE_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [FinishProject] = useMutation(FINISH_PROJECT);
  const [value, setValue] = useState<Project>();
  const [project, setProject] = useState<Project>();
  const [fixed, setFixed] = useState<boolean>();
  const { data } = useQuery(AUTHENTICATE, {
    variables: {
      token: new Cookies().get().loginToken,
    },
  });
  class Display implements IDisplay {
    private state = useState<CSS.Display>("none");
    public display: CSS.Display = this.state[0];

    open() {
      this.state[1]("flex");
    }

    close() {
      this.state[1]("none");
    }
  }
  const createDialog = new Display();
  const editDialog = new Display();
  const confirmDialog = new Display();

  function handleValue(props: { name: string; value: string | number }) {
    setValue((value) => ({
      ...(value as Project),
      [props.name]: props.value,
    }));
  }
  const dateFinish = `${`${value?.dateFinish}`.split("-")[0]}-${parseInt(
    `${value?.dateFinish}`.split("-")[1]
  )}-${`${value?.dateFinish}`.split("-")[2]}`;
  async function CreateProject() {
    if (
      [
        value?.title,
        value?.dateFinish,
        value?.price,
        value?.description,
      ].includes(undefined)
    ) {
      alert("É preciso preencher todos os campos");
      return;
    }
    createDialog.close();
    await createProject({
      variables: {
        userId: data.Auth.payload.id,
        title: value?.title,
        dateStart:
          value?.dateStart ||
          new Date(
            new Date(
              `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
            )
          ),
        dateFinish: dateFinish,

        description: value?.description,
        price: value?.price,
        currency: "R$",
      },
      refetchQueries: [GET_PROJECT],
    });
  }

  const timeStart =
    parseInt(value?.timeStart?.split(":")[0] as string) * 60 +
      parseInt(value?.timeStart?.split(":")[1] as string) ||
    new Date().getHours() * 60 + new Date().getMinutes();

  const timeEnd =
    parseInt(value?.timeEnd?.split(":")[0] as string) * 60 +
    parseInt(value?.timeEnd?.split(":")[1] as string);

  function getProps(project: Project) {
    setProject(project);
  }

  function isFix(fix: boolean) {
    setFixed(fix);
  }

  function EditProject() {
    const minutes = timeEnd - timeStart;

    if (timeStart > timeEnd) {
      alert("Tempo de projeto não pode exceder o dia.");
      return;
    }
    if ([value?.timeEnd, value?.todo].includes(undefined)) {
      alert("É preciso preencher todos os campos");
      return;
    }

    const days = Math.ceil(
      (new Date().getTime() -
        (parseInt(project?.dateStart.toString() as string) +
          (project?.daily as day[]).length * 24 * 60 * 60 * 1000)) /
        (24 * 60 * 60 * 1000)
    );
    if (fixed) {
      for (let i = 0; i < days - (days / 30) * 8; i++) {
        setTimeout(() => {
          updateProject({
            variables: {
              id: project?.id,
              hour: minutes / 60,
              todo: "",
            },
            refetchQueries: [GET_PROJECT],
          });
        }, 100 * i);
      }
    }

    editDialog.close();
    for (let i = 0; i < days - (days / 30) * 8; i++) {
      setTimeout(() => {
        updateProject({
          variables: {
            id: project?.id,
            hour: 0,
            todo: "",
          },
          refetchQueries: [GET_PROJECT],
        });
      }, 100 * i);
    }

    updateProject({
      variables: {
        id: project?.id,
        hour: minutes / 60,
        todo: value?.todo + "",
      },
      refetchQueries: [GET_PROJECT],
    });
  }

  function DeleteProject() {
    deleteProject({
      variables: {
        id: project?.id,
      },
      refetchQueries: [GET_PROJECT],
    });
    editDialog.close();
  }

  function Finish() {
    FinishProject({
      variables: {
        id: project?.id,
      },
      refetchQueries: [GET_PROJECT],
    });
    confirmDialog.close();
  }

  return (
    <DialogContext.Provider
      value={{
        createDialog,
        editDialog,
        confirmDialog,
        CreateProject,
        EditProject,
        DeleteProject,
        Finish,
        handleValue,
        getProps,
        isFix,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
