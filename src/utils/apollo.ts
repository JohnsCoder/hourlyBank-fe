import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
export const client = new ApolloClient({
  uri: "https://hourlybank.onrender.com/",
  cache: new InMemoryCache({}),
});
