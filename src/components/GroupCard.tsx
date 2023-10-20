import NextImage from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Location } from "./Location";
import { Divider } from "@nextui-org/divider";
import { TimeRange } from "./TimeRange";
import formatDate from "@/lib/formatDate";
import { AttendeeType, GroupContactDetails, GroupOpenHours } from "@/db/schema";
import { ContactDetails } from "./ContactDetails";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";

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
        <h2 className="flex-row text-xl font-bold text-primary text-left w-full">
          {name}
          {!active && " (currently inactive)"}
        </h2>
        <Location address={address} postCode={postCode} />
      </CardHeader>
      <CardBody className="flex flex-col gap-2 p-3">
        {/* {logoUrl && (
          <NextImage width={50} height={50} alt="logo" src={logoUrl} />
        )} */}
        <div className="flex flex-row gap-2">
          <ul className="flex flex-row gap-2">
            {attendeeTypes.map((attendeeType) => (
              <li key={attendeeType.id} className="">
                {attendeeType.description && (
                  <Tooltip content={attendeeType.description}>
                    <Chip>{attendeeType.name}</Chip>
                  </Tooltip>
                )}
                {!attendeeType.description && <Chip>{attendeeType.name}</Chip>}
              </li>
            ))}
          </ul>
        </div>

        <Divider />
        <div className="flex flex-col gap-1">
          {groupOpenHours.map((openHour) => (
            <TimeRange
              key={openHour.weekday}
              weekday={openHour.weekday}
              start={openHour.start}
              end={openHour.end}
              description={openHour.description}
            />
          ))}
          {groupOpenHours.length === 0 && (
            <p className="text-left">No groups currently scheduled</p>
          )}
        </div>
        <Divider />
        <p className="text-left">{description}</p>
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
