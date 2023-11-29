import { ContactDetails } from "@/components/ContactDetails"
import { Location } from "@/components/Location"
import { TimeRange } from "@/components/TimeRange"
import { GetAllActiveGroups } from "@/db/queries"
import { AttendeeType } from "@/db/schema"
import { formatDate } from "@/lib/formatDate"
import { Card,CardBody,CardFooter,CardHeader } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import { Image } from "@nextui-org/image"
import { Tooltip } from "@nextui-org/tooltip"
import NextImage from "next/image"

type ActiveGroup = ArrayElement<GetAllActiveGroups>

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export interface AttendeeTypeDetails
  extends Partial<Pick<AttendeeType, "name" | "description" | "active">> {
  id: string | number | null
}

interface GroupCardProps extends ActiveGroup {
  attendeeTypeDetails: AttendeeTypeDetails[]
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
    <Card className="h-full border-separate border-secondary-500 bg-foreground-50 drop-shadow-xl">
      <CardHeader className="flex h-full w-full flex-row justify-between gap-2 bg-secondary-600 md:h-24">
        <div className="flex flex-col gap-1 ">
          <h2 className="text-left text-xl font-bold text-foreground-50">
            <span className="truncate ">{name}</span>
            {!active && " (currently inactive)"}
          </h2>

          <div className="flex flex-row gap-2">
            <ul className="flex flex-row flex-wrap  gap-2">
              {attendeeTypeDetails.map((attendee) => (
                <li key={attendee.id} className="">
                  {attendee.description && (
                    <Tooltip content={attendee.description}>
                      <Chip className="bg-primary-600 capitalize text-foreground-50">
                        {attendee.name}
                      </Chip>
                    </Tooltip>
                  )}
                  {!attendee.description && (
                    <Chip className="bg-primary-600 capitalize text-foreground-50">
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

        <div className="flex h-full flex-col gap-1">
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
      <CardFooter className="flex flex-col items-end gap-1">
        <p className="text-xs text-foreground-500 ">
          {!verifiedAt && updatedAt && `Last Updated: ${formatDate(updatedAt)}`}
          {verifiedAt && `Verified: ${formatDate(verifiedAt)}`}
        </p>
      </CardFooter>
    </Card>
  )
}
