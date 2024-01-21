"use server"

import { db } from "@/db"
import { groupsTable, insertGroupZodSchema } from "@/db/schema"
import { serverActionClient } from "@/utils/safe-sever-actions"
import { revalidatePath } from "next/cache"

const schema = insertGroupZodSchema

export const createGroupAction = serverActionClient(schema, async (data) => {
  if (!data) return { errorMessage: "No data provided" }

  await db.insert(groupsTable).values(data)
  revalidatePath("/", "page")
  revalidatePath("/groups", "page")

  return { success: true }
})
export default createGroupAction
