"use server"
import { InferredGroupValues, insertGroupSchema } from "@/server/data/schema"
import { insertGroup } from "@/server/queries/groups"
import { FormActionState } from "@/utils/utility-types"
import { getFormattedFormData, handleError, handleSuccess } from "./utils/action-utils"

export async function createGroupFormAction(prevState: FormActionState, formData: FormData) {
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

export async function createGroupAction(values: InferredGroupValues) {
  return await insertGroup(values)
}
