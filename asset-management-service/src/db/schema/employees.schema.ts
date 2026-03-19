import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { EmployeeRole, EmployeeStatus } from '../../types/generated';

// --- 1. EMPLOYEES ---
export const employees = sqliteTable('employees', {
	id: text('id').primaryKey(),
	entraId: text('entra_id').notNull().unique(),
	clerkId: text('clerk_id').unique(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	firstNameEng: text('first_name_eng').notNull(),
	lastNameEng: text('last_name_eng').notNull(),
	email: text('email').notNull().unique(),
	imageUrl: text('image_url'),
	hireDate: integer('hire_date', { mode: 'timestamp' }).notNull(),
	terminationDate: integer('termination_date', { mode: 'timestamp' }),
	status: text('status', { enum: [EmployeeStatus.Active, EmployeeStatus.OnLeave, EmployeeStatus.Terminated] }).default(
		EmployeeStatus.Active,
	),
	department: text('department').notNull(),
	branch: text('branch').notNull(),
	employeeCode: text('employee_code').notNull().unique(),
	level: text('level').notNull(),
	isKpi: integer('is_kpi', { mode: 'boolean' }).notNull().default(false),
	isAdmin: integer('is_admin', { mode: 'boolean' }).notNull().default(false), // New Field
	isSalaryCompany: integer('is_salary_company', { mode: 'boolean' }).notNull().default(true),
	github: text('github'),
	birthDayAndMonth: text('birthday_day_month'),
	birthdayPoster: text('birthday_poster'),
	role: text('role', { enum: [EmployeeRole.Admin, EmployeeRole.User] }).default(
		EmployeeRole.User,
	),
});
