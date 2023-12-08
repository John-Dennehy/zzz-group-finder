import { InferInsertModel, InferSelectModel, relations, sql } from "drizzle-orm"
import {
  boolean,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { groupfinderTable } from "../../groupfinderTable"
import groupAttendeeTypes from "./groupsToAttendeeTypes"

export const attendeeTypes = groupfinderTable("attendee_types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  active: boolean("active").notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deletedAt: timestamp("deleted_at"),
})

export const attendeeTypeRelations = relations(attendeeTypes, ({ many }) => ({
  groupsToAttendeeTypes: many(groupAttendeeTypes),
}))

export type AttendeeType = InferSelectModel<typeof attendeeTypes>
export type AttendeeTypeInsert = InferInsertModel<typeof attendeeTypes>
export type AttendeeTypeUpdate = Partial<AttendeeTypeInsert>

export default attendeeTypes
