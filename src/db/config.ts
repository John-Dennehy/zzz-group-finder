import { Config } from "@planetscale/database"

export const config: Config = {
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
}

// export default config
