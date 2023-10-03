-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `groupfinder_groups` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`when` varchar(256),
	`description` text,
	`where` varchar(256),
	`url` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`verified_at` timestamp,
	`deleted_at` timestamp);

*/