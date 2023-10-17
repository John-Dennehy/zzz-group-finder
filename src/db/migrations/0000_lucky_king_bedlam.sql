-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `groupfinder_attendee_types` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`description` text,
	`active` tinyint,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `groupfinder_attendee_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `groupfinder_group_open_hours` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`group_id` int,
	`weekday` enum('mon','tue','wed','thu','fri','sat','sun') NOT NULL,
	`start` time NOT NULL,
	`end` time NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `groupfinder_group_open_hours_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `groupfinder_groups` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`logo_url` varchar(256),
	`description` text,
	`where` varchar(256),
	`post_code` varchar(256),
	`url` varchar(256),
	`phone` varchar(256),
	`email` varchar(256),
	`facebook` varchar(256),
	`verified_at` timestamp,
	`active` tinyint NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `groupfinder_groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `groupfinder_groups_to_attendee_types` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`group_id` int,
	`attendee_type_id` int,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `groupfinder_groups_to_attendee_types_id` PRIMARY KEY(`id`)
);

*/