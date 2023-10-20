import { GroupContactDetails } from "@/db/schema";
import { Link } from "@nextui-org/link";

type ContactDetailsProps = {
  groupContactDetails: GroupContactDetails[];
};
export function ContactDetails({ groupContactDetails }: ContactDetailsProps) {
  return (
    <>
      <ul className="flex flex-col gap-1">
        {groupContactDetails.map((contact) => {
          const { id, contactType, contactValue, forInformation, forBooking } =
            contact;

          let contactTypeString = formattedContactType(
            forInformation,
            forBooking
          );

          if (contactType === "email") {
            return (
              <li key={id} className="flex flex-row items-center h-6 gap-1">
                <p>Email </p>
                <Link href={`mailto:${contactValue}`}>{contactValue}</Link>
              </li>
            );
          }

          if (contactType === "phone") {
            return (
              <li key={id} className="flex flex-row items-center h-6 gap-1">
                <p>Phone </p>
                <Link href={`tel:${contactValue}`}>{contactValue}</Link>
              </li>
            );
          }

          if (contactType === "website" || contactType === "facebook") {
            // handle prefixing with https:// if not already present
            let prefixString = "https://";
            let contactValue = contact.contactValue;

            if (contactValue.includes("https://")) {
              contactValue.replace("https://", "");
            }
            if (contactValue.includes("http://")) {
              contactValue.replace("http://", "");
              prefixString = "http://";
            }

            return (
              <li key={id} className="flex flex-row items-center h-6 gap-1">
                <Link href={`${prefixString}${contactValue}`} target="_blank">
                  {contactValue}
                </Link>
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
