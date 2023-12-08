import { contactDetails, groupAttendeeTypes, openHours } from "@/db/schema"
import {
  relations,
  sql,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"
import {
  boolean,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// Import custom version of drizzle's mysqlTableCreator that adds `groupfinder_` prefix to all table names
import { groupfinderTable as mysqlTableCreator } from "@/db/groupfinderTable"

// drizzle schema for groups table
export const groups = mysqlTableCreator("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  logoUrl: varchar("logo_url", { length: 256 }),

  verifiedAt: timestamp("verified_at"),
  active: boolean("active").default(true).notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deletedAt: timestamp("deleted_at"),
})

// relations (one to many)
export const groupRelations = relations(groups, ({ many }) => ({
  groupOpenHours: many(openHours),
  groupsToAttendeeTypes: many(groupAttendeeTypes),
  groupContactDetails: many(contactDetails),
}))

// zod schemas for validation
export const selectGroupsSchema = createSelectSchema(groups)
export const insertGroupsSchema = createInsertSchema(groups)

// types
export type Group = InferSelectModel<typeof groups>
export type GroupInsert = InferInsertModel<typeof groups>
export type GroupId = Pick<Group, "id">
export type GroupUpdate = Partial<GroupInsert>

export default groups
