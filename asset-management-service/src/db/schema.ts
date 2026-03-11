import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// --- ENUMS (State Machine & HR Logic) ---
export const AssetStatus = ['AVAILABLE', 'ASSIGNED', 'IN_REPAIR', 'PENDING_DISPOSAL', 'DISPOSED', 'LOST'] as const;
export const EmployeeStatus = ['ACTIVE', 'ON_LEAVE', 'TERMINATED'] as const;
export const TicketStatus = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CANCELLED'] as const;
export const POStatus = ['PENDING', 'APPROVED', 'DELIVERED', 'CANCELLED'] as const;

// --- 1. EMPLOYEES ---
export const employees = sqliteTable('employees', {
	id: text('id').primaryKey(), // PK (UUID)
	entraId: text('entra_id').notNull().unique(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	firstNameEng: text('first_name_eng').notNull(),
	lastNameEng: text('last_name_eng').notNull(),
	email: text('email').notNull().unique(),
	imageUrl: text('image_url'),
	hireDate: integer('hire_date', { mode: 'timestamp' }).notNull(),
	terminationDate: integer('termination_date', { mode: 'timestamp' }),
	status: text('status', { enum: EmployeeStatus }).default('ACTIVE'),
	department: text('department').notNull(),
	branch: text('branch').notNull(),
	employeeCode: text('employee_code').notNull().unique(),
	level: text('level').notNull(),
	isKpi: integer('is_kpi', { mode: 'boolean' }).notNull().default(false),
	isSalaryCompany: integer('is_salary_company', { mode: 'boolean' }).notNull().default(true),
	github: text('github'),
	birthDayAndMonth: text('birthday_day_month'),
	birthdayPoster: text('birthday_poster'),
});

// --- 2. ASSETS ---
export const assets = sqliteTable('assets', {
	id: text('id').primaryKey(),
	assetTag: text('asset_tag').notNull().unique(),
	category: text('category').notNull(),
	serialNumber: text('serial_number'),
	status: text('status', { enum: AssetStatus }).notNull().default('AVAILABLE'),
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
	purchaseCost: real('purchase_cost'),
	currentBookValue: real('current_book_value'),
	locationId: text('location_id'),
	assignedTo: text('assigned_to').references(() => employees.id),
	deletedAt: integer('deleted_at', { mode: 'timestamp' }),
});

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

// --- 4. TRANSFERS ---
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
	status: text('status', { enum: TicketStatus }).notNull().default('OPEN'),
	vendorId: text('vendor_id'),
	repairCost: real('repair_cost'),
	resolvedAt: integer('resolved_at', { mode: 'timestamp' }),
});

// --- 6. CENSUS & TASKS ---
export const censusEvents = sqliteTable('census_events', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	scope: text('scope'),
	scopeFilter: text('scope_filter', { mode: 'json' }),
	startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
	closedAt: integer('closed_at', { mode: 'timestamp' }),
	createdBy: text('created_by').references(() => employees.id),
});

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
});

// --- 7. PROCUREMENT & DISPOSAL ---
export const purchaseOrders = sqliteTable('purchase_orders', {
	id: text('id').primaryKey(),
	vendorId: text('vendor_id'),
	requestedBy: text('requested_by').references(() => employees.id),
	approvedBy: text('approved_by').references(() => employees.id),
	lineItemsJson: text('line_items_json', { mode: 'json' }),
	totalCost: real('total_cost'),
	status: text('status', { enum: POStatus }).default('PENDING'),
	deliveredAt: integer('delivered_at', { mode: 'timestamp' }),
});

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

// --- 8. AUDIT LOGS ---
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
