import { InferSelectModel } from "drizzle-orm";
import {
  mysqlTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

const mysqlTable = mysqlTableCreator((name) => `groupfinder_${name}`);

export const groups = mysqlTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  when: varchar("when", { length: 256 }),
  description: text("description"),
  where: varchar("where", { length: 256 }),
  url: varchar("url", { length: 256 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  verified_at: timestamp("verified_at"),
  deleted_at: timestamp("deleted_at"),
});

export type Group = InferSelectModel<typeof groups>;

export default groups;
