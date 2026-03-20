import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: createHttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8787/graphql"
        : "https://asset-management-service.ariuntuguldur3.workers.dev/graphql",
  }),
  cache: new InMemoryCache(),
});
