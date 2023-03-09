import React, { createContext, ReactNode } from "react";
import type { Property as CSS } from "csstype";
import { QueryResult, useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../queries/project.query";
import { AUTHENTICATE } from "../../queries/user.query";
import Cookies from "../../lib/cookies";

interface CardContext {
  getProjects: Project[] | undefined;
}
type Project = {
  id: string;
  title?: string;
  dateStart: Date;
  dateFinish: Date;
  description?: string;
  currency?: string;
  price: number;
  finished?: boolean;
  timeStart?: string;
  timeEnd?: string;
  todo?: string;
  daily: Daily[];
};

type Daily = {
  hour: number;
  todo: string;
  day: number;
};

type Auth = {
  data: {
    Auth: {
      payload: Project;
    };
  };
};

type GetProjects = {
  data: {
    GetProjects: {
      projects: Project[];
    };
  };
};

export const CardContext = createContext({} as CardContext);

export default function CardProvider({ children }: { children: ReactNode }) {
  const id = useQuery(AUTHENTICATE, {
    variables: {
      token: new Cookies().get().loginToken || "",
    },
  });

  const projects = useQuery(GET_PROJECT, {
    variables: {
      userId: !id.loading && (id as Auth).data.Auth.payload?.id,
    },
  });

  const getProjects = (projects as GetProjects).data?.GetProjects.projects

  return (
    <CardContext.Provider value={{ getProjects }}>
      {children}
    </CardContext.Provider>
  );
}
