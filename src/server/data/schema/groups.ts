import { contactDetailsTable, openHoursTable } from "@/server/data/schema"
import { createPublicId } from "@/utils/create-public-id"
import { relations, sql } from "drizzle-orm"
import { boolean, text, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

// Import custom version of drizzle's mysqlTableCreator that adds `groupfinder_` prefix to all table names
import { groupfinderTable as mysqlTable } from "@/server/data/utils"

// drizzle schema for groups table
export const groupsTable = mysqlTable("groups", {
  id: varchar("id", { length: 6 }).primaryKey().$defaultFn(createPublicId),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  logoUrl: varchar("logo_url", { length: 256 }),
  verifiedAt: timestamp("verified_at"),
  active: boolean("active").default(false).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deletedAt: timestamp("deleted_at"),
})

// relations (one to many)
export const groupRelations = relations(groupsTable, ({ many }) => ({
  groupOpenHours: many(openHoursTable),
  groupContactDetails: many(contactDetailsTable),
}))

// drizzle-zod validation schemas
export const selectGroupSchema = createSelectSchema(groupsTable)
export const insertGroupSchema = createInsertSchema(groupsTable, {
  name: ({ name }) =>
    name
      .min(1, { message: "Name must be at least 1 character long" })
      .max(256, { message: "Name must be less than 256 characters long" }),
  logoUrl: ({ logoUrl }) =>
    logoUrl
      .url({ message: "That's not a  valid URL" })
      // needed to make optional URLS work as intended, as zod creator wont listen to user feedback
      .or(z.literal("")),
  description: (schema) => schema.description.max(1024).optional(),
  verifiedAt: (schema) => schema.verifiedAt.optional(),
  active: (schema) => schema.active.default(false),
})

export default groupsTable
