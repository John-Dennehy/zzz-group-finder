import { allActiveGroups } from "@/db";
import { GroupCard } from "@/components/GroupCard";

export default async function Home() {
  const data = await allActiveGroups;

  return (
    <main>
      <p className="text-lg text-primary-400">Hello</p>
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
