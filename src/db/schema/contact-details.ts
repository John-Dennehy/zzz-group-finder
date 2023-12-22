import { relations, sql } from "drizzle-orm"
import { boolean, int, mysqlEnum, serial, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { groups } from "../schema"

// Import custom version of drizzle's mysqlTableCreator that adds `groupfinder_` prefix to all table names
import { groupfinderTable as mysqlTable } from "../utils"

const contactTypes = ["email", "phone", "text", "facebook", "website", "whatsapp"] as const

// drizzle schema for contact_details table
export const contactDetails = mysqlTable("contact_details", {
  id: serial("id").primaryKey(),
  groupId: int("group_id"),
  contactType: mysqlEnum("contact_type", contactTypes).notNull(),
  contactValue: varchar("contact_value", { length: 255 }).notNull(),
  forInformation: boolean("for_information").notNull().default(true),
  forBooking: boolean("for_booking").notNull().default(false),

  active: boolean("active").notNull().default(true),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at"),
})

// relations (many to one)
export const groupContactDetailsRelations = relations(contactDetails, ({ one }) => ({
  group: one(groups, {
    fields: [contactDetails.groupId],
    references: [groups.id],
  }),
}))

// zod schemas for validation
export const selectContactDetailsSchema = createSelectSchema(contactDetails)
export const insertContactDetailsSchema = createInsertSchema(contactDetails)

export default contactDetails
