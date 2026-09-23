import { BaseError } from '@shared/domain/base-error.ts';

export class InvalidEmailError extends BaseError {
  constructor() {
    super(`Email format is invalid`, 'EMAIL_INVALID_FORMAT', 400);
  }
}

export class EmailAlreadyTakenError extends BaseError {
  constructor() {
    super(`Email is already taken`, 'EMAIL_ALREADY_TAKEN', 409);
  }
}
