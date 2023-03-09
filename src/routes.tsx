import React from "react";
import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import CardProvider from "./contexts/components/card.context";
import DialogProvider from "./contexts/components/dialog.context";
import HomepageProvider from "./contexts/pages/homepage.context";
import LoginProvider from "./contexts/pages/login.context";
import RegisterProvider from "./contexts/pages/register.context";
import Homepage from "./pages/homepage";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";

function Paths() {
  console.log(import.meta.env.VITE_API_URL)
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const routes = (
    <Routes>
      <Route path={"/"} element={<Landing />} />

      <Route
        path={"/register"}
        element={
          <RegisterProvider>
            <Register />
          </RegisterProvider>
        }
      />

      <Route
        path={"/login"}
        element={
          <LoginProvider>
            <Login />
          </LoginProvider>
        }
      />

      <Route
        path={"/homepage"}
        element={
          <CardProvider>
            <DialogProvider>
              <HomepageProvider>
                <Homepage />
              </HomepageProvider>
            </DialogProvider>
          </CardProvider>
        }
      />
    </Routes>
  );

  const paths = routes.props.children.map(
    (child: JSX.Element) => child.props.path
  );

  useEffect(() => {
    !paths.includes(location) && navigate("/");
  }, []);

  return routes;
}

export default Paths;
