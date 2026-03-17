import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { assets } from './assets.schema';

export const categories = sqliteTable('categories', {
	id: text('id').primaryKey(),
	name: text('name').notNull().unique(),
	description:text()
});
export const categoriesRelations = relations(categories, ({ many }) => ({
	assets: many(assets),
}));
