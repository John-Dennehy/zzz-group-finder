import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  mysqlTableCreator,
  boolean,
  serial,
  text,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

const mysqlTable = mysqlTableCreator((name) => `groupfinder_${name}`);

export const groups = mysqlTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  logoUrl: varchar("logo_url", { length: 256 }),
  description: text("description"),

  timeMonStart: time("time_mon_start"),
  timeMonEnd: time("time_mon_end"),
  timeTueStart: time("time_tue_start"),
  timeTueEnd: time("time_tue_end"),
  timeWedStart: time("time_wed_start"),
  timeWedEnd: time("time_wed_end"),
  timeThuStart: time("time_thu_start"),
  timeThuEnd: time("time_thu_end"),
  timeFriStart: time("time_fri_start"),
  timeFriEnd: time("time_fri_end"),
  timeSatStart: time("time_sat_start"),
  timeSatEnd: time("time_sat_end"),
  timeSunStart: time("time_sun_start"),
  timeSunEnd: time("time_sun_end"),

  address: varchar("where", { length: 256 }),
  postCode: varchar("post_code", { length: 256 }),
  url: varchar("url", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  email: varchar("email", { length: 256 }),
  facebook: varchar("facebook", { length: 256 }),

  verifiedAt: timestamp("verified_at"),
  active: boolean("active").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export type Group = InferSelectModel<typeof groups>;
export type GroupInsert = InferInsertModel<typeof groups>;

export default groups;
