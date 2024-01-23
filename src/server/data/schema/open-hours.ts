import { weekdays } from "@/utils/week-days"
import { InferInsertModel, InferSelectModel, relations, sql } from "drizzle-orm"
import { boolean, int, mysqlEnum, serial, time, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { groupsTable } from "."

// Import custom version of drizzle's mysqlTableCreator that adds `groupfinder_` prefix to all table names
import { groupfinderTable as mysqlTable } from "../utils"
// drizzle schema for open_hours table
export const openHoursTable = mysqlTable("group_open_hours", {
  id: serial("id").primaryKey(),
  groupId: varchar("group_id", { length: 6 }), //.references(() => groupsTable.id),
  weekday: mysqlEnum("weekday", weekdays).notNull(),
  start: time("start").notNull(),
  end: time("end").notNull(),
  description: varchar("description", { length: 255 }),
  active: boolean("active").notNull().default(true),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at"),
})

// relations (many to one)
export const groupOpenHoursRelations = relations(openHoursTable, ({ one }) => ({
  group: one(groupsTable, {
    fields: [openHoursTable.groupId],
    references: [groupsTable.id],
  }),
}))

// zod schemas for validation
export const selectOpenHoursSchema = createSelectSchema(openHoursTable)
export const insertOpenHoursSchema = createInsertSchema(openHoursTable)

// types
export type GroupOpenHours = InferSelectModel<typeof openHoursTable>
export type GroupOpenHoursInsert = InferInsertModel<typeof openHoursTable>
export type GroupOpenHoursUpdate = Partial<GroupOpenHoursInsert>

export default openHoursTable
