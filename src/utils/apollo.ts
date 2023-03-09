import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL || "http://localhost:8000/",
  cache: new InMemoryCache({}),
});
  