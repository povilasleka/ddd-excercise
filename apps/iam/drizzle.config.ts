import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
import { getConfig } from './src/config/config.ts';

const config = getConfig();

export default defineConfig({
  schema: './src/infrastructure/postgres/schema.ts',
  out: './src/infrastructure/postgres/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.databaseUrl,
  },
});
