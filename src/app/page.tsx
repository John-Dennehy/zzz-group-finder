import { allGroups } from "@/db";

export default async function Home() {
  const data = await allGroups;

  return (
    <main>
      <p className="text-lg text-blue-600">Hello</p>
      <ul>
        {data.map((group) => (
          <li key={group.id}>
            <p>{group.name}</p>
            <p>{group.description}</p>

            <p>{group.created_at.toString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
