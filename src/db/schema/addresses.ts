// external imports
import { relations, sql } from "drizzle-orm"
import { boolean, int, serial, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { isValid as isValidPostcode, toNormalised } from "postcode"
import z from "zod"

// Import related table schemas
import { groupsTable } from "."

// Import custom version of drizzle's mysqlTableCreator that adds `groupfinder_` prefix to all table names
import { groupfinderTable as mysqlTable } from "../utils"

// drizzle schema for address table
export const addressesTable = mysqlTable("addresses", {
  id: serial("id").primaryKey(),
  groupId: int("group_id"),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 255 }),
  county: varchar("state", { length: 255 }),
  postCode: varchar("post_code", { length: 8 }),
  country: varchar("country", { length: 255 }).default("United Kingdom"),
  active: boolean("active").notNull().default(true),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at"),
})

// relations (many to one)
export const groupAddressRelations = relations(addressesTable, ({ one }) => ({
  group: one(groupsTable, {
    fields: [addressesTable.groupId],
    references: [groupsTable.id],
  }),
}))

// zod schemas for validation
export const selectAddressSchema = createSelectSchema(addressesTable)
export const insertAddressSchema = createInsertSchema(addressesTable, {
  postCode: z
    // Overriding the postcode field validation as UK postcodes are complex
    .custom<string>((value) => {
      if (typeof value !== "string") return false
      if (value.length > 8) return false

      return isValidPostcode(value)
    })
    // valid postcodes may still have whitespace, so we normalise them
    .transform((value) => toNormalised(value)),
})

export default addressesTable
