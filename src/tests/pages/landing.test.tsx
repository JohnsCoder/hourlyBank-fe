import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import React from "react";
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import Landing from "../../pages/landing";
import Login from "../../pages/login";
import Register from "../../pages/register";

describe("landing page", () => {
  it("default window", () => {
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );

    expect(getByTestId("blockOne")).toBeInTheDocument();
    expect(getByTestId("menu")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByText("Register")).toBeInTheDocument();
    expect(getByTestId("blockTwo")).toBeInTheDocument();
  });
});

describe("landing page features ", () => {
  it("landing page features", async () => {
    const { getByText, findByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
    const login = getByText("Login");
    await userEvent.click(login);

    expect(await findByTestId("loginWindow")).toBeInTheDocument();
  });

  it("register feature", async () => {
    const { getByText, findByTestId } = render(
      <MemoryRouter>
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(getByText("Register"));

    expect(await findByTestId("registerWindow")).toBeInTheDocument();
  });
});
