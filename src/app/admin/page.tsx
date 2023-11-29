import db from "@/db"
import { sql } from "drizzle-orm"

export default async function Home() {
  // const data = await getAllGroups
  // const selectData = await selectAllActiveGroups()
  // console.log(selectData)

  const statement = sql`select * from groupfinder_groups`
  const res = await db.execute(statement)
  const data = res.rows
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg text-primary">Root Admin Page</h1>
      {/* <NewGroupModal /> */}
      <pre>{JSON.stringify(res, null, 2)}</pre>
      <pre>{JSON.stringify(res.rows, null, 2)}</pre>

      <ul className="mx-auto flex flex-wrap gap-2">
        {data.map((group, index) => (
          <li key={index}>
            Group Details
            <pre>
              {JSON.stringify(group, null, 2)}
              {/* {JSON.stringify(group, null, 2)} */}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  )
}
