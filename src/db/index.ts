import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import * as schema from "./schema";
import { config } from "./config";

// create the connection
const connection = connect(config);
export const db = drizzle(connection, { schema });

export default db;


