import { Link } from "@nextui-org/link";

type LocationProps = {
  address: string | null;
  postCode: string | null;
};
export function Location({ address, postCode }: LocationProps) {
  if (!address && !postCode) return null;

  let href = `https://www.google.com/maps/search/?api=1&query=`;
  if (address) href += `${address}, `;
  if (postCode) href += `${postCode}`;

  let formattedAddress = "";
  if (address) formattedAddress += `${address}, `;
  if (postCode) formattedAddress += `${postCode}`;

  return (
    <div className="flex gap-2 text-left  w-full">
      <Link
        className="text-primary"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {formattedAddress}
      </Link>
    </div>
  );
}
