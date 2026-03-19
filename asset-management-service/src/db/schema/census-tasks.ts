import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { assets, employees, censusEvents } from './index';
import { create } from 'node:domain';

export const censusTasks = sqliteTable('census_tasks', {
	id: text('id').primaryKey(),
	censusId: text('census_id')
		.notNull()
		.references(() => censusEvents.id),
	assetId: text('asset_id')
		.notNull()
		.references(() => assets.id),
	verifierId: text('verifier_id').references(() => employees.id),
	verifiedAt: integer('verified_at', { mode: 'timestamp' }),
	conditionReported: text('condition_reported'),
	locationConfirmed: integer('location_confirmed', { mode: 'boolean' }),
	discrepancyFlag: integer('discrepancy_flag', { mode: 'boolean' }).default(false),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()), // Or .default(() => new Date())
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(new Date()),
});
