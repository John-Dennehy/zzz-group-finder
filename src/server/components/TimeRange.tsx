import formatTime from "@/lib/formatTime";
import { Chip } from "@nextui-org/chip";

export type TimeRangeProps = {
  start: string;
  end: string;
  weekday: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  description: string | null;
};

export function TimeRange({
  start,
  end,
  weekday,
  description,
}: TimeRangeProps) {
  if (!start || !end) {
    return null;
  }

  const additionalInfo = description ? `  ${description}` : "";
  const formattedTime = `${formatTime(start)} - ${formatTime(end)}`;

  return (
    <div className="flex gap-2">
      <h4 className="w-12 font-bold capitalize">{weekday}:</h4>
      <div className="flex gap-2">
        <p>{formattedTime}</p>
        {description && (
          <Chip size="sm" variant="bordered">
            {additionalInfo}
          </Chip>
        )}
      </div>
    </div>
  );
}
