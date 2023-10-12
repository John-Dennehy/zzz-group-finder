import { Group } from "@/db/schema";
import { TimeRange } from "./TimeRange";

export type TimeRangeProps = {
  startTime: string | null;
  endTime: string | null;
  weekday:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
};

type ScheduleProps = {
  group: Group;
};

export function Schedule({ group }: ScheduleProps) {
  return (
    <div>
      <TimeRange
        weekday="Monday"
        startTime={group.timeMonStart}
        endTime={group.timeMonEnd}
      />
      <TimeRange
        weekday="Tuesday"
        startTime={group.timeTueStart}
        endTime={group.timeTueEnd}
      />
      <TimeRange
        weekday="Wednesday"
        startTime={group.timeWedStart}
        endTime={group.timeWedEnd}
      />
      <TimeRange
        weekday="Thursday"
        startTime={group.timeThuStart}
        endTime={group.timeThuEnd}
      />

      <TimeRange
        weekday="Friday"
        startTime={group.timeFriStart}
        endTime={group.timeFriEnd}
      />

      <TimeRange
        weekday="Saturday"
        startTime={group.timeSatStart}
        endTime={group.timeSatEnd}
      />

      <TimeRange
        weekday="Sunday"
        startTime={group.timeSunStart}
        endTime={group.timeSunEnd}
      />
    </div>
  );
}
