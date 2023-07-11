import { allGroups } from "@/db";

export default async function Home() {
  const data = await allGroups;

  return (
    <main>
      <p>Hello</p>
      <ul>
        {data.map((group) => (
          <li key={group.id}>
            <p>{group.name}</p>
            <p>{group.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
