import { pgSchema, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const iamSchema = pgSchema('iam');

export const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
};

export const users = iamSchema.table('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 320 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  ...timestamps,
});
