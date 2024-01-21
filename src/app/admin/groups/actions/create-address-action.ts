"use server"

import { insertAddressSchema } from "@/data/schema"
import { insertAddress } from "@/server/address"
import { revalidatePath, revalidateTag } from "next/cache"

export async function createAddressAction(prevState: unknown, formData: FormData) {
  const formDataObject = Object.fromEntries(formData.entries())

  const parsedAddress = insertAddressSchema.safeParse(formDataObject)

  if (!parsedAddress.success) {
    const message = `Error parsing form data`
    console.error(parsedAddress.error)
  }

  if (parsedAddress.success && parsedAddress.data) {
    const newAddress = parsedAddress.data
    console.log("newAddress: ", newAddress)
    insertAddress(newAddress)

    // revalidate cache by path or tags
    revalidatePath("/")
    revalidateTag("address")

    return parsedAddress.data
  }

  //  TODO: handle error
  return null
}
