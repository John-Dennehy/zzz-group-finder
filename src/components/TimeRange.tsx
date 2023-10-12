import formatTime from "@/lib/formatTime";
import { TimeRangeProps } from "./Schedule";

export function TimeRange({ startTime, endTime, weekday }: TimeRangeProps) {
  if (!startTime || !endTime) {
    return null;
  }

  const formattedTime = `${formatTime(startTime)} - ${formatTime(endTime)}`;

  return <p>{`${weekday}: ${formattedTime}`}</p>;
}
