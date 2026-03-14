"use client";

import { ApolloProvider } from "@apollo/client/react";
import { client } from "../_hooks/apollo-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
