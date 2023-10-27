import { attendeeTypes } from "@/db/schema";
import { isNull } from "drizzle-orm";
import db from "@/db";

export const selectAllAttendeeTypes = await db
  .select()
  .from(attendeeTypes)
  .where(isNull(attendeeTypes.deletedAt));
