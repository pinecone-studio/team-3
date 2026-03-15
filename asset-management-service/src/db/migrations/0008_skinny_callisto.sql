CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`picture` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_tag` text NOT NULL,
	`category_id` text,
	`serial_number` text,
	`status` text DEFAULT 'AVAILABLE' NOT NULL,
	`purchase_date` integer,
	`purchase_cost` real,
	`current_book_value` real,
	`location_id` text,
	`assigned_to` text,
	`deleted_at` integer,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`assigned_to`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_assets`("id", "asset_tag", "category_id", "serial_number", "status", "purchase_date", "purchase_cost", "current_book_value", "location_id", "assigned_to", "deleted_at") SELECT "id", "asset_tag", "category_id", "serial_number", "status", "purchase_date", "purchase_cost", "current_book_value", "location_id", "assigned_to", "deleted_at" FROM `assets`;--> statement-breakpoint
DROP TABLE `assets`;--> statement-breakpoint
ALTER TABLE `__new_assets` RENAME TO `assets`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `assets_asset_tag_unique` ON `assets` (`asset_tag`);