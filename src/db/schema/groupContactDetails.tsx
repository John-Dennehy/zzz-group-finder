import { mysqlTable } from "../../lib/mysqlTable";
import {
  InferSelectModel,
  InferInsertModel,
  relations,
  sql,
} from "drizzle-orm";
import {
  boolean,
  int,
  mysqlEnum,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import groups from "./groups";

const contactTypes = [
  "email",
  "phone",
  "text",
  "facebook",
  "website",
  "whatsapp",
] as const;

export const groupContactDetails = mysqlTable("group_contact_details", {
  id: serial("id").primaryKey(),
  groupId: int("group_id"),
  contactType: mysqlEnum("contact_type", contactTypes).notNull(),
  contactValue: varchar("contact_value", { length: 255 }).notNull(),
  forInformation: boolean("for_information").notNull().default(true),
  forBooking: boolean("for_booking").notNull().default(false),

  active: boolean("active").notNull().default(true),

  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp("deleted_at"),
});

export const groupContactDetailsRelations = relations(
  groupContactDetails,
  ({ one }) => ({
    group: one(groups, {
      fields: [groupContactDetails.groupId],
      references: [groups.id],
    }),
  })
);

export type GroupContactDetails = InferSelectModel<typeof groupContactDetails>;
export type GroupContactDetailsInsert = InferInsertModel<
  typeof groupContactDetails
>;
export type GroupContactDetailsUpdate = Partial<GroupContactDetailsInsert>;

export default groupContactDetails;
