import { User } from '../domain/user/user.ts';
import { EmailAlreadyTakenError, InvalidEmailError } from './register-user.errors.ts';
import type { UserRepository } from './ports/user-repository.ts';
import type { PasswordHasher } from './ports/password-hasher.ts';

export interface RegisterUserInput {
  email: string;
  password: string;
}

export interface RegisterUserDependencies {
  repository: UserRepository;
  passwordHasher: PasswordHasher;
}

export function initRegisterUser({ repository, passwordHasher }: RegisterUserDependencies) {
  return async (input: RegisterUserInput): Promise<User> => {
    const existing = await repository.findByEmail(input.email);
    if (existing) throw new EmailAlreadyTakenError();

    const payload = {
      email: input.email,
      passwordHash: await passwordHasher.hash(input.password),
    };

    const result = User.create(payload);
    if (!result.ok) throw new InvalidEmailError();

    await repository.save(result.value.entity);
    return result.value.entity;
  };
}
