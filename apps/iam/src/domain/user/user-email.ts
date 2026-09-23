import type { Brand } from '@packages/common';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type UserEmail = Brand<string, 'UserEmail'>;

export const UserEmail = {
  isValid: (email: string): email is UserEmail => EMAIL_PATTERN.test(email),
};
