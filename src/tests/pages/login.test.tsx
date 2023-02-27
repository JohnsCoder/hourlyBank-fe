import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import LoginProvider from "../../contexts/pages/login.context";

import Login from "../../pages/login";
import Landing from "../../pages/landing";
import Homepage from "../../pages/homepage";
import CardProvider from "../../contexts/components/card.context";
import DialogProvider from "../../contexts/components/dialog.context";

describe("login page", () => {
  it("default window", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <BrowserRouter>
        <LoginProvider>
          <Login />
        </LoginProvider>
      </BrowserRouter>
    );
    expect(getByTestId("getBack")).toBeInTheDocument();
    expect(getByPlaceholderText("Email...")).toBeInTheDocument();
    expect(getByPlaceholderText("Password...")).toBeInTheDocument();
    expect(getByTestId("login")).toBeInTheDocument();
  });
});

describe("login features", () => {
  it("login feature", async () => {
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <LoginProvider>
          <CardProvider>
            <DialogProvider>
              <Routes>
                <Route path={"/"} element={<Landing />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/homepage"} element={<Homepage />} />
              </Routes>
            </DialogProvider>
          </CardProvider>
        </LoginProvider>
      </BrowserRouter>
    );

    await userEvent.click(getByText("Login"));
    await userEvent.click(getByTestId("login"));
    expect(getByTestId("homepageWindow")).toBeInTheDocument();
  });
});
