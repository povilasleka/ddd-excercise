import { AppError } from './ports/app-error.ts';

export class AuthenticationFailedError extends AppError {
  constructor() {
    super('Authentication failed', 'AUTHENTICATION_FAILED', 'UNAUTHORIZED');
  }
}
