import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
// import { assets } from './assets.schema';
import { employees } from './employees.schema';
import { relations, sql } from 'drizzle-orm';
import { assets } from './assets.schema';

// --- 3. ASSIGNMENTS (History of Asset movement) ---
export const assignments = sqliteTable('assignments', {
	id: text('id').primaryKey(),
	assetId: text('asset_id')
		.notNull()
		.references(() => assets.id),
	employeeId: text('employee_id')
		.notNull()
		.references(() => employees.id),
	assignedAt: integer('assigned_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	returnedAt: integer('returned_at', { mode: 'timestamp' }),
	conditionAtAssign: text('condition_at_assign').notNull(),
	conditionAtReturn: text('condition_at_return'),
	signatureR2Key: text('signature_r2_key'),
	accessoriesJson: text('accessories_json', { mode: 'json' }),
});

export const assignmentsRelations = relations(assignments, ({ one }) => ({
	asset: one(assets, {
		fields: [assignments.assetId],
		references: [assets.id],
	}),
	employee: one(employees, {
		fields: [assignments.employeeId],
		references: [employees.id],
	}),
}));
