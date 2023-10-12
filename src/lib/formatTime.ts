export function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const minute = parseInt(minutes);

  const isPM = hour >= 12;
  const isNoon = hour === 12;
  const hour12 = isPM && !isNoon ? hour - 12 : hour;
  const hour12String = hour12.toString().padStart(2, "0");
  const minuteString = minute.toString().padStart(2, "0");

  return `${hour12String}:${minuteString}${isPM ? "pm" : "am"}`;
}

export default formatTime;
