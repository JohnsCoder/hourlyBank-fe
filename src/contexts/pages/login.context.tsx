import React, { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
interface LoginContext {
  login: () => void;
}
export const LoginContext = createContext({} as LoginContext);

export default function LoginProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  function login() {
    navigate("/homepage");
  }
  return (
    <LoginContext.Provider value={{ login }}>{children}</LoginContext.Provider>
  );
}
  