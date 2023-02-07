import React, { createContext, ReactNode, useState } from "react";
import type { Property as CSS } from "csstype";
type Display = {
  create: CSS.Display;
  edit: CSS.Display;
  confirm: CSS.Display;
};
type Operation = {
  open: () => void;
  close: () => void;
};

interface HomepageContext {
  createCard: Operation;
  editCard: Operation;
  confirmCard: Operation;
  display: Display;
}

export const HomepageContext = createContext({} as HomepageContext);

export default function HomepageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const initialValue = { create: "none", edit: "none", confirm: "none" };
  const [display, setDisplay] = useState<Display>(initialValue);

  function open(vis: CSS.Display[]) {
    setDisplay((display) => ({
      create: vis[0],
      edit: vis[1],
      confirm: vis[2],
    }));
  }

  function close() {
    setDisplay(initialValue);
  }
  const createCard = {
    open() {
      return open(["flex", "none", "none"]);
    },
    close,
  };

  const editCard = {
    open() {
      return open(["none", "flex", "none"]);
    },
    close,
  };

  const confirmCard = {
    open() {
      open(["none", "none", "flex"]);
    },
    close,
  };

  return (
    <HomepageContext.Provider
      value={{ createCard, editCard, confirmCard, display }}
    >
      {children}
    </HomepageContext.Provider>
  );
}
