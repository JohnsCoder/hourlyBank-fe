import React, { createContext, ReactNode, useContext } from "react";
import { HomepageContext } from "../pages/homepage.context";

interface CardContext {
     closeWindow: () => void;
}

export const CardContext = createContext({} as CardContext)

export default function CardProvider ({children}: {children: ReactNode}) {

     function closeWindow () {
     }
     return (
          <CardContext.Provider value={{closeWindow}}>
               {children}
          </CardContext.Provider>
     )
}