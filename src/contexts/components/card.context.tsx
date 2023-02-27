import React, { createContext, ReactNode } from "react";
import type { Property as CSS } from "csstype";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../queries/project.query";
import { AUTHENTICATE } from "../../queries/user.query";
import Cookies from "../../lib/cookies";

interface CardContext {
  getProjects: Card[];
}
type Card = {
  id: string;
  title: string;
  price: number;
  description: string;
  finished: boolean;
  currency: string;
  daily: Daily[];
  dateStart: Date;
  dateFinish: Date;
};

type Daily = {
  hour: number;
  todo: string;
  day: number;
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
      userId: !id.loading && id?.data?.Auth?.payload?.id,
    },
  });

  const getProjects = projects?.data?.GetProjects?.projects;

  return (
    <CardContext.Provider value={{ getProjects }}>
      {children}
    </CardContext.Provider>
  );
}
