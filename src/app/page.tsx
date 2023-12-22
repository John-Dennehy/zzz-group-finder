import { selectAllGroups } from "@/db/queries/groups"

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: PageProps) {
  // const activeGroups = selectAllActiveGroups;

  // const allGroups = selectAllGroups
  // console.log(allGroups)
  // console.log(searchParams);
  // const attendeeTypes = selectAllActiveAttendeeTypes;

  // const filteredGroups = activeGroups.filter((group) => {
  //   const currentGroupAttendeeTypeNames = group.attendee_types?.name.map(
  //     (item) => {
  //       if (!item.attendeeType) return null;
  //       return item.attendeeType.name;
  //     }
  //   );

  //   if (!searchParams.attendeeType) return true;

  //   if (typeof searchParams.attendeeType === "string")
  //     return currentGroupAttendeeTypeNames.includes(searchParams.attendeeType);

  //   if (Array.isArray(searchParams.attendeeType)) {
  //     // return true if all searchParams.attendeeType are included in attendeeTypes
  //     console.log(currentGroupAttendeeTypeNames);
  //     return searchParams.attendeeType.every(
  //       (attendeeName) => currentGroupAttendeeTypeNames?.includes(attendeeName)
  //     );
  //   }
  // });

  // const groups = await filteredGroups.map((group) => {
  //   const attendeeTypeDetails: AttendeeTypeDetails[] =
  //     group.groupsToAttendeeTypes.map((item) => {
  //       const attendeeTypeData = item.attendeeType;

  //       return { ...attendeeTypeData, id: item.attendeeTypeId };
  //     });

  //   return { ...group, attendeeTypeDetails };
  // });

  return (
    <>
      {/* <SearchGroups attendeeTypes={attendeeTypes} /> */}
      {/* <ul className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-center">
        {groups.map((group) => (
          <li key={group.id} className="lg:w-[48%]">
            <GroupCard
              {...group}
              attendeeTypeDetails={group.attendeeTypeDetails}
            />
          </li>
        ))}
      </ul> */}
      Hello World
      {/* <pre>
        <code>{JSON.stringify(allGroups, null, 2)}</code>
      </pre> */}
    </>
  )
}
