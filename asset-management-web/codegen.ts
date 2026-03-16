import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8787/graphql"
      : "https://asset-management-service.ariuntuguldur3.workers.dev/graphql",
  documents: ["src/app/**/*.{ts,tsx,graphql}", "!gql/**/*"],
  generates: {
    "./src/gql/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withResultType: true,
        addDocBlocks: false,
        apolloClientVersion: 4,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
