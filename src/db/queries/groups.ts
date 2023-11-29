import db from "@/db"
import {
  attendeeTypes,
  groupContactDetails,
  groups,
  groupsToAttendeeTypes,
  type GroupInsert,
} from "@/db/schema"
import { eq } from "drizzle-orm"

export const queryAllGroups = await db.query.groups.findMany({
  columns: {
    id: true,
    name: true,
    logoUrl: true,
    description: true,
    postCode: true,
    address: true,
    active: true,
    updatedAt: true,
    verifiedAt: true,
  },

  with: {
    groupsToAttendeeTypes: {
      columns: {
        attendeeTypeId: true,
        updatedAt: true,
      },
      with: {
        attendeeType: {
          columns: {
            name: true,
            description: true,
            active: true,
          },
        },
      },
    },
    groupContactDetails: {
      columns: {
        id: true,
        contactType: true,
        contactValue: true,
        forBooking: true,
        forInformation: true,
        updatedAt: true,
      },
    },
    groupOpenHours: {
      columns: {
        weekday: true,
        start: true,
        end: true,
        description: true,
        updatedAt: true,
      },
    },
  },
})

export const selectAllGroups = await db
  .select({
    id: groups.id,
    name: groups.name,
    logoUrl: groups.logoUrl,
    description: groups.description,
    postCode: groups.postCode,
    address: groups.address,
    active: groups.active,
    updatedAt: groups.updatedAt,
    verifiedAt: groups.verifiedAt,
    // attendeeTypes: sql`JSON_ARRAYAGG(JSON_OBJECT(${attendeeTypes.name})`,
  })
  .from(groups)
  .leftJoin(groupsToAttendeeTypes, eq(groups.id, groupsToAttendeeTypes.groupId))
  .leftJoin(
    attendeeTypes,
    eq(attendeeTypes.id, groupsToAttendeeTypes.attendeeTypeId),
  )
  .leftJoin(groupContactDetails, eq(groups.id, groupContactDetails.groupId))
  .groupBy(groups.id)

//insert
export const insertGroup = async (group: GroupInsert) =>
  await db.insert(groups).values(group)
