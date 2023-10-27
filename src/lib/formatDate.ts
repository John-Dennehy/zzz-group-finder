type UtcDate = string | Date;

export default function formatDate(utcDate: UtcDate) {
  const date = new Date(utcDate);
  return date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
