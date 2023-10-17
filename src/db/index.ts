import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import config from "@/db/config";
import {
  AttendeeTypeInsert,
  AttendeeTypeUpdate,
  GroupInsert,
  GroupUpdate,
  attendeeTypes,
  groups,
} from "@/db/schema";
import { eq, isNull, sql } from "drizzle-orm";

// create the connection
const connection = connect(config);

const db = drizzle(connection);


// Groups

export const allActiveGroups = await db
  .select()
  .from(groups)
  .where(isNull(groups.deletedAt))
  .where(eq(groups.active, true));

export const allGroups = await db
  .select()
  .from(groups)
  .where(isNull(groups.deletedAt));

export const insertGroup = async (group: GroupInsert) =>
  await db.insert(groups).values(group);

export const updateGroup = async (id: number, group: GroupUpdate) =>
  await db
    .update(groups)
    .set({ ...group, updatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(groups.id, id));

export const deleteGroup = async (id: number) =>
  await db
    .update(groups)
    .set({ active: false, deletedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(groups.id, id));

export const findGroup = async (id: number) =>
  await db.select().from(groups).where(eq(groups.id, id));

export const findGroupByName = async (name: string) =>
  await db.select().from(groups).where(eq(groups.name, name));


// AttendeeTypes

export const allActiveAttendeeTypes = await db
  .select()
  .from(attendeeTypes)
  .where(isNull(attendeeTypes.deletedAt))
  .where(eq(attendeeTypes.active, true));

export const allAttendeeTypes = await db
  .select()
  .from(attendeeTypes)
  .where(isNull(attendeeTypes.deletedAt));

export const insertAttendeeType = async (attendeeType: AttendeeTypeInsert) =>
  await db.insert(attendeeTypes).values(attendeeType);

export const updateAttendeeType = async (
  id: number,
  attendeeType: AttendeeTypeUpdate
) =>
  await db
    .update(attendeeTypes)
    .set({ ...attendeeType, updatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(attendeeTypes.id, id));

export const deleteAttendeeType = async (id: number) =>
  await db
    .update(attendeeTypes)
    .set({ active: false, deletedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(attendeeTypes.id, id));