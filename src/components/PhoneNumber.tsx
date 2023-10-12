import { Link } from "@nextui-org/link";

export function PhoneNumber({ phoneNumber }: { phoneNumber: string | null }) {
  if (!phoneNumber) return null;
  return (
    <div className="flex gap-2">
      <h3>Phone</h3>
      <Link
        className="text-primary"
        href={`tel:${phoneNumber}`}
        target="_blank"
        rel="noreferrer"
      >
        {phoneNumber}
      </Link>
    </div>
  );
}
