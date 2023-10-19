import { GroupCard } from "@/components/GroupCard";
import { getAllActiveGroups } from "@/db/queries";

export default async function Home() {
  const data = getAllActiveGroups;

  const groups = await data.map((group) => {
    return { ...group };
  });

  return (
    <main>
      <ul className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-center">
        {groups.map((group) => (
          <li key={group.id} className="lg:w-[48%]">
            <GroupCard {...group} />
          </li>
        ))}
      </ul>
    </main>
  );
}
