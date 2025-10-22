import dotenv from "dotenv";
import path from "path";

// explicitly load the env file from /server
dotenv.config({ path: path.resolve("server/.env") });

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in .env file");
}

const client = postgres(process.env.DATABASE_URL!, { ssl: "require" });
export const db = drizzle(client);
