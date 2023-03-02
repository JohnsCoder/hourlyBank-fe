import React from "react";
import { render } from "@testing-library/react";
import Card from "../../components/card";
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

describe("Card Component", () => {
  it("default window", async () => {
    const { getByTestId } = render(
      <ApolloProvider client={client}>
        <CardProvider>
          <DialogProvider>
            <Card />
          </DialogProvider>
        </CardProvider>
      </ApolloProvider>
    );

    expect(getByTestId("message")).toBeInTheDocument();
  });
});
