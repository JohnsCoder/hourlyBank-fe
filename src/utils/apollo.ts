import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";

export const client = new ApolloClient({
  uri: "https://hourlybank-be.onrender.com/",
  cache: new InMemoryCache({}),
});