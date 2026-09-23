import { getConfig } from './config.ts';
import { buildDrizzleClient } from './infrastructure/postgres/client.ts';
import { DrizzleUserRepository } from './infrastructure/postgres/user-repository.ts';
import { ScryptPasswordHasher } from './infrastructure/security/scrypt-password-hasher.ts';
import { createJoseJwtSigner } from './infrastructure/security/jose-jwt-signer.ts';
import { initRegisterUser } from './application/register-user.use-case.ts';
import { initAuthenticateUser } from './application/authenticate-user.use-case.ts';

export async function registerDependencies() {
  const config = getConfig();
  const { db } = buildDrizzleClient(config.databaseUrl);

  const repository = new DrizzleUserRepository(db);
  const passwordHasher = new ScryptPasswordHasher();
  const jwtSigner = await createJoseJwtSigner({
    privateKeyPem: config.jwtPrivateKey,
    publicKeyPem: config.jwtPublicKey,
  });

  return {
    registerUser: initRegisterUser({ repository, passwordHasher }),
    authenticateUser: initAuthenticateUser({ repository, passwordHasher, jwtSigner }),
  };
}

export type Dependencies = Awaited<ReturnType<typeof registerDependencies>>;
