"use server"

import { db } from "@/server/data"
import { addressesTable } from "@/server/data/schema"

type Address = typeof addressesTable.$inferInsert

export const selectAllAddress = async (id: string) => {
  return await db.query.addressesTable.findMany()
}

export const insertAddress = async (newAddress: Address) => {
  return await db.insert(addressesTable).values(newAddress)
}
