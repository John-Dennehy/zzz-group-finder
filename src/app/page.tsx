import { getAllActiveGroups, selectAllAttendeeTypes } from "@/db/queries";
import { AttendeeTypeDetails, GroupCard } from "@/components/GroupCard";
import { SearchGroups } from "@/components/client/SearchGroups";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: PageProps) {
  const data = getAllActiveGroups;
  console.log(searchParams);
  const attendeeTypes = selectAllAttendeeTypes;

  const filteredGroups = data.filter((group) => {
    const currentGroupAttendeeTypeNames = group?.groupsToAttendeeTypes?.map(
      (item) => {
        if (!item.attendeeType) return null;
        return item.attendeeType.name;
      }
    );

    if (!searchParams.attendeeType) return true;

    if (typeof searchParams.attendeeType === "string")
      return currentGroupAttendeeTypeNames.includes(searchParams.attendeeType);

    if (Array.isArray(searchParams.attendeeType)) {
      // return true if all searchParams.attendeeType are included in attendeeTypes
      console.log(currentGroupAttendeeTypeNames);
      return searchParams.attendeeType.every(
        (attendeeName) => currentGroupAttendeeTypeNames?.includes(attendeeName)
      );
    }
  });

  const groups = await filteredGroups.map((group) => {
    const attendeeTypeDetails: AttendeeTypeDetails[] =
      group.groupsToAttendeeTypes.map((item) => {
        const attendeeTypeData = item.attendeeType;

        return { ...attendeeTypeData, id: item.attendeeTypeId };
      });

    return { ...group, attendeeTypeDetails };
  });

  return (
    <main className="container mx-auto p-6 max-w-screen-2xl bg-background">
      <SearchGroups attendeeTypes={attendeeTypes} />
      <ul className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-center">
        {groups.map((group) => (
          <li key={group.id} className="lg:w-[48%]">
            <GroupCard
              {...group}
              attendeeTypeDetails={group.attendeeTypeDetails}
            />
          </li>
        ))}
      </ul>
      <pre>
        <code>{JSON.stringify(searchParams, null, 2)}</code>
      </pre>
    </main>
  );
}
