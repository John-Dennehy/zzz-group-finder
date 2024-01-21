import { relations, sql } from "drizzle-orm"
import { boolean, text, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { contactDetailsTable, openHoursTable } from "."
import { createPublicId } from "../../utils/create-public-id"

// Import custom version of drizzle's mysqlTableCreator that adds `groupfinder_` prefix to all table names
import { z } from "zod"
import { groupfinderTable as mysqlTable } from "../utils"

// drizzle schema for groups table
export const groupsTable = mysqlTable("groups", {
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
export const groupRelations = relations(groupsTable, ({ many }) => ({
  groupOpenHours: many(openHoursTable),
  groupContactDetails: many(contactDetailsTable),
}))

// zod schemas for validation
export const selectGroupZodSchema = createSelectSchema(groupsTable)
export const insertGroupZodSchema = createInsertSchema(groupsTable, {
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
export type InferredGroupValues = z.infer<typeof insertGroupZodSchema>

export type SelectGroup = typeof groupsTable.$inferSelect
export type InsertGroup = typeof groupsTable.$inferInsert

export default groupsTable
