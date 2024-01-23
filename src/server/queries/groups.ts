"use server"

import { db } from "@/server/data"
import { contactDetailsTable, groupsTable, openHoursTable } from "@/server/data/schema"
import { createPublicId } from "@/utils/create-public-id"
import { InferInsertModel, eq } from "drizzle-orm"

export type NewGroup = typeof groupsTable.$inferInsert
export type Group = typeof groupsTable.$inferSelect

export const selectAllGroups = async (id: string) => {
  return await db.query.groupsTable.findMany()
}

export const insertGroup = async (group: NewGroup) => {
  return await db.insert(groupsTable).values(group)
}

export const deleteGroup = async (id: string) => {
  return await db.delete(groupsTable).where(eq(groupsTable.id, id))
}

export const updateGroup = async (group: Partial<NewGroup>) => {
  if (!group.id) {
    throw new Error("Group id is required")
  }

  return await db
    .update(groupsTable)
    .set({ ...group })
    .where(eq(groupsTable.id, group.id))
}

type InsertGroup = InferInsertModel<typeof groupsTable>
type InsertOpenHours = InferInsertModel<typeof openHoursTable>
type InsertContactDetails = InferInsertModel<typeof contactDetailsTable>

export async function newGroup(
  group: InsertGroup,
  openHours?: InsertOpenHours[],
  contactDetails?: InsertContactDetails[],
) {
  const groupId = createPublicId()

  // add groupID to group
  group.id = groupId

  // add groupID to each openHours item
  openHours?.forEach((item) => {
    item.groupId = groupId
  })

  // add groupID to each contactDetails item
  contactDetails?.forEach((item) => {
    item.groupId = groupId
  })

  await db.transaction(async (tx) => {
    // group insert
    await tx.insert(groupsTable).values(group)

    // open hours transaction
    if (!!openHours) await tx.insert(openHoursTable).values(openHours)

    // contact details transaction
    if (!!contactDetails) await tx.insert(contactDetailsTable).values(contactDetails)
  })
}
