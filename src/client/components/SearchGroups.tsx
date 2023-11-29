"use client";

import { selectAllAttendeeTypes } from "../../server/db/queries";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type SearchGroupsProps = {
  attendeeTypes: typeof selectAllAttendeeTypes;
};

export function SearchGroups({ attendeeTypes }: SearchGroupsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClick = (attendeeTypeName: string) => {
    // const currentRoute =
    router.push(`?attendeeType=${attendeeTypeName}`, {});
  };

  return (
    <>
      <div className="flex gap-2">
        <h2>Filter:</h2>
        {attendeeTypes.map((attendeeType) => (
          <Chip
            key={attendeeType.id}
            variant="flat"
            color="secondary"
            className="capitalize "
            onClick={() => handleClick(attendeeType.name)}
          >
            {attendeeType.name}
          </Chip>
        ))}
      </div>
      <br />
      <Divider />
      <br />
    </>
  );
}

type AttendeeFilterProps = {
  attendeeTypes: typeof selectAllAttendeeTypes;
};

const AttendeeFilter = ({ attendeeTypes }: AttendeeFilterProps) => {
  return (
    <>
      {attendeeTypes.map((attendeeType, index) => (
        <Chip
          key={index}
          variant="flat"
          color="secondary"
          className="capitalize "
          // onClick={() => handleClick(attendeeType.name)}
        >
          {attendeeType.name}
        </Chip>
      ))}
    </>
  );
};
export default SearchGroups;
