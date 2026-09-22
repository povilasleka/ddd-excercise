import { BaseError } from '@shared/domain/base-error.ts';

export class InvalidEmailError extends BaseError {
  constructor(email: string) {
    super(`Invalid email: ${email}`, 'INVALID_EMAIL');
  }
}

export class EmailAlreadyTakenError extends BaseError {
  constructor(email: string) {
    super(`Email already taken: ${email}`, 'EMAIL_ALREADY_TAKEN');
  }
}
