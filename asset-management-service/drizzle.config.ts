import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db",
  out: "./src/db/migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: '324c6292dd52998c5d08c21f77ce1b8f',
    databaseId: '6875a5f9-1fc7-4723-891a-56e1864a0e85',
    token: 'o6C2bi29rzyDC6LFdOJYnVc-9nHrWDfw-8rWkPaJ',
  },
});