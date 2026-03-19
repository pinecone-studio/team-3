CREATE TABLE `sub_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category_id` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sub_categories_name_unique` ON `sub_categories` (`name`);