import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { AssetStatusEnum } from '../../types/generated';
import { employees } from './employees.schema';
import { categories } from './categories.schema';
import { Many, relations } from 'drizzle-orm';
import { assignments } from './assignments.schema';

// --- 2. ASSETS ---
export const assets = sqliteTable('assets', {
	id: text('id').primaryKey(),
	assetTag: text('asset_tag').notNull().unique(),
	categoryId: text('category_id').references(() => categories.id),
	serialNumber: text('serial_number'),
	status: text('status', {
		enum: [
			AssetStatusEnum.Assigned,
			AssetStatusEnum.Available,
			AssetStatusEnum.Disposed,
			AssetStatusEnum.InRepair,
			AssetStatusEnum.Lost,
			AssetStatusEnum.PendingDisposal,
		],
	})
		.notNull()
		.default(AssetStatusEnum.Available),
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
	purchaseCost: real('purchase_cost'),
	currentBookValue: real('current_book_value'),
	locationId: text('location_id'),
	assignedTo: text('assigned_to').references(() => employees.id),
	deletedAt: integer('deleted_at', { mode: 'timestamp' }),
});
export const assetsRelations = relations(assets, ({ one }) => ({
	category: one(categories, {
		fields: [assets.categoryId],
		references: [categories.id],
	}),

	// assignments: many(assignments),
}));
