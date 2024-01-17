"use server"

import { insertGroupSchema } from "@/db/schema"
import { deleteGroup, insertGroup, updateGroup } from "@/services/groups"
import { FormActionState } from "@/utils/utility-types"
import { revalidatePath, revalidateTag } from "next/cache"

const handleSuccess = (callbackFn: () => void) => {
  // mutate data
  callbackFn()

  // revalidate cache
  revalidatePath("/admin/groups")
  revalidatePath("/")
  revalidateTag("groups")
  return {
    isSuccess: true,
    message: "Group created successfully",
  }
}

const handleError = (errorMessage?: string) => {
  return {
    isSuccess: false,
    message: errorMessage ?? "Error creating group",
  }
}

const getFormattedFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries())

  const activeBoolean = rawFormData.active !== "true" ? false : true

  const formattedFormData = {
    ...rawFormData,
    active: activeBoolean,
  }

  return formattedFormData
}

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

export async function updateGroupAction(prevState: FormActionState, formData: FormData) {
  const data = getFormattedFormData(formData)
  const parsedGroup = insertGroupSchema.partial().safeParse(data)

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
