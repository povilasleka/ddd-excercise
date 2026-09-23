import { AppError } from './ports/app-error.ts';

export class InvalidEmailError extends AppError {
  constructor() {
    super(`Email format is invalid`, 'EMAIL_INVALID_FORMAT', 'BAD_REQUEST');
  }
}

export class EmailAlreadyTakenError extends AppError {
  constructor() {
    super(`Email is already taken`, 'EMAIL_ALREADY_TAKEN', 'CONFLICT');
  }
}
