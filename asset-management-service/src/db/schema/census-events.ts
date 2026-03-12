import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { employees } from './index';

export const censusEvents = sqliteTable('census_events', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	scope: text('scope'),
	scopeFilter: text('scope_filter', { mode: 'json' }),
	startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
	closedAt: integer('closed_at', { mode: 'timestamp' }),
	createdBy: text('created_by').references(() => employees.id),
});