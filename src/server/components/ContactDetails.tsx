import { GroupContactDetails } from "../db/schema";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {
  PiEnvelopeSimpleDuotone,
  PiFacebookLogoDuotone,
  PiGlobeSimpleDuotone,
} from "react-icons/pi";
type ContactDetails = {
  id: string | number;
  contactType: "email" | "phone" | "text" | "facebook" | "website" | "whatsapp";
  contactValue: string;
  forInformation: boolean;
  forBooking: boolean;
  updatedAt: Date | null;
};
type ContactDetailsProps = {
  groupContactDetails: ContactDetails[];
};

export function ContactDetails({ groupContactDetails }: ContactDetailsProps) {
  return (
    <>
      <ul className="flex flex-col gap-2">
        {groupContactDetails.map((contact) => {
          const { id, contactType, contactValue, forInformation, forBooking } =
            contact;

          let contactLabel = "";
          let contactTypeString = formattedContactType(
            forInformation,
            forBooking
          );

          if (contactType === "email") {
            return (
              <li key={id} className="flex flex-row items-center h-6 gap-1">
                <Button as={Link} href={`mailto:${contactValue}`}>
                  <PiEnvelopeSimpleDuotone size={24} />
                  {contactLabel}
                </Button>
              </li>
            );
          }

          if (contactType === "phone") {
            return (
              <li key={id} className="flex flex-row items-center h-6 gap-1">
                <p>Phone </p>
                <Link href={`tel:${contactValue}`}>{contactLabel}</Link>
              </li>
            );
          }

          if (contactType === "website" || contactType === "facebook") {
            // handle prefixing with https:// if not already present
            let url;

            if (contactValue.includes("https://")) {
              url = contactValue;
              contactLabel = contactValue.replace("https://", "");
            }
            if (contactValue.includes("http://")) {
              url = contactValue;
              contactLabel = contactValue.replace("http://", "");
            }
            if (
              !contactValue.includes("http://") &&
              !contactValue.includes("https://")
            ) {
              url = `https://${contactValue}`;
              contactLabel = contactValue;
            }

            return (
              <li key={id} className="flex flex-row items-center h-6 gap-1">
                <Button
                  as={Link}
                  href={url}
                  isBlock
                  isExternal
                  showAnchorIcon
                  variant="solid"
                  color="default"
                  title="Opens in a new tab"
                >
                  {contactType === "facebook" && (
                    <PiFacebookLogoDuotone size={24} />
                  )}
                  {contactType === "website" && (
                    <PiGlobeSimpleDuotone size={24} color="" />
                  )}
                  <p className="truncate">{contactLabel}</p>
                </Button>
              </li>
            );
          }

          return (
            <li key={id}>
              <pre>{JSON.stringify(contact, null, 2)}</pre>
            </li>
          );
        })}
      </ul>
    </>
  );

  function formattedContactType(forInformation: boolean, forBooking: boolean) {
    let suffixString = "";
    if (forInformation || forBooking) suffixString += " for";
    if (forInformation) suffixString += " further information";
    if (forInformation && forBooking) suffixString += " and";
    if (forBooking) suffixString += " booking";
    return suffixString;
  }
}
