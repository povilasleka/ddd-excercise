import { eq } from 'drizzle-orm';
import type { drizzle } from 'drizzle-orm/postgres-js';
import type { UserRepository } from '@/domain/user/user-repository.js';
import type { User, UserId } from '@/domain/user/user.js';
import type { UserEmail } from '@/domain/user/user-email.js';
import type { UserStatus } from '@/domain/user/user-status.js';
import { users } from './schema.ts';

type Db = ReturnType<typeof drizzle>;
type UserRow = typeof users.$inferSelect;

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly db: Db) {}

  async findById(id: string): Promise<User | null> {
    const [row] = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return row ? toDomain(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [row] = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
    return row ? toDomain(row) : null;
  }

  async delete(userId: string): Promise<void> {
    await this.db.delete(users).where(eq(users.id, userId));
  }

  async save(user: User): Promise<void> {
    const row = toRow(user);
    await this.db.insert(users).values(row).onConflictDoUpdate({ target: users.id, set: row });
  }
}

function toDomain(row: UserRow): User {
  return {
    id: row.id as UserId,
    email: row.email as UserEmail,
    passwordHash: row.passwordHash,
    status: row.status as UserStatus,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function toRow(user: User): UserRow {
  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
