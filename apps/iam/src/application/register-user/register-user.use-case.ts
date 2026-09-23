import { User } from '@/domain/user/user.js';
import { EmailAlreadyTakenError, InvalidEmailError } from './register-user.errors.ts';
import type { UserRepository } from '@/domain/user/ports/user-repository.js';

export interface RegisterUserInput {
  email: string;
  passwordHash: string;
}

export class RegisterUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: RegisterUserInput): Promise<User> {
    const existing = await this.repository.findByEmail(input.email);
    if (existing) throw new EmailAlreadyTakenError();

    const result = User.create(input);
    if (!result.ok) throw new InvalidEmailError();

    await this.repository.save(result.value.entity);
    return result.value.entity;
  }
}
