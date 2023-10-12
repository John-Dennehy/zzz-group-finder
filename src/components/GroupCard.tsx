import { Group } from "@/db/schema";
import NextImage from "next/image";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { PhoneNumber } from "./PhoneNumber";
import { Schedule } from "./Schedule";
import { Location } from "./Location";
import { Url } from "./Url";

type GroupCardProps = {
  group: Group;
};

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card
      isBlurred
      className=" border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardHeader className="flex flex-col">
        <h2 className="text-xl text-primary text-left w-full">{group.name}</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-1 p-3">
        <p className="text-left">{group.description}</p>
        {group.logoUrl && (
          <NextImage width={50} height={50} alt="logo" src={group.logoUrl} />
        )}
        <Location address={group.address} postCode={group.postCode} />
        <PhoneNumber phoneNumber={group.phone} />
        <Url url={group.url} />
        <Schedule group={group} />

        {/* <div>
          <h3>Raw Outout</h3>
          <pre className="">{JSON.stringify(group, null, 2)}</pre>
        </div> */}
      </CardBody>
    </Card>
  );
}
