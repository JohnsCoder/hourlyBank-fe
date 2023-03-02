import React, { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "../../lib/cookies";

interface HomepageContext {
  getBack: () => void;
}
export const HomepageContext = createContext({} as HomepageContext);

export default function HomepageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useNavigate();

  function getBack() {
    new Cookies().remove();
    navigate("/");
  }

  return (
    <HomepageContext.Provider value={{ getBack }}>
      {children}
    </HomepageContext.Provider>
  );
}
