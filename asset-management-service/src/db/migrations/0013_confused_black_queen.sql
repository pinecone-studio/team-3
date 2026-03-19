CREATE TABLE `sub_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category_id` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sub_categories_name_unique` ON `sub_categories` (`name`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_tag` text NOT NULL,
	`category_id` text NOT NULL,
	`sub_category_id` text NOT NULL,
	`serial_number` text NOT NULL,
	`status` text DEFAULT 'AVAILABLE' NOT NULL,
	`purchase_date` integer NOT NULL,
	`purchase_cost` real NOT NULL,
	`current_book_value` real,
	`location_id` text NOT NULL,
	`assigned_to` text,
	`deleted_at` integer,
	`image_url` text NOT NULL,
	`qr_url` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`assigned_to`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_assets`("id", "asset_tag", "category_id", "sub_category_id", "serial_number", "status", "purchase_date", "purchase_cost", "current_book_value", "location_id", "assigned_to", "deleted_at", "image_url", "qr_url") SELECT "id", "asset_tag", "category_id", "sub_category_id", "serial_number", "status", "purchase_date", "purchase_cost", "current_book_value", "location_id", "assigned_to", "deleted_at", "image_url", "qr_url" FROM `assets`;--> statement-breakpoint
DROP TABLE `assets`;--> statement-breakpoint
ALTER TABLE `__new_assets` RENAME TO `assets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `assets_asset_tag_unique` ON `assets` (`asset_tag`);--> statement-breakpoint
ALTER TABLE `census_tasks` ADD `created_at` integer DEFAULT '"2026-03-19T10:22:07.815Z"' NOT NULL;--> statement-breakpoint
ALTER TABLE `census_tasks` ADD `updated_at` integer DEFAULT '"2026-03-19T10:22:07.815Z"' NOT NULL;--> statement-breakpoint
ALTER TABLE `employees` ADD `role` text DEFAULT 'USER';