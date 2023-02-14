import React, { ClassType, createContext, ReactNode, useState } from "react";
import type { Property as CSS } from "csstype";

interface HomepageContext {
  dialog: {
    create: IDisplay;
    edit: IDisplay;
    confirm: IDisplay;
  };
}

interface IDisplay {
  display: CSS.Display;
  open: () => void;
  close: () => void;
}

export const HomepageContext = createContext({} as HomepageContext);

export default function HomepageProvider({
  children,
}: {
  children: ReactNode;
}) {
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

  const dialog = {
    create: new Display(),
    edit: new Display(),
    confirm: new Display(),
  };

  return (
    <HomepageContext.Provider
      value={{
        dialog,
      }}
    >
      {children}
    </HomepageContext.Provider>
  );
}
