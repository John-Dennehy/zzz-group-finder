"use server"

import { insertGroupSchema } from "@/db/schema"
import { insertGroup } from "@/services/groups"
import { revalidatePath, revalidateTag } from "next/cache"


export async function updateGroupAction(prevState: unknown, formData: FormData) {
  const formDataObject = Object.fromEntries(formData.entries())

  const parsedGroup = insertGroupSchema.safeParse(formDataObject)

  if (!parsedGroup.success) {
    const message = `Error parsing form data`
    console.error(parsedGroup.error)
  }

  if (parsedGroup.success && parsedGroup.data) {
    const newGroup = parsedGroup.data
    console.log("newGroup: ", newGroup)
    insertGroup({...newGroup})
    // TODO revalidate cache by path or tags
    revalidatePath("/")
    revalidateTag("groups")

    return parsedGroup.data
    
  }

  //  TODO: handle error
  return null
}
