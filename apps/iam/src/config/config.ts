export interface AppConfig {
  databaseUrl: string;
}

export function getConfig(): AppConfig {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('Environment variable DATABASE_URL is not provided');
  }

  return {
    databaseUrl,
  };
}
