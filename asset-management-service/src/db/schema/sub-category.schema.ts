import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { categories } from './categories.schema';

export const subCategory = sqliteTable('sub_categories', {
    id: text('id').primaryKey(),
    name: text('name').notNull().unique(),
    categoryId: text('category_id').references(() => categories.id)
});

export const subCategoriesRelations = relations(subCategory, ({ one }) => ({
    category: one(categories, {
        fields: [subCategory.categoryId],  
        references: [categories.id],        
    }),
}));