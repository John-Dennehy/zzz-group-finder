import { GroupCard } from "@/components/GroupCard";
import { NewGroupModal } from "@/components/NewGroupModal";
import { getAllGroups } from "@/db/queries";
import selectAllActiveGroups from "@/db/queries/selectAllActiveGroups";

export default async function Home() {
  const data = await getAllGroups;
  const selectData = await selectAllActiveGroups();
  console.log(selectData);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg text-primary">Admin Page</h2>
      <NewGroupModal />

      <pre>{JSON.stringify(selectData, null, 2)}</pre>

      {/* <ul className="flex mx-auto gap-2 flex-wrap">
        {data.map((group) => (
          <li key={group.id}>
            <GroupCard group={group} />
          </li>
        ))}
      </ul> */}
    </div>
  );
}
