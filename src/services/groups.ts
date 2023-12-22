import { db } from "@/db"
import { groups } from "@/db/schema"

type NewGroup = typeof groups.$inferInsert

export const selectAllGroups = async (id: string) => {
  return await db.query.groups.findMany()
}

export const insertGroup = async (group: NewGroup) => {
  return await db.insert(groups).values(group)
}
