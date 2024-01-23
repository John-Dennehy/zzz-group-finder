import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
  schema: "src/server/data/schema/index.ts",
  out: "src/server/data/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL!,
  },
  tablesFilter: ["groupfinder_*"],
} satisfies Config
