import { allGroups } from "@/db";
import { GroupCard } from "@/components/GroupCard";

export default async function Home() {
  const data = await allGroups;

  return (
    <main className="container mx-auto">
      <p className="text-lg text-blue-600">Admin Page</p>

      <ul className="flex mx-auto gap-2 flex-wrap">
        {data.map((group) => (
          <li key={group.id}>
            <GroupCard group={group} />
          </li>
        ))}
      </ul>
    </main>
  );
}
