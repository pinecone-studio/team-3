import { sqliteTable, text, integer,real } from 'drizzle-orm/sqlite-core';
import { assets,employees } from './index';

export const disposalRecords = sqliteTable('disposal_records', {
	id: text('id').primaryKey(),
	assetId: text('asset_id')
		.notNull()
		.references(() => assets.id),
	method: text('method').notNull(),
	writeOffValue: real('write_off_value'),
	certifiedBy: text('certified_by').references(() => employees.id),
	disposedAt: integer('disposed_at', { mode: 'timestamp' }).notNull(),
	certR2Key: text('cert_r2_key'),
	recipient: text('recipient'),
});
