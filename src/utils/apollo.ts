import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_URL_API,
  cache: new InMemoryCache({}),
});