"use server"

import { db } from "@/db"
import { GroupInsert, GroupUpdate, groups } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

//	create a new group
export const createGroup = async (group: GroupInsert) => {
  if (!group.name) throw new Error("Group name is required")

  const result = await db.insert(groups).values(group).execute()
  revalidatePath("/admin/groups/[id]")
  return result
}

//	update a group
export const updateGroup = async (group: GroupUpdate) => {
  if (!group.id) throw new Error("Group id is required")

  const result = await db
    .update(groups)
    .set(group)
    .where(eq(groups.id, group.id))
    .execute()
  revalidatePath("/admin/groups/[id]")
  return result
}
