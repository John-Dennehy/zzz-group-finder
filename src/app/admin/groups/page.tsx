import db from "@/db/connection"
import { selectGroupSchema } from "@/db/schema"
import CreateGroupForm from "./CreateGroupForm"
import { GroupTable } from "./GroupTable"

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

      const { id, name, createdAt, updatedAt, active } = validatedGroup.data

      return {
        id,
        name,
        createdAt,
        updatedAt,
        active,
      }
    })
    .filter(Boolean) // remove null items

  // TODO fix table
  return (
    <>
      <CreateGroupForm />
      <h1>Groups Page</h1>
      <h1>Create Group Form</h1>
      <GroupTable items={items} />
    </>
  )
}
