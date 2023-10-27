import { AttendeeTypeDetails, GroupCard } from "@/components/GroupCard";
import { getAllActiveGroups } from "@/db/queries";

export default async function Home() {
  const data = getAllActiveGroups;

  const groups = await data.map((group) => {
    const attendeeTypeDetails: AttendeeTypeDetails[] =
      group.groupsToAttendeeTypes.map((item) => {
        const attendeeTypeData = item.attendeeType;

        return { ...attendeeTypeData, id: item.attendeeTypeId };
      });

    return { ...group, attendeeTypeDetails };
  });

  return (
    <main className="container mx-auto p-6 max-w-screen-2xl bg-background">
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
    </main>
  );
}
