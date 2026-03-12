import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { assets, employees } from './index';
import { sql } from 'drizzle-orm';

export const transfers = sqliteTable('transfers', {
	id: text('id').primaryKey(),
	assetId: text('asset_id')
		.notNull()
		.references(() => assets.id),
	fromEmployeeId: text('from_employee_id').references(() => employees.id),
	toEmployeeId: text('to_employee_id')
		.notNull()
		.references(() => employees.id),
	reason: text('reason'),
	approvedBy: text('approved_by').references(() => employees.id),
	transferredAt: integer('transferred_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	conditionNoted: text('condition_noted'),
});