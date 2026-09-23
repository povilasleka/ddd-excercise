import type { JwtSigner } from './ports/jwt-signer.ts';
import type { PasswordHasher } from './ports/password-hasher.ts';
import type { UserRepository } from './ports/user-repository.ts';
import type { JwtPayload } from './ports/jwt-payload.ts';
import { AuthenticationFailedError } from './authenticate-user.errors.ts';

export interface AuthenticateUserDependencies {
  repository: UserRepository;
  passwordHasher: PasswordHasher;
  jwtSigner: JwtSigner;
}

export interface AuthenticateUserInput {
  email: string;
  password: string;
}

export function initAuthenticateUser({
  repository,
  passwordHasher,
  jwtSigner,
}: AuthenticateUserDependencies) {
  return async (input: AuthenticateUserInput): Promise<string> => {
    const user = await repository.findByEmail(input.email);
    if (!user) throw new AuthenticationFailedError();

    const isPasswordCorrect = await passwordHasher.verify(input.password, user.passwordHash);
    if (!isPasswordCorrect) throw new AuthenticationFailedError();

    const jwtPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };

    const token = await jwtSigner.sign<JwtPayload>(jwtPayload);
    return token;
  };
}
