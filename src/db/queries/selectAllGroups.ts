import db from "@/db";
import { groups } from "@/db/schema";
import { isNull } from "drizzle-orm";

export default async function selectAllGroups() {
  const results = await db
    .select()
    .from(groups)
    .where(isNull(groups.deletedAt))
    .orderBy(groups.name);

  return results;
}
