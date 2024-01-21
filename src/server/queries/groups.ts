"use server"

import { db } from "@/server/data"
import { groupsTable } from "@/server/data/schema"
import { eq } from "drizzle-orm"

export type NewGroup = typeof groupsTable.$inferInsert
export type Group = typeof groupsTable.$inferSelect

export const selectAllGroups = async (id: string) => {
  return await db.query.groupsTable.findMany()
}

export const insertGroup = async (group: NewGroup) => {
  return await db.insert(groupsTable).values(group)
}

export const deleteGroup = async (id: string) => {
  return await db.delete(groupsTable).where(eq(groupsTable.id, id))
}

export const updateGroup = async (group: Partial<NewGroup>) => {
  if (!group.id) {
    throw new Error("Group id is required")
  }

  return await db
    .update(groupsTable)
    .set({ ...group })
    .where(eq(groupsTable.id, group.id))
}
