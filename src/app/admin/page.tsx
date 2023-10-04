import { allGroups } from "@/db";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export default async function Home() {
  const data = await allGroups;

  return (
    <main className="container mx-auto">
      <p className="text-lg text-blue-600">Admin Page</p>

      <ul className="flex mx-auto gap-2 flex-wrap">
        {data.map((group) => (
          <li key={group.id}>
            <Card
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
              shadow="sm"
            >
              <CardHeader>
                <p className="text-lg text-primary">{group.name}</p>
              </CardHeader>
              <CardBody>
                <p className="">{JSON.stringify(group)}</p>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}