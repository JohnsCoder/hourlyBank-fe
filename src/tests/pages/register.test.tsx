import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterProvider from "../../contexts/pages/register.context";
import Register from "../../pages/register";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8000/", fetch }),
  cache: new InMemoryCache({}),
});


describe("register page", () => {
  it("default window", () => {
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

describe("register features", () => {
  it("login feature", async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          {/* <Navigate to="/register" /> */}
          <RegisterProvider>
            <Routes>
              <Route path={"/register"} element={<Register />} />
            </Routes>
          </RegisterProvider>
        </BrowserRouter>
      </ApolloProvider>
    );
    await userEvent.type(getByPlaceholderText("Username..."), "value1");
    await userEvent.type(getByPlaceholderText("Email..."), "value2@gmail.com");
    await userEvent.type(getByPlaceholderText("Password..."), "value3123");
    await userEvent.click(getByText("Register"));
    await userEvent.click(getByTestId("register"));
    expect(getByTestId("loginWindow")).toBeInTheDocument();
  });
});
