export interface AppConfig {
  databaseUrl: string;
}

export function getConfig(): AppConfig {
  const databaseUrl =
    process.env.DATABASE_URL || 'postgres://root:root_password@localhost:5433/main';

  return {
    databaseUrl,
  };
}
