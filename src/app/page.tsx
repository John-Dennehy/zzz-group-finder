import { allGroups } from "@/db";
import { GroupCard } from "@/components/GroupCard";

export default async function Home() {
  const data = await allGroups;

  return (
    <main>
      <p className="text-lg text-blue-600">Hello</p>
      <ul>
        {data.map((group) => (
          <li key={group.id}>
            <GroupCard group={group} />
          </li>
        ))}
      </ul>
    </main>
  );
}
