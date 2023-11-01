import { mysqlTable } from "@/db/mysqlTable";
import {
  InferSelectModel,
  InferInsertModel,
  relations,
  sql,
} from "drizzle-orm";
import {
  boolean,
  int,
  mysqlEnum,
  serial,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import groups from "./groups";

export const groupOpenHours = mysqlTable("group_open_hours", {
  id: serial("id").primaryKey(),
  groupId: int("group_id"),
  weekday: mysqlEnum("weekday", [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
  ]).notNull(),
  start: time("start").notNull(),
  end: time("end").notNull(),
  description: varchar("description", { length: 255 }),
  active: boolean("active").notNull().default(true),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at"),
});

export const groupOpenHoursRelations = relations(groupOpenHours, ({ one }) => ({
  group: one(groups, {
    fields: [groupOpenHours.groupId],
    references: [groups.id],
  }),
}));

export type GroupOpenHours = InferSelectModel<typeof groupOpenHours>;
export type GroupOpenHoursInsert = InferInsertModel<typeof groupOpenHours>;
export type GroupOpenHoursUpdate = Partial<GroupOpenHoursInsert>;

export default groupOpenHours;
