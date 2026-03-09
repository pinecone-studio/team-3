import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const assets = sqliteTable("assets", {
  id: text("id").notNull(),
  name: text("name").notNull(),
  category: text("category"),
});