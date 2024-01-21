import { config, schema } from "@/server/data"
import { connect } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"

// create the connection
const connection = connect(config)
export const db = drizzle(connection, { schema })

export default db
