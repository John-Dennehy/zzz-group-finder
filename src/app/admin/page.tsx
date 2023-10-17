import { allGroups } from "@/db";
import { GroupCard } from "@/components/GroupCard";
import NewGroupModal from "@/components/NewGroupModal";

export default async function Home() {
  const data = await allGroups;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg text-primary">Admin Page</h2>
      <NewGroupModal />

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
