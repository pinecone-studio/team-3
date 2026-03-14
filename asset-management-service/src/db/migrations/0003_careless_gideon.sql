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
