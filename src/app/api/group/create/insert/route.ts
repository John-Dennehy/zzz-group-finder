import db from "@/db";
import { groups, GroupInsert } from "@/db/schema";

export async function POST() {
  const testGroup: GroupInsert = {
    name: "Test Group",
    description: "Test Group Description",
    postCode: "12345",
    address: "123 Test Street",

    active: true,
  };

  const res = await db.insert(groups).values(testGroup).execute();
  console.log(res);
}
