import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CardProvider from "../../contexts/components/card.context";
import DialogProvider from "../../contexts/components/dialog.context";
import Homepage from "../../pages/homepage";

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
          <DialogProvider>
            <CardProvider>
              <Homepage />
            </CardProvider>
          </DialogProvider>
        </BrowserRouter>
      </ApolloProvider>
    );
    expect(getByTestId("homepageWindow")).toBeInTheDocument();
    expect(getByTestId("header")).toBeInTheDocument();
    expect(getByTestId("createDialog")).toBeInTheDocument();
    expect(getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(getByTestId("cards")).toBeInTheDocument();
    // expect(getByTestId("cardWindow")).toBeInTheDocument();
    // expect(getByTestId("heading")).toBeInTheDocument();
    // expect(getByTestId("status")).toBeInTheDocument();
    // expect(getByTestId("paragraph")).toBeInTheDocument();
    // expect(getByTestId("confirmButton")).toBeInTheDocument();
    expect(getByTestId("footer")).toBeInTheDocument();
    expect(getByTestId("create-dialog-window")).not.toBeVisible();
    expect(getByTestId("edit-dialog-window")).not.toBeVisible();
    expect(getByTestId("confirm-dialog-window")).not.toBeVisible();
  });
});

describe("homepage page features ", () => {
  it("createDialog feature", async () => {
    const { getByTestId } = render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <DialogProvider>
            <Homepage />
          </DialogProvider>
        </BrowserRouter>
      </ApolloProvider>
    );
    await userEvent.click(getByTestId("createDialog"));
    expect(getByTestId("create-dialog-window")).toBeVisible();
  });

  // it("editDialog feature", async () => {
  //   const { getByTestId } = render(
  //     <ApolloProvider client={client}>
  //       <BrowserRouter>
  //         <CardProvider>
  //           <DialogProvider>
  //             <Homepage />
  //           </DialogProvider>
  //         </CardProvider>
  //       </BrowserRouter>
  //     </ApolloProvider>
  //   );
  //   await userEvent.click(getByTestId("cardWindow"));
  //   expect(getByTestId("edit-dialog-window")).toBeVisible();
  // });

  // it("confirmDialog feature", async () => {
  //   const { getByTestId } = render(
  //     <ApolloProvider client={client}>
  //       <BrowserRouter>
  //         <DialogProvider>
  //           <CardProvider>
  //             <Homepage />
  //           </CardProvider>
  //         </DialogProvider>
  //       </BrowserRouter>
  //     </ApolloProvider>
  //   );
  //   await userEvent.click(getByTestId("confirmButton"));
  //   expect(getByTestId("confirm-dialog-window")).toBeVisible();
  // });
});
