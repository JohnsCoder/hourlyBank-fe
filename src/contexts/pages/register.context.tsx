import React, { Children, ReactNode, ReactPortal } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../../pages/register";
interface RegisterContext {
  register: () => void;
}
export const RegisterContext = createContext({} as RegisterContext);

export default function RegisterProvider( {children}: {children: ReactNode}) {
  const navigate = useNavigate();
  function register() {
    navigate("/login");
  }
  return (
    <RegisterContext.Provider value={{ register }}>
      {children}
    </RegisterContext.Provider>
  );
}
