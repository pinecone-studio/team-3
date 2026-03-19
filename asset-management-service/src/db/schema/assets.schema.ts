import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { AssetStatusEnum } from '../../types/generated';
import { employees } from './employees.schema';
import { categories } from './categories.schema';
import {  relations } from 'drizzle-orm';
import { subCategory } from './sub-category.schema';
import { department } from './department.schema';

// --- 2. ASSETS ---
export const assets = sqliteTable('assets', {
	id: text('id').primaryKey(),
	assetTag: text('asset_tag').notNull().unique(),
	categoryId: text('category_id').references(() => categories.id).notNull(),
	subCategoryId: text('sub_category_id').references(() => subCategory.id).notNull(),
	serialNumber: text('serial_number').notNull(),
	status: text('status', {
		enum: [
			AssetStatusEnum.Assigned,
			AssetStatusEnum.Available,
			AssetStatusEnum.Disposed,
			AssetStatusEnum.InRepair,
			AssetStatusEnum.Lost,
			AssetStatusEnum.PendingDisposal,
		],
	}).notNull().default(AssetStatusEnum.Available),
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }).notNull(),
	purchaseCost: real('purchase_cost').notNull(),
	currentBookValue: real('current_book_value'),
	locationId: text('location_id').notNull(),
	assignedTo: text('assigned_to').references(() => employees.id),
	deletedAt: integer('deleted_at', { mode: 'timestamp' }),
	imageUrl: text('image_url').notNull(),
	qrUrl:text('qr_url').notNull(),
	departmentId: text('department_id').references(() => department.id),
});

export const assetsRelations = relations(assets, ({ one }) => ({
    category: one(categories, {
        fields: [assets.categoryId],
        references: [categories.id],
    }),
    subCategory: one(subCategory, {
        fields: [assets.subCategoryId], 
        references: [subCategory.id],
    }),
	department: one(department, {
        fields: [assets.departmentId], 
        references: [department.id],
    }),
}));