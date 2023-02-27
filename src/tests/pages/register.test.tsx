import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterProvider from "../../contexts/pages/register.context";
import Landing from "../../pages/landing";
import Login from "../../pages/login";
import Register from "../../pages/register";

describe("register page", () => {
  it("default window", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <BrowserRouter>
        <RegisterProvider>
          <Register />
        </RegisterProvider>
      </BrowserRouter>
    );
    expect(getByTestId("getBack")).toBeInTheDocument();
    expect(getByPlaceholderText("Username...")).toBeInTheDocument();
    expect(getByPlaceholderText("Email...")).toBeInTheDocument();
    expect(getByPlaceholderText("Password...")).toBeInTheDocument();
    expect(getByTestId("register")).toBeInTheDocument();
  });
});

describe("register features", () => {
  it("login feature", async () => {
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <RegisterProvider>
          <Routes>
            <Route path={"/"} element={<Landing />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
          </Routes>
        </RegisterProvider>
      </BrowserRouter>
    );

    await userEvent.click(getByText("Register"));
    await userEvent.click(getByTestId("register"));
    expect(getByTestId("loginWindow")).toBeInTheDocument();
  });
});
