import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import config from "@/db/config";
import { GroupInsert, groups } from "@/db/schema";
import { eq, isNull } from "drizzle-orm";

// create the connection
const connection = connect(config);

const db = drizzle(connection);

export const allGroups = await db
  .select()
  .from(groups)
  .where(isNull(groups.deletedAt))
  .where(eq(groups.active, true));

export const insertGroup = async (group: GroupInsert) =>
  await db.insert(groups).values(group);

export const updateGroup = async (id: number, group: GroupInsert) =>
  await db.update(groups).set(group).where(eq(groups.id, id));

export const deleteGroup = async (id: number) =>
  await db
    .update(groups)
    .set({ deletedAt: new Date() })
    .where(eq(groups.id, id));

export const findGroup = async (id: number) =>
  await db.select().from(groups).where(eq(groups.id, id));

