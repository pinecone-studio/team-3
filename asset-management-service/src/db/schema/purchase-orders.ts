import { sqliteTable, text, integer,real } from 'drizzle-orm/sqlite-core';
import { assets, employees } from './index';
import { PosStatusEnum } from '../../types/generated';
// --- 7. PROCUREMENT & DISPOSAL ---
export const purchaseOrders = sqliteTable('purchase_orders', {
	id: text('id').primaryKey(),
	vendorId: text('vendor_id'),
	requestedBy: text('requested_by').references(() => employees.id),
	approvedBy: text('approved_by').references(() => employees.id),
	lineItemsJson: text('line_items_json', { mode: 'json' }),
	totalCost: real('total_cost'),
	status: text('status', { enum: [PosStatusEnum.Approved,PosStatusEnum.Cancelled,PosStatusEnum.Delivered,PosStatusEnum.Pending] }).default(PosStatusEnum.Pending),
	deliveredAt: integer('delivered_at', { mode: 'timestamp' }),
});