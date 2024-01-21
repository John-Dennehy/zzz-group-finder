"use server"

import { db } from "@/server/data"
import { groupsTable, insertGroupZodSchema } from "@/server/data/schema"
import { revalidatePath } from "next/cache"
import { serverActionClient } from "./utils/safe-sever-actions-client"

const schema = insertGroupZodSchema

export const createGroupAction = serverActionClient(schema, async (data) => {
  if (!data) return { errorMessage: "No data provided" }

  await db.insert(groupsTable).values(data)
  revalidatePath("/", "page")
  revalidatePath("/groups", "page")

  return { success: true }
})
export default createGroupAction
