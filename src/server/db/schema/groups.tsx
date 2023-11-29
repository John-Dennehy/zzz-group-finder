import { mysqlTable } from "@/db/mysqlTable";
import {
  relations,
  sql,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"
import {
  boolean,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import groupContactDetails from "./groupContactDetails"
import groupOpenHours from "./groupOpenHours"
import groupsToAttendeeTypes from "./groupsToAttendeeTypes"

export const groups = mysqlTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  logoUrl: varchar("logo_url", { length: 256 }),

  address: varchar("address", { length: 256 }).notNull(),
  postCode: varchar("post_code", { length: 256 }).notNull(),

  verifiedAt: timestamp("verified_at"),
  active: boolean("active").default(true).notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deletedAt: timestamp("deleted_at"),
})

export const groupRelations = relations(groups, ({ many }) => ({
  groupOpenHours: many(groupOpenHours),
  groupsToAttendeeTypes: many(groupsToAttendeeTypes),
  groupContactDetails: many(groupContactDetails),
}))

export type Group = InferSelectModel<typeof groups>
export type GroupInsert = InferInsertModel<typeof groups>
export type GroupId = Pick<Group, "id">
export type GroupUpdate = Partial<GroupInsert>

export default groups;
