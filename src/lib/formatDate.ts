export default function formatDate(utcString: string) {
  const date = new Date(utcString);
  return date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
