import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Paths from "./routes";
import RegisterProvider from "./contexts/pages/register.context";
import LoginProvider from "./contexts/pages/login.context";
import HomepageProvider from "./contexts/pages/homepage.context";
import CardProvider from "./contexts/components/card.context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RegisterProvider>
        <LoginProvider>
          <HomepageProvider>
            <CardProvider>
              <Paths />
            </CardProvider>
          </HomepageProvider>
        </LoginProvider>
      </RegisterProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
