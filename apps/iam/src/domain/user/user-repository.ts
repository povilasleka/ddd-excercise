import type { User } from './user.ts';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  delete(userId: string): Promise<void>;
  save(user: User): Promise<void>;
}
