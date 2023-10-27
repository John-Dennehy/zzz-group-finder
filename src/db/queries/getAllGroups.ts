import db from "@/db";

export const getAllGroups = await db.query.groups.findMany({
  with: {
    groupOpenHours: true,
    groupContactDetails: true,
    groupsToAttendeeTypes: {
      with: {
        attendeeType: true,
      },
    },
  },
});
