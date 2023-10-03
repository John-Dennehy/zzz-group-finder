import { serial, varchar, timestamp } from "drizzle-orm/mysql-core";
import { prefixedMysqlTable as mysqlTable } from "@/db/utils";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),

  email: varchar("email", { length: 256 }),
  username: varchar("username", { length: 256 }),
  password: varchar("password", { length: 256 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
