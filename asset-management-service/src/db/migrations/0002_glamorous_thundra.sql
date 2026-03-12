DROP TABLE `assignments`;--> statement-breakpoint
DROP TABLE `audit_logs`;--> statement-breakpoint
DROP TABLE `disposal_records`;--> statement-breakpoint
DROP TABLE `purchase_orders`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_employees` (
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
	`status` text DEFAULT 'ACTIVE',
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
INSERT INTO `__new_employees`("id", "entra_id", "first_name", "last_name", "first_name_eng", "last_name_eng", "email", "image_url", "hire_date", "termination_date", "status", "department", "branch", "employee_code", "level", "is_kpi", "is_salary_company", "github", "birthday_day_month", "birthday_poster") SELECT "id", "entra_id", "first_name", "last_name", "first_name_eng", "last_name_eng", "email", "image_url", "hire_date", "termination_date", "status", "department", "branch", "employee_code", "level", "is_kpi", "is_salary_company", "github", "birthday_day_month", "birthday_poster" FROM `employees`;--> statement-breakpoint
DROP TABLE `employees`;--> statement-breakpoint
ALTER TABLE `__new_employees` RENAME TO `employees`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `employees_entra_id_unique` ON `employees` (`entra_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `employees_email_unique` ON `employees` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `employees_employee_code_unique` ON `employees` (`employee_code`);