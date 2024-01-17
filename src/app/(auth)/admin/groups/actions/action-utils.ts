"use server"
import { revalidatePath, revalidateTag } from "next/cache"

export const handleSuccess = (callbackFn: () => void) => {
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

export const handleError = (errorMessage?: string) => {
  return {
    isSuccess: false,
    message: errorMessage ?? "Error creating group",
  }
}

export const getFormattedFormData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData.entries())

  const activeBoolean = rawFormData.active !== "true" ? false : true

  const formattedFormData = {
    ...rawFormData,
    active: activeBoolean,
  }

  return formattedFormData
}
