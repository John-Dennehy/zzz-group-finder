import { InferInsertModel, InferSelectModel, relations, sql } from "drizzle-orm"
import { int, primaryKey, timestamp } from "drizzle-orm/mysql-core"
import { groupfinderTable } from "../../groupfinderTable"
import groups from "../groups"
import attendeeTypes from "./attendeeTypes"

export const groupAttendeeTypes = groupfinderTable(
  "group_attendee_types",
  {
    groupId: int("group_id"),
    attendeeTypeId: int("attendee_type_id"),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      primaryKey: primaryKey(table.groupId, table.attendeeTypeId),
    }
  },
)

export const groupsToAttendeeTypesRelations = relations(
  groupAttendeeTypes,
  ({ one }) => ({
    group: one(groups, {
      fields: [groupAttendeeTypes.groupId],
      references: [groups.id],
    }),
    attendeeType: one(attendeeTypes, {
      fields: [groupAttendeeTypes.attendeeTypeId],
      references: [attendeeTypes.id],
    }),
  }),
)

export type GroupsToAttendeeTypes = InferSelectModel<typeof groupAttendeeTypes>
export type GroupsToAttendeeTypesInsert = InferInsertModel<
  typeof groupAttendeeTypes
>

export default groupAttendeeTypes
