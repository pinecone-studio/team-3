import { sqliteTable, text, integer} from 'drizzle-orm/sqlite-core';
import { employees } from './index';
import { sql } from 'drizzle-orm';

export const auditLogs = sqliteTable('audit_logs', {
	id: text('id').primaryKey(),
	tableName: text('table_name').notNull(),
	recordId: text('record_id').notNull(),
	action: text('action').notNull(), // CREATE, UPDATE, DELETE
	oldValueJson: text('old_value_json', { mode: 'json' }),
	newValueJson: text('new_value_json', { mode: 'json' }),
	actorId: text('actor_id').references(() => employees.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});