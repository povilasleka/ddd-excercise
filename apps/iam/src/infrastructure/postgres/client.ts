import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';

let postgresClient: postgres.Sql | null = null;
let db: ReturnType<typeof drizzle> | null = null;

export function buildDrizzleClient(connUrl: string) {
  if (!connUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  if (!postgresClient) {
    postgresClient = postgres(connUrl);
  }

  if (!db) {
    db = drizzle(postgresClient);
  }

  return { client: postgresClient, db };
}
