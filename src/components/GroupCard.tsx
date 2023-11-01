import NextImage from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Location } from "./Location";
import { TimeRange } from "./TimeRange";
import formatDate from "@/lib/formatDate";
import { AttendeeType } from "@/db/schema";
import { ContactDetails } from "./ContactDetails";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { GetAllActiveGroups, getAllActiveGroups } from "@/db/queries";

type ActiveGroup = ArrayElement<GetAllActiveGroups>;

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export interface AttendeeTypeDetails
  extends Partial<Pick<AttendeeType, "name" | "description" | "active">> {
  id: string | number | null;
}

interface GroupCardProps extends ActiveGroup {
  attendeeTypeDetails: AttendeeTypeDetails[];
}
export function GroupCard({
  name,
  logoUrl,
  description,
  address,
  postCode,
  groupContactDetails,
  groupOpenHours,
  active,
  updatedAt,
  verifiedAt,
  attendeeTypeDetails,
}: GroupCardProps) {
  return (
    <Card className="border-separate bg-foreground-50 border-secondary-500 drop-shadow-xl h-full">
      <CardHeader className="flex bg-secondary-600 h-32 md:h-24 gap-2 w-full h-full flex-row justify-between">
        <div className="flex flex-col gap-1 ">
          <h2 className="text-xl font-bold text-foreground-50 text-left">
            <span className="truncate ">{name}</span>
            {!active && " (currently inactive)"}
          </h2>

          <div className="flex flex-row gap-2">
            <ul className="flex flex-row flex-wrap  gap-2">
              {attendeeTypeDetails.map((attendee) => (
                <li key={attendee.id} className="">
                  {attendee.description && (
                    <Tooltip content={attendee.description}>
                      <Chip className="bg-primary-600 text-foreground-50 capitalize">
                        {attendee.name}
                      </Chip>
                    </Tooltip>
                  )}
                  {!attendee.description && (
                    <Chip className="bg-primary-600 text-foreground-50 capitalize">
                      {attendee.name}
                    </Chip>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {logoUrl && (
          <Image
            as={NextImage}
            src={logoUrl}
            alt={`${name} logo`}
            width={60}
            height={60}
            radius="sm"
          />
        )}
      </CardHeader>
      <CardBody className="flex flex-col justify-between gap-4  p-3">
        <Location address={address} postCode={postCode} />

        <div className="flex flex-col gap-1 h-full">
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
        <div className="flex flex-col gap-4">
          <p className="text-left">{description}</p>
          <ContactDetails groupContactDetails={groupContactDetails} />
        </div>
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
