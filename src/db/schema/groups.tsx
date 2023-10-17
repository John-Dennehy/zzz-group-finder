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
import groupOpenHours from "./groupOpenHours";
import groupsToAttendeeTypes from "./groupsToAttendeeTypes";

export const groups = mysqlTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  logoUrl: varchar("logo_url", { length: 256 }),
  description: text("description"),

  address: varchar("where", { length: 256 }),
  postCode: varchar("post_code", { length: 256 }).notNull(),
  url: varchar("url", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  email: varchar("email", { length: 256 }),
  facebook: varchar("facebook", { length: 256 }),

  verifiedAt: timestamp("verified_at"),
  active: boolean("active").default(true).notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const groupRelations = relations(groups, ({ many }) => ({
  groupOpenHours: many(groupOpenHours),
  groupsToAttendeeTypes: many(groupsToAttendeeTypes),
}));

export type Group = InferSelectModel<typeof groups>;
export type GroupInsert = InferInsertModel<typeof groups>;
export type GroupUpdate = Partial<GroupInsert>;

export default groups;
