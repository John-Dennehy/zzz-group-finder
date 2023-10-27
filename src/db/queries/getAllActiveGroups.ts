import db from "@/db";

export const getAllActiveGroups = await db.query.groups.findMany({
  where(fields, { and, eq, isNull }) {
    return and(isNull(fields.deletedAt), eq(fields.active, true));
  },
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
      where(fields, { isNull }) {
        return isNull(fields.deletedAt);
      },
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
      where(fields, { and, eq, isNull }) {
        return and(isNull(fields.deletedAt), eq(fields.active, true));
      },
      columns: {
        contactType: true,
        contactValue: true,
        forBooking: true,
        forInformation: true,
        updatedAt: true,
      },
    },
    groupOpenHours: {
      where(fields, { and, eq, isNull }) {
        return and(isNull(fields.deletedAt), eq(fields.active, true));
      },
      columns: {
        weekday: true,
        start: true,
        end: true,
        description: true,
        updatedAt: true,
      },
    },
  },
});

export type GetAllActiveGroups = typeof getAllActiveGroups;
export default getAllActiveGroups;
