import { allGroups } from "@/db";
import { GroupCard } from "@/components/GroupCard";
import { Card } from "@nextui-org/card";
import { NewGroupForm } from "./NewGroupForm";

export default async function Home() {
  const data = await allGroups;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg text-primary">Admin Page</h2>
      <Card className="flex flex-col gap-4 p-4 w-auto mx-auto">
        <NewGroupForm />
      </Card>
      <ul className="flex mx-auto gap-2 flex-wrap">
        {data.map((group) => (
          <li key={group.id}>
            <GroupCard group={group} />
          </li>
        ))}
      </ul>
    </div>
  );
}
