import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import config from "@/db/config";
import { groups } from "@/db/schema";

// create the connection
const connection = connect(config);

const db = drizzle(connection);

export const allGroups = await db
  .select({
    id: groups.id,
    name: groups.name,
    description: groups.description,
    created_at: groups.created_at,
  })
  .from(groups);
