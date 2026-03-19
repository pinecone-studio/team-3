import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: createHttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? "https://asset-management-service.ariuntuguldur3.workers.dev/graphql"
        : "https://asset-management-service.tuguldur-r.workers.dev/graphql",
  }),
  cache: new InMemoryCache(),
});
