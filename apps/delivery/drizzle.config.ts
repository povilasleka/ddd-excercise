import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import process from "node:process";

export default defineConfig({
  schema: "./src/infrastructure/postgres/schema.ts",
  out: "./src/infrastructure/postgres/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://mds:mds_password@localhost:5432/delivery",
  },
});
