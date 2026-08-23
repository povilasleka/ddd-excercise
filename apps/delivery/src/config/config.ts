export interface AppConfig {
  databaseUrl: string;
}

export function getConfig(): AppConfig {
  const databaseUrl =
    process.env.DATABASE_URL || 'postgres://mds:mds_password@localhost:5432/delivery';

  return {
    databaseUrl,
  };
}
