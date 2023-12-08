import { relations, sql } from "drizzle-orm"
import {
  boolean,
  int,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { isValid as isValidPostcode, toNormalised } from "postcode"
import z from "zod"
import { groupfinderTable } from "../groupfinderTable"
import groups from "./groups"

export const addresses = groupfinderTable("addresses", {
  id: serial("id").primaryKey(),
  groupId: int("group_id"),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  postCode: varchar("post_code", { length: 8 }).notNull(),
  country: varchar("country", { length: 255 }).default("United Kingdom"),
  active: boolean("active").notNull().default(true),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at"),
})

export const groupAddressesRelations = relations(addresses, ({ one }) => ({
  group: one(groups, {
    fields: [addresses.groupId],
    references: [groups.id],
  }),
}))

export const selectAddressSchema = createSelectSchema(addresses)

export const insertAddressSchema = createInsertSchema(addresses, {
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
