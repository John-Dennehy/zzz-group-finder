import { groupfinderTable } from "@/db/groupfinderTable"
import { groups } from "@/db/schema"
import { relations, sql } from "drizzle-orm"
import {
  boolean,
  int,
  mysqlEnum,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { contactTypes } from "./contact-types"

export const contactDetails = groupfinderTable("group_contact_details", {
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

export const groupContactDetailsRelations = relations(
  contactDetails,
  ({ one }) => ({
    group: one(groups, {
      fields: [contactDetails.groupId],
      references: [groups.id],
    }),
  }),
)

export default contactDetails
