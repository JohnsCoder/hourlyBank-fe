import React, { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "../../lib/cookies";
import type { Property as CSS } from "csstype";

interface HomepageContext {
  getBack: () => void;
  show: () => void;
  style: Style;
}

type Style = {
  display: CSS.Display;
  transform: CSS.Transform;

};
export const HomepageContext = createContext({} as HomepageContext);

export default function HomepageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [style, setStyle] = useState<Style>({
    display: "none",
    transform: "none",
  });

  const navigate = useNavigate();

  function getBack() {
    new Cookies().remove("loginToken");
    navigate("/");
  }

  function show() {
    if (style.display === "none") {
      setStyle((style) => ({
        ...style,
        display: "grid",
      }));
    } else
      setStyle((style) => ({
        ...style,
        display: "none",
      }));

    if (style.transform === "none") {
      setStyle((style) => ({
        ...style,
        transform: "rotate(180deg)",
      }));
    } else
      setStyle((style) => ({
        ...style,
        transform: "none",
      }));
  }

  return (
    <HomepageContext.Provider value={{ getBack, show, style }}>
      {children}
    </HomepageContext.Provider>
  );
}
