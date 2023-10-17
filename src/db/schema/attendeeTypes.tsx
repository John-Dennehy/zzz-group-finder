import { mysqlTable } from "../../lib/mysqlTable";
import {
  InferSelectModel,
  InferInsertModel,
  relations,
  sql,
} from "drizzle-orm";
import {
  boolean,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import groupsToAttendeeTypes from "./groupsToAttendeeTypes";

export const attendeeTypes = mysqlTable("attendee_types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: text("description"),
  active: boolean("active"),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at"),
});

export const attendeeTypeRelations = relations(attendeeTypes, ({ many }) => ({
  groupsToAttendeeTypes: many(groupsToAttendeeTypes),
}));

export type AttendeeType = InferSelectModel<typeof attendeeTypes>;
export type AttendeeTypeInsert = InferInsertModel<typeof attendeeTypes>;
export type AttendeeTypeUpdate = Partial<AttendeeTypeInsert>;

export default attendeeTypes;
