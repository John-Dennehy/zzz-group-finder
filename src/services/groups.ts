import { db } from "@/db"
import { groups } from "@/db/schema"
import { eq } from "drizzle-orm"

export type NewGroup = typeof groups.$inferInsert
export type Group = typeof groups.$inferSelect

export const selectAllGroups = async (id: string) => {
  return await db.query.groups.findMany()
}

export const insertGroup = async (group: NewGroup) => {
  return await db.insert(groups).values(group)
}

export const deleteGroup = async (id: string) => {
  return await db.delete(groups).where(eq(groups.id, id))
}

export const updateGroup = async (group: Partial<NewGroup>) => {
  if (!group.id) {
    throw new Error("Group id is required")
  }

  return await db
    .update(groups)
    .set({ ...group })
    .where(eq(groups.id, group.id))
}
