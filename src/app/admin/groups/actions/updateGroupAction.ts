"use server"
import { insertGroupZodSchema } from "@/db/schema"
import { updateGroup } from "@/services/groups"
import { FormActionState } from "@/utils/utility-types"
import { getFormattedFormData, handleError, handleSuccess } from "./action-utils"

export async function updateGroupAction(prevState: FormActionState, formData: FormData) {
  const data = getFormattedFormData(formData)
  const parsedGroup = insertGroupZodSchema.partial().safeParse(data)

  // Error parsing form data
  if (!parsedGroup.success) return handleError("Error parsing form data")

  // Success
  if (parsedGroup.success && parsedGroup.data) {
    const updatedGroup = parsedGroup.data
    return await handleSuccess(() => updateGroup({ ...updatedGroup }))
  }

  // catch all error
  return handleError()
}
