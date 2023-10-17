import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, serial, varchar, text, tinyint, timestamp, int, mysqlEnum, time } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const groupfinderAttendeeTypes = mysqlTable("groupfinder_attendee_types", {
	id: serial("id").notNull(),
	name: varchar("name", { length: 256 }),
	description: text("description"),
	active: tinyint("active"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		groupfinderAttendeeTypesId: primaryKey(table.id),
	}
});

export const groupfinderGroupOpenHours = mysqlTable("groupfinder_group_open_hours", {
	id: serial("id").notNull(),
	groupId: int("group_id"),
	weekday: mysqlEnum("weekday", ['mon','tue','wed','thu','fri','sat','sun']).notNull(),
	start: time("start").notNull(),
	end: time("end").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		groupfinderGroupOpenHoursId: primaryKey(table.id),
	}
});

export const groupfinderGroups = mysqlTable("groupfinder_groups", {
	id: serial("id").notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	logoUrl: varchar("logo_url", { length: 256 }),
	description: text("description"),
	where: varchar("where", { length: 256 }),
	postCode: varchar("post_code", { length: 256 }),
	url: varchar("url", { length: 256 }),
	phone: varchar("phone", { length: 256 }),
	email: varchar("email", { length: 256 }),
	facebook: varchar("facebook", { length: 256 }),
	verifiedAt: timestamp("verified_at", { mode: 'string' }),
	active: tinyint("active").default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		groupfinderGroupsId: primaryKey(table.id),
	}
});

export const groupfinderGroupsToAttendeeTypes = mysqlTable("groupfinder_groups_to_attendee_types", {
	id: serial("id").notNull(),
	groupId: int("group_id"),
	attendeeTypeId: int("attendee_type_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		groupfinderGroupsToAttendeeTypesId: primaryKey(table.id),
	}
});