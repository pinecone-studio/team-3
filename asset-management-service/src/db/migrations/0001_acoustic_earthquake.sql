CREATE TABLE `assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`employee_id` text NOT NULL,
	`assigned_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`returned_at` integer,
	`condition_at_assign` text NOT NULL,
	`condition_at_return` text,
	`signature_r2_key` text,
	`accessories_json` text,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`table_name` text NOT NULL,
	`record_id` text NOT NULL,
	`action` text NOT NULL,
	`old_value_json` text,
	`new_value_json` text,
	`actor_id` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`actor_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `census_events` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`scope` text,
	`scope_filter` text,
	`started_at` integer NOT NULL,
	`closed_at` integer,
	`created_by` text,
	FOREIGN KEY (`created_by`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `census_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`census_id` text NOT NULL,
	`asset_id` text NOT NULL,
	`verifier_id` text,
	`verified_at` integer,
	`condition_reported` text,
	`location_confirmed` integer,
	`discrepancy_flag` integer DEFAULT false,
	FOREIGN KEY (`census_id`) REFERENCES `census_events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`verifier_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `disposal_records` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`method` text NOT NULL,
	`write_off_value` real,
	`certified_by` text,
	`disposed_at` integer NOT NULL,
	`cert_r2_key` text,
	`recipient` text,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`certified_by`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`entra_id` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`first_name_eng` text NOT NULL,
	`last_name_eng` text NOT NULL,
	`email` text NOT NULL,
	`image_url` text,
	`hire_date` integer NOT NULL,
	`termination_date` integer,
	`status` text DEFAULT 'ACTIVE' NOT NULL,
	`department` text NOT NULL,
	`branch` text NOT NULL,
	`employee_code` text NOT NULL,
	`level` text NOT NULL,
	`is_kpi` integer DEFAULT false NOT NULL,
	`is_salary_company` integer DEFAULT true NOT NULL,
	`github` text,
	`birthday_day_month` text,
	`birthday_poster` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employees_entra_id_unique` ON `employees` (`entra_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `employees_email_unique` ON `employees` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `employees_employee_code_unique` ON `employees` (`employee_code`);--> statement-breakpoint
CREATE TABLE `maintenance_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`reporter_id` text NOT NULL,
	`description` text NOT NULL,
	`severity` text,
	`status` text DEFAULT 'OPEN' NOT NULL,
	`vendor_id` text,
	`repair_cost` real,
	`resolved_at` integer,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reporter_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `purchase_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`vendor_id` text,
	`requested_by` text,
	`approved_by` text,
	`line_items_json` text,
	`total_cost` real,
	`status` text DEFAULT 'PENDING',
	`delivered_at` integer,
	FOREIGN KEY (`requested_by`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`approved_by`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transfers` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`from_employee_id` text,
	`to_employee_id` text NOT NULL,
	`reason` text,
	`approved_by` text,
	`transferred_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`condition_noted` text,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`from_employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`to_employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`approved_by`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_tag` text NOT NULL,
	`category` text NOT NULL,
	`serial_number` text,
	`status` text DEFAULT 'AVAILABLE' NOT NULL,
	`purchase_date` integer,
	`purchase_cost` real,
	`current_book_value` real,
	`location_id` text,
	`assigned_to` text,
	`deleted_at` integer,
	FOREIGN KEY (`assigned_to`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_assets`("id", "asset_tag", "category", "serial_number", "status", "purchase_date", "purchase_cost", "current_book_value", "location_id", "assigned_to", "deleted_at") SELECT "id", "asset_tag", "category", "serial_number", "status", "purchase_date", "purchase_cost", "current_book_value", "location_id", "assigned_to", "deleted_at" FROM `assets`;--> statement-breakpoint
DROP TABLE `assets`;--> statement-breakpoint
ALTER TABLE `__new_assets` RENAME TO `assets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `assets_asset_tag_unique` ON `assets` (`asset_tag`);