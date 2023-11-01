import db from "@/db";
import {
  attendeeTypes,
  groupContactDetails,
  groupOpenHours,
  groups,
  groupsToAttendeeTypes,
} from "../schema";
import { and, eq, isNull } from "drizzle-orm";

export async function selectAllActiveGroups() {
  const response = await db
    .select({
      id: groups.id,
      name: groups.name,
      description: groups.description,
      postCode: groups.postCode,
      address: groups.address,
      active: groups.active,
      openHours: groupOpenHours,
      attendeeTypes: attendeeTypes,
      contactDetails: groupContactDetails,
    })
    .from(groups)
    .leftJoin(groupOpenHours, eq(groups.id, groupOpenHours.groupId))
    .leftJoin(
      groupsToAttendeeTypes,
      eq(groups.id, groupsToAttendeeTypes.groupId)
    )
    .leftJoin(
      attendeeTypes,
      eq(groupsToAttendeeTypes.attendeeTypeId, attendeeTypes.id)
    )
    .leftJoin(groupContactDetails, eq(groups.id, groupContactDetails.groupId))
    .where(
      and(
        eq(groups.active, true),
        eq(attendeeTypes.active, true),
        eq(groupOpenHours.active, true),
        isNull(groups.deletedAt),
        isNull(attendeeTypes.deletedAt),
        isNull(groupOpenHours.deletedAt)
      )
    );
  return response;
}

export default selectAllActiveGroups;

// SELECT manufacturer.name, category_product.id_category
// FROM manufacturer
// INNER JOIN product
//     ON manufacturer.id_manufacturer = product.id_manufacturer
// INNER JOIN category_product
//     ON product.id_product = category_product.id_product
// WHERE category_product.id_category = 'some value'

//   ({
//   // where: and(not(groups.deletedAt), eq(groups.active, true)),
//   where(fields, { and, eq, isNull }) {
//     return and(isNull(fields.deletedAt), eq(fields.active, true));
//   },
//   columns: {
//     name: true,
//     description: true,
//     postCode: true,
//     address: true,
//     active: true,
//     updatedAt: true,
//     verifiedAt: true,
//   },
//   with: {
//     groupOpenHours: {
//       where(fields, { and, eq, isNull }) {
//         return and(isNull(fields.deletedAt), eq(fields.active, true));
//       },
//     },
//     groupContactDetails: {
//       where(fields, { and, eq, isNull }) {
//         return and(isNull(fields.deletedAt), eq(fields.active, true));
//       },
//       columns: {
//         contactType: true,
//         contactValue: true,
//         forBooking: true,
//         forInformation: true,
//         updatedAt: true,
//         active: true,
//       },
//     },
//     groupsToAttendeeTypes: {
//       // where: not(groupsToAttendeeTypes.deletedAt),
//       // columns: {},
//       with: {
//         attendeeType: {
//           where(fields, { eq }) {
//             return eq(fields.active, true);
//           },
//           columns: {
//             name: true,
//             description: true,
//             active: true,
//             updatedAt: true,
//             deletedAt: false,
//           },
//         },
//       },
//     },
//   },
// });
