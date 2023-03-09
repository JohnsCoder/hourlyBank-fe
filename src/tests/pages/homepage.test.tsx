import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import CardProvider from "../../contexts/components/card.context";
import DialogProvider from "../../contexts/components/dialog.context";
import Homepage from "../../pages/homepage";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import fetch from "cross-fetch";
import Landing from "../../pages/landing";
import { delay } from "../../lib/delay";
import { act } from "react-dom/test-utils";
import Login from "../../pages/login";
import LoginProvider from "../../contexts/pages/login.context";
import HomepageProvider from "../../contexts/pages/homepage.context";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8000/", fetch }),
  cache: new InMemoryCache({}),
});

describe("home page", () => {
  it("default window", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <DialogProvider>
            <CardProvider>
              <HomepageProvider>
                <Homepage />
              </HomepageProvider>
            </CardProvider>
          </DialogProvider>
        </BrowserRouter>
      </ApolloProvider>
    );
    expect(getByTestId("homepageWindow")).toBeInTheDocument();
    expect(getByTestId("header")).toBeInTheDocument();
    expect(getByTestId("createDialog")).toBeInTheDocument();
    expect(getByPlaceholderText("Search...")).toBeInTheDocument();

    expect(getByTestId("logout")).toBeInTheDocument();
    expect(getByTestId("cards")).toBeInTheDocument();
    expect(getByTestId("cards-split")).toBeInTheDocument();
    expect(getByTestId("hidden-cards")).toBeInTheDocument();

    expect(getByTestId("footer")).toBeInTheDocument();
    expect(getByTestId("create-dialog-window")).not.toBeVisible();
    expect(getByTestId("edit-dialog-window")).not.toBeVisible();
    expect(getByTestId("finish-dialog-window")).not.toBeVisible();
  });
});

describe("homepage page features ", () => {
  it("logout feature", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginProvider>
            <CardProvider>
              <DialogProvider>
                <HomepageProvider>
                  <Routes>
                    <Route path={"/"} element={<Landing />} />
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
    await act(() => delay(1200).finally());

    expect(getByTestId("homepageWindow")).toBeInTheDocument();
    await userEvent.click(getByTestId("logout"));
    await act(() => delay(1200).finally());

    expect(getByTestId("landingWindow")).toBeInTheDocument();
  });

  it("show finished cards feature", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginProvider>
            <CardProvider>
              <DialogProvider>
                <HomepageProvider>
                  <Routes>
                    <Route path={"/"} element={<Landing />} />
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
    await act(() => delay(1200).finally());

    expect(getByTestId("homepageWindow")).toBeInTheDocument();
    await userEvent.click(getByTestId("show-cards"));
    expect(getByTestId("hidden-cards")).toBeVisible();
  });

  it("craeteDialog feature", async () => {
    const { getByTestId } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <CardProvider>
            <DialogProvider>
              <HomepageProvider>
                <Homepage />
              </HomepageProvider>
            </DialogProvider>
          </CardProvider>
        </BrowserRouter>
      </ApolloProvider>
    );
    await userEvent.click(getByTestId("createDialog"));
    expect(getByTestId("create-dialog-window")).toBeVisible();
  });

});
