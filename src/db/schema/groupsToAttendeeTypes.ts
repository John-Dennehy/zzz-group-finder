import { relations } from "drizzle-orm";
import {
  int,
  mysqlTableCreator,
  primaryKey,
  timestamp,
} from "drizzle-orm/mysql-core";

import groups from "./groups";
import attendeeTypes from "./attendeeTypes";

import { prefixedMysqlTable } from "@/db/utils";

export const groupsToAttendeeTypes = prefixedMysqlTable(
  "groups_to_attendee_types",
  {
    groupId: int("group_id")
      .notNull()
      .references(() => groups.id),
    attendeeTypeId: int("attendee_type_id")
      .notNull()
      .references(() => attendeeTypes.id),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    pk: primaryKey(table.groupId, table.attendeeTypeId),
  })
);

export const groupsToAttendeeTypesRelations = relations(
  groupsToAttendeeTypes,
  ({ one }) => ({
    groupId: one(groups, {
      fields: [groupsToAttendeeTypes.groupId],
      references: [groups.id],
    }),
    attendeeTypeId: one(attendeeTypes, {
      fields: [groupsToAttendeeTypes.attendeeTypeId],
      references: [attendeeTypes.id],
    }),
  })
);

export default groupsToAttendeeTypes;
