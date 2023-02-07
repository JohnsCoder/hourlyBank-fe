import React from "react";
import { useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Homepage from "./pages/homepage";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";

function Paths() {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const routes = (
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/homepage"} element={<Homepage />} />
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
