import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";

export const client = new ApolloClient({
  uri: "http://localhost:8000/",
  cache: new InMemoryCache({}),
});
