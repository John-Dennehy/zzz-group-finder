import { config, schema } from "@/data"
import { connect } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"

// create the connection
const connection = connect(config)
export const db = drizzle(connection, { schema })

export default db
