import { allGroups } from "@/db";
import Image from "next/image";
import { SiFacebook } from "react-icons/si";
import {
  HiOutlineAtSymbol,
  HiOutlinePhone,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

export const revalidate = 60;

export default async function Home() {
  const data = await allGroups;

  return (
    <main className="container p-2 ">
      <h1 className="text-2xl font-bold">Playgroups</h1>
      <ul className="">
        {data.map((group) => {
          if (!group.active) {
            return null;
          }

          return (
            <li
              key={group.id}
              className="flex flex-col gap-2 border-spacing-1 border rounded-md m-2 p-4"
            >
              <div className="flex flex-row justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-medium">{group.name}</h2>
                  <p>
                    {group.address} {group.postCode}
                  </p>
                  <p>{group.description}</p>
                </div>
                {group.logoUrl && (
                  <Image
                    src={group.logoUrl}
                    alt={`${group?.name} Logo`}
                    width={80}
                    height={80}
                  />
                )}
              </div>

              <p>For more information please contact the group directly:</p>
              <div className="flex flex-row gap-2">
                {group.facebook && (
                  <a
                    href={group.facebook}
                    className="flex flex-row gap-1 items-center"
                  >
                    <SiFacebook />
                    <p>Facebook</p>
                  </a>
                )}
                {group.url && (
                  <a href={group.url}>
                    <HiOutlineGlobeAlt />
                  </a>
                )}

                {group.email && (
                  <a href={`mailto:${group.email}`}>
                    <HiOutlineAtSymbol />
                    {group.email}
                  </a>
                )}

                {group.phone && (
                  <a href={`tel:${group.phone}`}>
                    <HiOutlinePhone />
                    {group.phone}
                  </a>
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                <DayStartAndEnd
                  weekday="Mon"
                  start={group.monStart}
                  end={group.monEnd}
                />
                <DayStartAndEnd
                  weekday="Tue"
                  start={group.tueStart}
                  end={group.tueEnd}
                />
                <DayStartAndEnd
                  weekday="Wed"
                  start={group.wedStart}
                  end={group.wedEnd}
                />
                <DayStartAndEnd
                  weekday="Thu"
                  start={group.thuStart}
                  end={group.thuEnd}
                />
                <DayStartAndEnd
                  weekday="Fri"
                  start={group.friStart}
                  end={group.friEnd}
                />
                <DayStartAndEnd
                  weekday="Sat"
                  start={group.satStart}
                  end={group.satEnd}
                />
                <DayStartAndEnd
                  weekday="Sun"
                  start={group.sunStart}
                  end={group.sunEnd}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

type DayStartAndEndProps = {
  weekday: string;
  start: string | null;
  end: string | null;
};
const DayStartAndEnd = ({ weekday, start, end }: DayStartAndEndProps) => {
  if (start === null || end === null) {
    return (
      <div className="flex flex-col">
        <p>{weekday}</p>
        <p>-</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p>{weekday}</p>
      <p>{`${start} - ${end}`}</p>
    </div>
  );
};
