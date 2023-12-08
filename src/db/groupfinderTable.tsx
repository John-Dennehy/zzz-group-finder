import { mysqlTableCreator } from "drizzle-orm/mysql-core";

// adds a prefix to all table names, to support multiple apps using the same database
export const groupfinderTable = mysqlTableCreator((name) => `groupfinder_${name}`);
