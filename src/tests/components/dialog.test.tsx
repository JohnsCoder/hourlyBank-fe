import React from "react";
import { render } from "@testing-library/react";
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

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8000/", fetch }),
  cache: new InMemoryCache({}),
});

describe("Dialog Component", () => {
  it("create dialog default window", () => {
    const { getByPlaceholderText, getByText, getByDisplayValue } = render(
      <ApolloProvider client={client}>
        <DialogProvider>
          <CreateDialog />
        </DialogProvider>
      </ApolloProvider>
    );
    expect(getByPlaceholderText("Title...")).toBeInTheDocument();
    expect(getByDisplayValue("2023-01-17")).toBeInTheDocument();
    expect(getByDisplayValue("2003-11-27")).toBeInTheDocument();
    expect(getByDisplayValue("2000")).toBeInTheDocument();
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
    const { getByText, getByTestId } = render(
      <ApolloProvider client={client}>
        <DialogProvider>
          <CreateDialog />
        </DialogProvider>
      </ApolloProvider>
    );

    await userEvent.click(getByText("Cancel"));
    expect(getByTestId("create-dialog-window")).not.toBeVisible();

    await userEvent.click(getByText("Confirm"));
    expect(getByTestId("create-dialog-window")).not.toBeVisible();
  });

  it("edit dialog features", async () => {
    const { getByText, getByTestId } = render(
      <ApolloProvider client={client}>
        <DialogProvider>
          <EditDialog />
        </DialogProvider>
      </ApolloProvider>
    );

    await userEvent.click(getByText("Cancel"));
    expect(getByTestId("edit-dialog-window")).not.toBeVisible();

    await userEvent.click(getByText("Delete"));
    expect(getByTestId("edit-dialog-window")).not.toBeVisible();

    await userEvent.click(getByText("Confirm"));
    expect(getByTestId("edit-dialog-window")).not.toBeVisible();
  });

  it("confirm dialog features", async () => {
    const { getByText, getByTestId } = render(
      <ApolloProvider client={client}>
        <DialogProvider>
          <ConfirmWindow />
        </DialogProvider>
      </ApolloProvider>
    );
    await userEvent.click(getByText("Cancel"));
    expect(getByTestId("confirm-dialog-window")).not.toBeVisible();

    await userEvent.click(getByText("Confirm"));
    expect(getByTestId("confirm-dialog-window")).not.toBeVisible();
  });
});
