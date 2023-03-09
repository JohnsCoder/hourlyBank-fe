import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DialogProvider from "../../contexts/components/dialog.context";
import {
  CreateDialog,
  EditDialog,
  ConfirmWindow,
} from "../../components/dialog";
import userEvent from "@testing-library/user-event/";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import fetch from "cross-fetch";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LoginProvider from "../../contexts/pages/login.context";
import CardProvider from "../../contexts/components/card.context";
import Login from "../../pages/login";
import Homepage from "../../pages/homepage";
import { act } from "react-dom/test-utils";
import { delay } from "../../utils/delay";
import HomepageProvider from "../../contexts/pages/homepage.context";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8000/", fetch }),
  cache: new InMemoryCache({}),
});

describe("Dialog Component", () => {
  it("create dialog default window", () => {
    const { getByPlaceholderText, getByText, getByDisplayValue, getByTestId } =
      render(
        <ApolloProvider client={client}>
          <DialogProvider>
            <CreateDialog />
          </DialogProvider>
        </ApolloProvider>
      );
    expect(getByPlaceholderText("Title...")).toBeInTheDocument();
    expect(getByTestId("date-start")).toBeInTheDocument();
    expect(
      getByDisplayValue(
        `
              ${new Date(Date.now()).getFullYear()}-${(
          new Date(Date.now()).getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${new Date(Date.now())
          .getUTCDate()
          .toString()
          .padStart(2, "0")}`.trim()
      )
    ).toBeInTheDocument();
    expect(getByTestId("date-finish")).toBeInTheDocument();
    expect(getByDisplayValue("0")).toBeInTheDocument();
    expect(getByDisplayValue("R$")).toBeInTheDocument();
    expect(getByPlaceholderText("Description...")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Confirm")).toBeInTheDocument();
  });

  it("edit dialog default window", () => {
    const { getByPlaceholderText, getByText, getByDisplayValue } = render(
      <ApolloProvider client={client}>
        <DialogProvider>
          <EditDialog />
        </DialogProvider>
      </ApolloProvider>
    );
    expect(getByDisplayValue("10:30")).toBeInTheDocument();
    expect(getByDisplayValue("18:00")).toBeInTheDocument();
    expect(getByPlaceholderText("Oque fiz hoje?")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
    expect(getByText("Confirm")).toBeInTheDocument();
  });

  it("confirm dialog default window", () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <DialogProvider>
          <ConfirmWindow />
        </DialogProvider>
      </ApolloProvider>
    );
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Confirm")).toBeInTheDocument();
  });
});

describe("dialog features", () => {
  it("create dialog features", async () => {
    const { getByTestId, getByText, getByPlaceholderText, debug, getByRole } =
      render(
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
    await act(() => delay(1200).finally());

    expect(getByTestId("homepageWindow")).toBeInTheDocument();
    await userEvent.click(getByTestId("createDialog"));

    expect(getByTestId("create-dialog-window")).toBeVisible();

    await userEvent.type(getByPlaceholderText("Title..."), "value1");

    await userEvent.type(getByTestId("date-start"), "0001-01-01");

    await userEvent.type(getByTestId("date-finish"), "0002-02-02");

    await userEvent.selectOptions(getByTestId("currency"), "U$");
    await userEvent.type(getByTestId("price"), "15");
    await userEvent.type(getByPlaceholderText("Description..."), "my bitch");
    await userEvent.click(getByTestId("confirm-create"));

    expect(getByTestId("create-dialog-window")).not.toBeVisible();

    await userEvent.click(getByTestId("createDialog"));

    await act(() => delay(1200).finally());

    await userEvent.click(getByTestId("cancel-create"));

    expect(getByTestId("create-dialog-window")).not.toBeVisible();
  });

  it("create dialog - empty values", async () => {
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
    window.alert = () => {};
    await userEvent.type(getByPlaceholderText("Email..."), "value2@email.com");
    await userEvent.type(getByPlaceholderText("Password..."), "value3123");
    await userEvent.click(getByTestId("login"));
    await act(() => delay(1200).finally());

    expect(getByTestId("homepageWindow")).toBeInTheDocument();
    await userEvent.click(getByTestId("createDialog"));

    expect(getByTestId("create-dialog-window")).toBeVisible();

    await userEvent.click(getByTestId("confirm-create"));
    expect(getByTestId("create-dialog-window")).toBeVisible();
  });

  it("edit dialog - empty values", async () => {
    const {
      getByTestId,
      getByText,
      getByPlaceholderText,
      debug,
      findByTestId,
    } = render(
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
    window.alert = () => {};
    await userEvent.type(getByPlaceholderText("Email..."), "value2@email.com");
    await userEvent.type(getByPlaceholderText("Password..."), "value3123");
    await userEvent.click(getByTestId("login"));
    await act(() => delay(1200).finally());

    expect(getByTestId("homepageWindow")).toBeInTheDocument();

    await userEvent.click(getByTestId("cardWindow"));

    expect(getByTestId("edit-dialog-window")).toBeVisible();

    await userEvent.click(getByTestId("confirm-edit"));

    expect(getByTestId("edit-dialog-window")).toBeVisible();
  });

  it("edit dialog - impossible time defined", async () => {
    const {
      getByTestId,
      getByText,
      getByPlaceholderText,
      debug,
      findByTestId,
    } = render(
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
    window.alert = () => {};
    await userEvent.type(getByPlaceholderText("Email..."), "value2@email.com");
    await userEvent.type(getByPlaceholderText("Password..."), "value3123");
    await userEvent.click(getByTestId("login"));
    await act(() => delay(1200).finally());

    expect(getByTestId("homepageWindow")).toBeInTheDocument();

    await userEvent.click(getByTestId("cardWindow"));

    expect(getByTestId("edit-dialog-window")).toBeVisible();

    await userEvent.type(getByPlaceholderText("Title..."), "value1");
    await userEvent.clear(getByTestId("start-hour"));
    await userEvent.clear(getByTestId("finish-hour"));
    await userEvent.type(getByTestId("start-hour"), "20:00");
    await userEvent.type(getByTestId("finish-hour"), "19:00");
    await userEvent.click(getByTestId("complete-days"));
    await userEvent.type(getByPlaceholderText("Oque fiz hoje?"), "nada");
    await userEvent.click(getByTestId("confirm-edit"));

    expect(getByTestId("edit-dialog-window")).toBeVisible();
  });

  it("edit dialog features", async () => {
    const {
      getByTestId,
      getByText,
      getByPlaceholderText,
      debug,
      findByTestId,
    } = render(
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
    await act(() => delay(1200).finally());

    expect(getByTestId("homepageWindow")).toBeInTheDocument();

    await userEvent.click(getByTestId("cardWindow"));

    expect(getByTestId("edit-dialog-window")).toBeVisible();

    await userEvent.type(getByPlaceholderText("Title..."), "value1");
    await userEvent.clear(getByTestId("start-hour"));
    await userEvent.clear(getByTestId("finish-hour"));
    await userEvent.type(getByTestId("start-hour"), "08:30");
    await userEvent.type(getByTestId("finish-hour"), "17:00");
    await userEvent.click(getByTestId("complete-days"));
    await userEvent.type(getByPlaceholderText("Oque fiz hoje?"), "nada");
    await userEvent.click(getByTestId("confirm-edit"));

    expect(getByTestId("edit-dialog-window")).not.toBeVisible();

    await userEvent.click(getByTestId("cardWindow"));
    await userEvent.click(getByTestId("cancel-edit"));

    expect(getByTestId("edit-dialog-window")).not.toBeVisible();

    await userEvent.click(getByTestId("cardWindow"));
    await userEvent.click(getByTestId("delete-edit"));

    expect(getByTestId("edit-dialog-window")).not.toBeVisible();
  });

  it("confirm dialog features", async () => {
    const {
      getByTestId,
      getByText,
      getByPlaceholderText,
      debug,
      findByTestId,
    } = render(
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
    await act(() => delay(1200).finally());

    expect(getByTestId("homepageWindow")).toBeInTheDocument();

    await userEvent.click(getByTestId("createDialog"));

    expect(getByTestId("create-dialog-window")).toBeVisible();

    await userEvent.type(getByPlaceholderText("Title..."), "value1");
    await userEvent.type(getByTestId("date-start"), "0001-01-01");
    await userEvent.type(getByTestId("date-finish"), "0002-02-02");
    await userEvent.type(getByTestId("price"), "15");
    await userEvent.type(getByPlaceholderText("Description..."), "my bitch");
    await userEvent.click(getByTestId("confirm-create"));

    expect(getByTestId("create-dialog-window")).not.toBeVisible();

    await act(() => delay(1200).finally());

    await userEvent.click(getByTestId("finishButton"));

    expect(getByTestId("finish-dialog-window")).toBeVisible();

    await userEvent.click(getByTestId("cancel-finish"));

    expect(getByTestId("finish-dialog-window")).not.toBeVisible();

    await userEvent.click(getByTestId("finishButton"));

    await userEvent.click(getByTestId("confirm-finish"));
    await act(() => delay(1200).finally());

    expect(getByTestId("finish-dialog-window")).not.toBeVisible();
    await userEvent.click(getByTestId("show-cards"));
    await userEvent.click(getByTestId("show-cards"));
    await userEvent.click(getByTestId("show-cards"));

    await userEvent.click(getByTestId("delete-finished"));
    await act(() => delay(1200).finally());
  }, 7000);
});
