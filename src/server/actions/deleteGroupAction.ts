"use server"
import { deleteGroup } from "@/server/queries/groups"
import { FormActionState } from "@/utils/utility-types"
import { handleError, handleSuccess } from "./utils/action-utils"

export async function deleteGroupAction(prevState: FormActionState, formData: FormData) {
  const groupId = formData.get("id")

  // validation
  if (!groupId) return handleError("Group id is required")
  if (typeof groupId !== "string") return handleError("Group id must be a string")

  // Success
  handleSuccess(() => deleteGroup(groupId))

  // catch all error
  return handleError()
}
