import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const department = sqliteTable('department', {
    id: text('id').primaryKey(),
    name: text('name').notNull().unique(),
});
