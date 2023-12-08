type UtcDate = string | Date;

export function formatDate(utcDate: UtcDate) {
  const date = new Date(utcDate)
  return date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default formatDate