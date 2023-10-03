import { mysqlTable, mysqlSchema, AnyMySqlColumn, serial, varchar, tinyint, timestamp, time, text, primaryKey, int } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const groupfinderAttendeeTypes = mysqlTable("groupfinder_attendee_types", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
	active: tinyint("active").default(1).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
});

export const groupfinderGroups = mysqlTable("groupfinder_groups", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
	timeMonStart: time("time_mon_start"),
	description: text("description"),
	where: varchar("where", { length: 256 }),
	url: varchar("url", { length: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	verifiedAt: timestamp("verified_at", { mode: 'string' }),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	logoUrl: varchar("logo_url", { length: 256 }),
	timeMonEnd: time("time_mon_end"),
	timeTueStart: time("time_tue_start"),
	timeTueEnd: time("time_tue_end"),
	timeWedStart: time("time_wed_start"),
	timeWedEnd: time("time_wed_end"),
	timeThuStart: time("time_thu_start"),
	timeThuEnd: time("time_thu_end"),
	timeFriStart: time("time_fri_start"),
	timeFriEnd: time("time_fri_end"),
	timeSatStart: time("time_sat_start"),
	timeSatEnd: time("time_sat_end"),
	timeSunStart: time("time_sun_start"),
	timeSunEnd: time("time_sun_end"),
	postCode: varchar("post_code", { length: 256 }),
	phone: varchar("phone", { length: 256 }),
	email: varchar("email", { length: 256 }),
	facebook: varchar("facebook", { length: 256 }),
	active: tinyint("active").default(1).notNull(),
});

export const groupfinderGroupsToAttendeeTypes = mysqlTable("groupfinder_groups_to_attendee_types", {
	groupId: int("group_id").notNull(),
	attendeeTypeId: int("attendee_type_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		groupfinderGroupsToAttendeeTypesAttendeeTypeIdGroupId: primaryKey(table.attendeeTypeId, table.groupId)
	}
});