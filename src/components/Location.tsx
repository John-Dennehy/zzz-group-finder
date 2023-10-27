import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

type LocationProps = {
  address: string | null;
  postCode: string | null;
};
export function Location({ address, postCode }: LocationProps) {
  if (!address && !postCode) return null;

  let href = `https://www.google.com/maps/search/?api=1&query=`;
  if (address) href += `${address}, `;
  if (postCode) href += `${postCode}`;

  const formatLocation = (address: string | null, postCode: string | null) => {
    if (!address && !postCode) return null;
    if (address && !postCode) return address;
    if (!address && postCode) return postCode;
    return `${address}, ${postCode}`;
  };

  return (
    <Button
      as={Link}
      isExternal
      href={href}
      showAnchorIcon
      isBlock
      size="md"
      color="warning"
      className="w-full min-h-unit-8 "
    >
      <p className="truncate">{formatLocation(address, postCode)}</p>
    </Button>
  );
}
