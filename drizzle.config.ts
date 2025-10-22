import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import path from "path";

// manually load .env from /server
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "server/.env") });

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is missing — make sure .env is set up");
}

export default defineConfig({
  schema: "./server/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
