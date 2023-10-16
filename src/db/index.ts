import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import config from "@/db/config";
import { GroupInsert, groups } from "@/db/schema";
import { sql } from "drizzle-orm";

// create the connection
const connection = connect(config);

const db = drizzle(connection);

export const allGroups = await db
  .select()
  .from(groups)
  .where(sql`${groups.deletedAt} IS NULL AND ${groups.active} IS TRUE`);

export async function insertGroup(group: GroupInsert) {
  return db.insert(groups).values(group);
}

export async function updateGroup(id: string, group: GroupInsert) {
  return db
    .update(groups)
    .set(group)
    .where(sql`${groups.id} = ${id}`);
}

export async function deleteGroup(id: string) {
  return db
    .update(groups)
    .set({ deletedAt: new Date() })
    .where(sql`${groups.id} = ${id}`);
}
