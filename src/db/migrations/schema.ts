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

export const groupfinderGroupContactDetails = mysqlTable("groupfinder_group_contact_details", {
	id: serial("id").notNull(),
	groupId: int("group_id"),
	contactType: mysqlEnum("contact_type", ['email','phone','text','facebook','website','whatsapp']).notNull(),
	contactValue: varchar("contact_value", { length: 255 }).notNull(),
	forInformation: tinyint("for_information").default(1).notNull(),
	forBooking: tinyint("for_booking").default(0).notNull(),
	active: tinyint("active").default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		groupfinderGroupContactDetailsId: primaryKey(table.id),
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
	active: tinyint("active").default(1).notNull(),
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
	address: varchar("address", { length: 256 }).notNull(),
	postCode: varchar("post_code", { length: 256 }).notNull(),
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