import type { UserId } from './user.ts';
import type { UserStatus } from './user-status.ts';
import type { DomainEvent } from '@packages/common';

export type UserCreated = DomainEvent<{
  type: 'UserCreated';
  userId: UserId;
  email: string;
  status: UserStatus;
}>;

export type UserEmailChanged = DomainEvent<{
  type: 'UserEmailChanged';
  userId: UserId;
  from: string;
  to: string;
}>;

export type UserStatusChanged = DomainEvent<{
  type: 'UserStatusChanged';
  userId: UserId;
  from: UserStatus;
  to: UserStatus;
}>;

export type UserEvent = UserCreated | UserEmailChanged | UserStatusChanged;
