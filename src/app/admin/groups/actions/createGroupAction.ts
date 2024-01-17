"use server"
import { insertGroupSchema } from "@/db/schema"
import { insertGroup } from "@/services/groups"
import { FormActionState } from "@/utils/utility-types"
import { getFormattedFormData, handleError, handleSuccess } from "./action-utils"

export async function createGroupAction(prevState: FormActionState, formData: FormData) {
  const data = getFormattedFormData(formData)

  const parsedGroup = insertGroupSchema.safeParse(data)

  if (!parsedGroup.success) return handleError("Error parsing form data")

  if (parsedGroup.success && parsedGroup.data) {
    const newGroup = parsedGroup.data
    return handleSuccess(() => insertGroup({ ...newGroup }))
  }

  // catch all error
  return handleError()
}
