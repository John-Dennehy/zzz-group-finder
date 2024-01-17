import db from "@/db/connection"
import { selectGroupSchema } from "@/db/schema"

import { GroupTable } from "@/components/GroupTable"
import { CreateGroupForm } from "@/components/forms/CreateGroupForm"


export default async function GroupsPage() {
  const response = await db.query.groups.findMany()

  if (!response) {
    return <div>loading...</div>
  }

  if (response.length === 0) {
    return <div>no groups found</div>
  }

  // map response to table items
  const items = await response
    .map((group) => {
      // validate response with zod
      const validatedGroup = selectGroupSchema.safeParse(group)

      if (validatedGroup.success === false) {
        console.error(validatedGroup.error)
        return null
      }

      return validatedGroup.data
    })
    .filter(Boolean) // remove null items

  // TODO fix table
  return (
    <div
      className="border-2 rounded-md p-4"
    >
      <h1>/admin/groups/page.tsx</h1>
      <h1>Create Group Form</h1>
      <CreateGroupForm />
      <GroupTable groups={items}

      />
    </div>
  )
}
