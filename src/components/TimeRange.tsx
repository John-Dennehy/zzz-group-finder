import capitalise from "@/lib/capitalise";
import formatTime from "@/lib/formatTime";

export type TimeRangeProps = {
  start: string;
  end: string;
  weekday: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
};

export function TimeRange({ start, end, weekday }: TimeRangeProps) {
  if (!start || !end) {
    return null;
  }

  const formattedTime = `${formatTime(start)} - ${formatTime(end)}`;

  return <p>{`${capitalise(weekday)}: ${formattedTime}`}</p>;
}
