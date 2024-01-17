import { relations, sql } from "drizzle-orm"
import { boolean, text, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { createPublicId } from "../../utils/create-public-id"
import { contactDetails, openHours } from "../schema"

// Import custom version of drizzle's mysqlTableCreator that adds `groupfinder_` prefix to all table names
import { groupfinderTable as mysqlTable } from "../utils"
import { z } from "zod"

// drizzle schema for groups table
export const groups = mysqlTable("groups", {
  id: varchar("id", { length: 6 })
    .primaryKey()
    .$defaultFn(() => createPublicId()),
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
export const groupRelations = relations(groups, ({ many }) => ({
  groupOpenHours: many(openHours),
  groupContactDetails: many(contactDetails),
}))

// zod schemas for validation
export const selectGroupSchema = createSelectSchema(groups)
export const insertGroupSchema = createInsertSchema(groups, {
  name: (schema) =>
    schema.name
      .min(1, { message: "Name must be at least 1 character long" })
      .max(256, { message: "Name must be less than 256 characters long" }),
  logoUrl: (schema) =>
    schema.logoUrl
      .url({ message: "That's not a URL!" })
      // needed to make optional URLS work as intended, as zod creator wont listen to user feedback
      .or(z.literal("")),
  description: (schema) => schema.description.max(1024).optional(),
  verifiedAt: (schema) => schema.verifiedAt.optional(),
  active: (schema) => schema.active.default(false),
})

// Inferred Types
export type SelectGroup = typeof groups.$inferSelect
export type InsertGroup = typeof groups.$inferInsert

export default groups
