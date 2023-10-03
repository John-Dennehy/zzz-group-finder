import { mysqlTableCreator } from "drizzle-orm/mysql-core";

const TABLE_PREFIX = "groupfinder_";

export const prefixedMysqlTable = mysqlTableCreator(
  (name) => `${TABLE_PREFIX}${name}`
);
