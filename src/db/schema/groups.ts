import { relations, sql } from "drizzle-orm"
import { boolean, text, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { createPublicId } from "../../utils/create-public-id"
import { contactDetails, openHours } from "../schema"

// Import custom version of drizzle's mysqlTableCreator that adds `groupfinder_` prefix to all table names
import { groupfinderTable as mysqlTable } from "../utils"

// drizzle schema for groups table
export const groups = mysqlTable("groups", {
  id: varchar("id", { length: 6 })
    .primaryKey()
    .$defaultFn(() => createPublicId()),
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
  groupContactDetails: many(contactDetails),
}))

// zod schemas for validation
export const selectGroupSchema = createSelectSchema(groups)
export const insertGroupSchema = createInsertSchema(groups)

// Type definitions
export type SelectGroup = typeof groups.$inferSelect
export type InsertGroup = typeof groups.$inferInsert

export default groups
