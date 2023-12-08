import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { int, varchar } from "drizzle-orm/mysql-core"
import { groupfinderTable } from "../../groupfinderTable"

export const groupAttendeeTypes = groupfinderTable("attendee_types", {
  groupId: int("group_id").primaryKey(),
  attribute: varchar("attribute", { length: 256 }).notNull(),
  value: varchar("value", { length: 256 }).notNull(),
})

export type AttendeeType = InferSelectModel<typeof groupAttendeeTypes>
export type AttendeeTypeInsert = InferInsertModel<typeof groupAttendeeTypes>
export type AttendeeTypeUpdate = Partial<AttendeeTypeInsert>

export default groupAttendeeTypes
