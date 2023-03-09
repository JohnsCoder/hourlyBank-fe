import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
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
import { act } from "react-dom/test-utils";
import { delay } from "../../lib/delay";
import HomepageProvider from "../../contexts/pages/homepage.context";

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

describe("page features", () => {
  it("get back button", async () => {
    const { getByTestId } = render(
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginProvider>
            <Routes>
              <Route path={"/"} element={<Landing />} />
              <Route path={"/login"} element={<Login />} />
            </Routes>
          </LoginProvider>
        </MemoryRouter>
      </ApolloProvider>
    );

    await userEvent.click(getByTestId("getBack"));
    expect(getByTestId("landingWindow")).toBeInTheDocument();
  });

  it("login", async () => {
    const { getByTestId, getByText, getByPlaceholderText, debug } = render(
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginProvider>
            <CardProvider>
              <DialogProvider>
                <HomepageProvider>
                  <Routes>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/homepage"} element={<Homepage />} />
                  </Routes>
                </HomepageProvider>
              </DialogProvider>
            </CardProvider>
          </LoginProvider>
        </MemoryRouter>
      </ApolloProvider>
    );

    await userEvent.type(getByPlaceholderText("Email..."), "value2@email.com");
    await userEvent.type(getByPlaceholderText("Password..."), "value3123");
    await userEvent.click(getByTestId("login"));
    await act(() => delay(1000).finally());

    expect(getByTestId("homepageWindow")).toBeInTheDocument();
  });

  describe("login exception", () => {
    it(" wrong entries", async () => {
      const { getByTestId, getByText, getByPlaceholderText } = render(
        <ApolloProvider client={client}>
          <MemoryRouter initialEntries={["/login"]}>
            <LoginProvider>
              <CardProvider>
                <DialogProvider>
                  <Routes>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/homepage"} element={<Homepage />} />
                  </Routes>
                </DialogProvider>
              </CardProvider>
            </LoginProvider>
          </MemoryRouter>
        </ApolloProvider>
      );
      window.alert = () => {};

      await userEvent.type(
        getByPlaceholderText("Email..."),
        "wrongEmail@email.com"
      );
      await userEvent.type(
        getByPlaceholderText("Password..."),
        "worongPassword"
      );
      await userEvent.click(getByTestId("login"));
      await act(() => delay(1000).finally());

      expect(getByTestId("loginWindow")).toBeInTheDocument();
    });

    it(" empty entries", async () => {
      const { getByTestId, getByText, getByPlaceholderText } = render(
        <ApolloProvider client={client}>
          <MemoryRouter initialEntries={["/login"]}>
            <LoginProvider>
              <CardProvider>
                <DialogProvider>
                  <Routes>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/homepage"} element={<Homepage />} />
                  </Routes>
                </DialogProvider>
              </CardProvider>
            </LoginProvider>
          </MemoryRouter>
        </ApolloProvider>
      );
      window.alert = () => {};

      await userEvent.click(getByTestId("login"));
      await act(() => delay(1000).finally());

      expect(getByTestId("loginWindow")).toBeInTheDocument();
    });
  });
});
