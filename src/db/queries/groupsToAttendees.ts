import db from "@/db"
import { attendeeTypes, groups, groupsToAttendeeTypes } from "@/db/schema"
import { and, eq, isNull } from "drizzle-orm"

export const selectAllGroupsToAttendees = await db
  .select({
    id: groups.id,
    name: groups.name,
    attendeeTypes: {
      id: attendeeTypes.id,
      name: attendeeTypes.name,
      description: attendeeTypes.description,
    },
  })
  .from(groups)
  .leftJoin(groupsToAttendeeTypes, eq(groupsToAttendeeTypes.groupId, groups.id))
  .leftJoin(
    attendeeTypes,
    eq(groupsToAttendeeTypes.attendeeTypeId, attendeeTypes.id),
  )
  .where(
    and(
      isNull(groups.deletedAt),
      eq(groups.active, true),
      eq(attendeeTypes.active, true),
    ),
  )
