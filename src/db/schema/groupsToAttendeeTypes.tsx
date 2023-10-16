import { mysqlTable } from "../../lib/mysqlTable";
import {
  InferSelectModel,
  InferInsertModel,
  relations,
  sql,
} from "drizzle-orm";
import { int, serial, timestamp } from "drizzle-orm/mysql-core";
import groups from "./groups";
import attendeeTypes from "./attendeeTypes";

export const groupsToAttendeeTypes = mysqlTable("groups_to_attendee_types", {
  id: serial("id").primaryKey(),
  groupId: int("group_id").references(() => groups.id),
  attendeeTypeId: int("attendee_type_id").references(() => attendeeTypes.id),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at"),
});

export const groupsToAttendeeTypesRelations = relations(
  groupsToAttendeeTypes,
  ({ one }) => ({
    group: one(groups, {
      fields: [groupsToAttendeeTypes.groupId],
      references: [groups.id],
    }),
    attendeeType: one(attendeeTypes, {
      fields: [groupsToAttendeeTypes.attendeeTypeId],
      references: [attendeeTypes.id],
    }),
  })
);

export type GroupsToAttendeeTypes = InferSelectModel<
  typeof groupsToAttendeeTypes
>;
export type GroupsToAttendeeTypesInsert = InferInsertModel<
  typeof groupsToAttendeeTypes
>;

export default groupsToAttendeeTypes;
