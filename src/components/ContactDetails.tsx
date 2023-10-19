import { GroupContactDetails } from "@/db/schema";
import { Link } from "@nextui-org/link";

type ContactDetailsProps = {
  groupContactDetails: GroupContactDetails[];
};
export function ContactDetails({ groupContactDetails }: ContactDetailsProps) {
  return (
    <>
      <h3 className="text-left text-lg">Contact Details:</h3>
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
                <Link>
                  <a href={`mailto:${contactValue}`}>{contactValue}</a>
                </Link>
                {contactTypeString}
              </li>
            );
          }

          if (contactType === "phone") {
            return (
              <li key={id} className="flex flex-row items-center h-6 gap-1">
                <p>Phone </p>
                <Link>
                  <a href={`tel:${contactValue}`}>{contactValue}</a>
                </Link>
                {contactTypeString}
              </li>
            );
          }

          if (contactType === "website" || contactType === "facebook") {
            // handle prefixing with https:// if not already present
            let prefixString = "https://";
            if (contactValue.includes("https://")) {
              contactValue.replace("https://", "");
            }
            if (contactValue.includes("http://")) {
              contactValue.replace("http://", "");
              prefixString = "http://";
            }

            return (
              <li key={id} className="flex flex-row items-center h-6 gap-1">
                <p>Visit </p>
                <Link>
                  <a href={`${prefixString}${contactValue}`} target="_blank">
                    {contactValue}
                  </a>
                </Link>
                {contactTypeString}
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
