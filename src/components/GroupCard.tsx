import NextImage from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Location } from "./Location";
import { Divider } from "@nextui-org/divider";
import { TimeRange } from "./TimeRange";
import formatDate from "@/lib/formatDate";
import { AttendeeType, GroupContactDetails, GroupOpenHours } from "@/db/schema";
import { ContactDetails } from "./ContactDetails";
import { Tooltip } from "@nextui-org/tooltip";

type GroupCardProps = {
  name: string;
  logoUrl?: string;
  description?: string | null;
  address: string;
  postCode: string;
  active: boolean;
  verifiedAt?: string | null | Date;
  updatedAt?: string | null | Date;
  groupOpenHours: GroupOpenHours[];
  groupContactDetails: GroupContactDetails[];
  attendeeTypes: AttendeeType[];
};

export function GroupCard({
  name,
  logoUrl,
  active,
  description,
  address,
  postCode,
  verifiedAt,
  updatedAt,
  groupOpenHours,
  groupContactDetails,
  attendeeTypes,
}: GroupCardProps) {
  return (
    <Card
      isBlurred
      className=" border-none bg-background/60 dark:bg-default-100/50  flex-grow h-full"
      shadow="sm"
    >
      <CardHeader className="flex flex-col">
        <h2 className="text-xl text-primary text-left w-full">
          {name}
          {!active && " (currently inactive)"}
        </h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-1 p-3">
        <p className="text-left">{description}</p>
        {/* {logoUrl && (
          <NextImage width={50} height={50} alt="logo" src={logoUrl} />
        )} */}
        <p>Group is suitable for:</p>
        <ul className="list-inside list-disc">
          {attendeeTypes.map((attendeeType) => (
            <li key={attendeeType.id} className="">
              <Tooltip content={attendeeType.description}>
                <span>{attendeeType.name}</span>
              </Tooltip>
            </li>
          ))}
        </ul>
        <Divider />
        <Location address={address} postCode={postCode} />
        <Divider />
        <div className="flex flex-col gap-1">
          <h3 className="text-left text-lg">Schedule:</h3>
          {groupOpenHours.map((openHour) => (
            <TimeRange
              key={openHour.weekday}
              weekday={openHour.weekday}
              start={openHour.start}
              end={openHour.end}
            />
          ))}
        </div>
        <Divider />
        <ContactDetails
          groupContactDetails={groupContactDetails}
        ></ContactDetails>
      </CardBody>
      <CardFooter className="flex flex-col gap-1 items-end">
        <p className="text-foreground-500 text-xs ">
          {!verifiedAt && updatedAt && `Last Updated: ${formatDate(updatedAt)}`}
          {verifiedAt && `Verified: ${formatDate(verifiedAt)}`}
        </p>
      </CardFooter>
    </Card>
  );
}
