ALTER TABLE `employees` ADD `clerk_id` text;--> statement-breakpoint
CREATE UNIQUE INDEX `employees_clerk_id_unique` ON `employees` (`clerk_id`);