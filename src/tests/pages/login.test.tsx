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

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import fetch from "cross-fetch";


const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8000/", fetch }),
  cache: new InMemoryCache({}),
});

describe("login page", () => {
  it("default window", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ApolloProvider client={client}>

      <BrowserRouter>
        <LoginProvider>
          <Login />
        </LoginProvider>
      </BrowserRouter>
      </ApolloProvider>

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
      <ApolloProvider client={client}>

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

      </ApolloProvider>

    );

    await userEvent.click(getByText("Login"));
    await userEvent.click(getByTestId("login"));
    expect(getByTestId("homepageWindow")).toBeInTheDocument();
  });
});
