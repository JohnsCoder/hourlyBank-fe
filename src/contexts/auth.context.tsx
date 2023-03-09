import { useQuery } from "@apollo/client";
import React, { createContext, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "../lib/cookies";
import { AUTHENTICATE } from "../queries/user.query";

interface AuthContext {}

export const AuthContext = createContext({} as AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const auth = useQuery(AUTHENTICATE, {
    variables: {
      token: new Cookies().get().loginToken,
    },
  });
  const location = useLocation().pathname;
  if (location === "/homepage") {
    if (auth?.data?.Auth?.code === 401) {
      navigate("/");
      new Cookies().remove("loginToken")
    }
  }

  if (location !== "/homepage") {
    if (auth?.data?.Auth?.code === 200) {
      navigate("/homepage");
    }
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
