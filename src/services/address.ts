import { db } from "@/db"
import { addresses } from "@/db/schema"

type Address = typeof addresses.$inferInsert

export const selectAllAddress = async (id: string) => {
  return await db.query.addresses.findMany()
}

export const insertAddress = async (newAddress: Address) => {
  return await db.insert(addresses).values(newAddress)
}
