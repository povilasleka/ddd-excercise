import { err, ok, type Brand, type Change, type DomainEntity, type Result } from '@packages/common';
import type { UserEvent } from './user-events.ts';
import { UserStatus } from './user-status.js';
import { UserEmail } from './user-email.js';
import type { InvalidEmailError, InvalidTransitionError } from './user-errors.js';

export type UserId = Brand<string, 'UserId'>;
export type User = DomainEntity<
  UserId,
  {
    email: UserEmail;
    passwordHash: string;
    status: UserStatus;
  }
>;

export type RegisterUserProps = Readonly<{
  email: string;
  passwordHash: string;
}>;

export type Deps = Readonly<{
  newId: () => UserId;
  now: () => Date;
}>;

const defaultDeps: Deps = {
  newId: () => crypto.randomUUID() as UserId,
  now: () => new Date(),
};

const unchanged = (user: User): Change<User, UserEvent> => ({ entity: user, events: [] });

export const User = {
  create(
    props: RegisterUserProps,
    deps: Deps = defaultDeps,
  ): Result<Change<User, UserEvent>, InvalidEmailError> {
    if (!UserEmail.isValid(props.email)) return err('InvalidEmail');

    const now = deps.now();
    const user: User = {
      id: deps.newId(),
      email: props.email,
      passwordHash: props.passwordHash,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    return ok({
      entity: user,
      events: [
        {
          type: 'UserCreated',
          userId: user.id,
          email: user.email,
          status: user.status,
          occurredAt: now,
        },
      ],
    });
  },
  setEmail(u: User, email: string, now: Date): Result<Change<User, UserEvent>, InvalidEmailError> {
    if (email === u.email) return ok(unchanged(u));
    if (!UserEmail.isValid(email)) return err('InvalidEmail');

    return ok({
      entity: { ...u, email, updatedAt: now },
      events: [
        { type: 'UserEmailChanged', userId: u.id, from: u.email, to: email, occurredAt: now },
      ],
    });
  },
  setStatus(
    u: User,
    to: UserStatus,
    now: Date,
  ): Result<Change<User, UserEvent>, InvalidTransitionError> {
    if (to === u.status) return ok(unchanged(u));
    if (!UserStatus.canTransition(u.status, to)) return err('InvalidTransition');

    return ok({
      entity: { ...u, status: to, updatedAt: now },
      events: [{ type: 'UserStatusChanged', userId: u.id, from: u.status, to, occurredAt: now }],
    });
  },
};
