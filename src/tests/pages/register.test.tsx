import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import RegisterProvider from "../../contexts/pages/register.context";
import Register from "../../pages/register";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import fetch from "cross-fetch";
import Login from "../../pages/login";
import { act } from "react-dom/test-utils";
import { delay } from "../../lib/delay";
import Landing from "../../pages/landing";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8000/", fetch }),
  cache: new InMemoryCache({}),
});

describe("register page", () => {
  it("default window", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <RegisterProvider>
            <Register />
          </RegisterProvider>
        </BrowserRouter>
      </ApolloProvider>
    );

    expect(getByTestId("getBack")).toBeInTheDocument();
    expect(getByPlaceholderText("Username...")).toBeInTheDocument();
    expect(getByPlaceholderText("Email...")).toBeInTheDocument();
    expect(getByPlaceholderText("Password...")).toBeInTheDocument();
    expect(getByTestId("register")).toBeInTheDocument();
  });
});

describe("page features", () => {
  it("get back button", async () => {
    const { getByTestId, debug } = render(
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={["/register"]}>
          <RegisterProvider>
            <Routes>
              <Route path={"/"} element={<Landing />} />
              <Route path={"/register"} element={<Register />} />
            </Routes>
          </RegisterProvider>
        </MemoryRouter>
      </ApolloProvider>
    );

    await userEvent.click(getByTestId("getBack"));
    expect(getByTestId("landingWindow")).toBeInTheDocument();
  });

  it("register", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={["/register"]}>
          <RegisterProvider>
            <Routes>
              <Route path={"/register"} element={<Register />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </RegisterProvider>
        </MemoryRouter>
      </ApolloProvider>
    );
    await userEvent.type(getByPlaceholderText("Username..."), "value1");
    await userEvent.type(getByPlaceholderText("Email..."), `${Math.random()}`);
    await userEvent.type(getByPlaceholderText("Password..."), "value3123");
    await userEvent.click(getByTestId("register"));
    await act(() => delay(1200).finally());
    expect(getByTestId("loginWindow")).toBeInTheDocument();
    cleanup();
  });

  
});
describe("register exeptions", () => {

  it("empty values", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={["/register"]}>
          <RegisterProvider>
            <Routes>
              <Route path={"/register"} element={<Register />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </RegisterProvider>
        </MemoryRouter>
      </ApolloProvider>
    );
    window.alert = () => {};
    await userEvent.click(getByTestId("register"));
    await act(() => delay(1200).finally());
    expect(getByTestId("registerWindow")).toBeInTheDocument();
  });



  it("used email", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={["/register"]}>
          <RegisterProvider>
            <Routes>
              <Route path={"/register"} element={<Register />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </RegisterProvider>
        </MemoryRouter>
      </ApolloProvider>
    );
    window.alert = () => {};
    await userEvent.type(getByPlaceholderText("Username..."), "value1");
    await userEvent.type(getByPlaceholderText("Email..."), "value2@email.com");
    await userEvent.type(getByPlaceholderText("Password..."), "value3123");
    await userEvent.click(getByTestId("register"));
    await act(() => delay(1200).finally());
    expect(getByTestId("registerWindow")).toBeInTheDocument();
  });

})