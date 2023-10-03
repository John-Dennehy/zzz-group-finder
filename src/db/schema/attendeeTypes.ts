import { InferModel, relations } from "drizzle-orm";
import {
  boolean,
  mysqlTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import groupsToAttendeeTypes from "./groupsToAttendeeTypes";

import { prefixedMysqlTable } from "@/db/utils";

export const attendeeTypes = prefixedMysqlTable("attendee_types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),

  active: boolean("active").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const attendeeTypesRelations = relations(attendeeTypes, ({ many }) => ({
  groupsToAttendeeTypes: many(groupsToAttendeeTypes),
}));

export type Group = InferModel<typeof attendeeTypes>;

export default attendeeTypes;
