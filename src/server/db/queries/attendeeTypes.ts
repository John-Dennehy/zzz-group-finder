import db from "@/db";
import { attendeeTypes } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";

export const selectAllAttendeeTypes = await db.select().from(attendeeTypes);

export const selectAllActiveAttendeeTypes = await db
  .select()
  .from(attendeeTypes)
  .where(and(isNull(attendeeTypes.deletedAt), eq(attendeeTypes.active, true)));
