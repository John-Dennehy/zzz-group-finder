import db from "@/db";
import groups, { GroupInsert } from "../schema/groups";

export const insertGroup = async (group: GroupInsert) =>
  await db.insert(groups).values(group);
