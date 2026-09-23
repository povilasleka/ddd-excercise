export interface AppConfig {
  databaseUrl: string;
  jwtPrivateKey: string;
  jwtPublicKey: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not provided`);
  }
  return value;
}

export function getConfig(): AppConfig {
  return {
    databaseUrl: requireEnv('DATABASE_URL'),
    jwtPrivateKey: requireEnv('JWT_PRIVATE_KEY').replaceAll('\\n', '\n'),
    jwtPublicKey: requireEnv('JWT_PUBLIC_KEY').replaceAll('\\n', '\n'),
  };
}
