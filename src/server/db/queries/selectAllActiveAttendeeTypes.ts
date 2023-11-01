import { attendeeTypes } from "../schema";
import { eq, isNull } from "drizzle-orm";
import db from "@/db";

// AttendeeTypes

export const getAllActiveAttendeeTypes = await db
  .select()
  .from(attendeeTypes)
  .where(isNull(attendeeTypes.deletedAt))
  .where(eq(attendeeTypes.active, true));
