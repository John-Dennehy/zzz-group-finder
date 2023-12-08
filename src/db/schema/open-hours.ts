import { groups } from "@/db/schema"
import { InferInsertModel, InferSelectModel, relations, sql } from "drizzle-orm"
import {
  boolean,
  int,
  mysqlEnum,
  serial,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// Import custom version of drizzle's mysqlTableCreator that adds `groupfinder_` prefix to all table names
import { groupfinderTable } from "@/db/groupfinderTable"

// as const is needed to make sure the array is not widened to string[]
const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const

// drizzle schema for open_hours table
export const openHours = groupfinderTable("group_open_hours", {
  id: serial("id").primaryKey(),
  groupId: int("group_id"),
  weekday: mysqlEnum("weekday", weekDays).notNull(),
  start: time("start").notNull(),
  end: time("end").notNull(),
  description: varchar("description", { length: 255 }),
  active: boolean("active").notNull().default(true),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at"),
})

// relations (many to one)
export const groupOpenHoursRelations = relations(openHours, ({ one }) => ({
  group: one(groups, {
    fields: [openHours.groupId],
    references: [groups.id],
  }),
}))

// zod schemas for validation
export const selectOpenHoursSchema = createSelectSchema(openHours)
export const insertOpenHoursSchema = createInsertSchema(openHours)

// types
export type GroupOpenHours = InferSelectModel<typeof openHours>
export type GroupOpenHoursInsert = InferInsertModel<typeof openHours>
export type GroupOpenHoursUpdate = Partial<GroupOpenHoursInsert>

export default openHours
