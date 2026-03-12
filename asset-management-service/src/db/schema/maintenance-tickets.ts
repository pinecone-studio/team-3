import { sqliteTable, text, integer,real } from 'drizzle-orm/sqlite-core';
import { assets, employees } from './index';
import { TicketStatusEnum } from '../../types/generated';

// --- 5. MAINTENANCE ---
export const maintenanceTickets = sqliteTable('maintenance_tickets', {
	id: text('id').primaryKey(),
	assetId: text('asset_id')
		.notNull()
		.references(() => assets.id),
	reporterId: text('reporter_id')
		.notNull()
		.references(() => employees.id),
	description: text('description').notNull(),
	severity: text('severity'),
	status: text('status', { enum: [TicketStatusEnum.Cancelled,TicketStatusEnum.InProgress,TicketStatusEnum.Open,TicketStatusEnum.Resolved] }).notNull().default(TicketStatusEnum.Open),
	vendorId: text('vendor_id'),
	repairCost: real('repair_cost'),
	resolvedAt: integer('resolved_at', { mode: 'timestamp' }),
});
