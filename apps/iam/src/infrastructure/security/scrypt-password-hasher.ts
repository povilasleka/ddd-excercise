import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import type { PasswordHasher } from '../../application/ports/password-hasher.ts';

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

export class ScryptPasswordHasher implements PasswordHasher {
  async hash(plainPassword: string): Promise<string> {
    const salt = randomBytes(16);
    const derivedKey = (await scryptAsync(plainPassword, salt, KEY_LENGTH)) as Buffer;
    return `${salt.toString('hex')}:${derivedKey.toString('hex')}`;
  }

  async verify(plainPassword: string, passwordHash: string): Promise<boolean> {
    const [saltHex, keyHex] = passwordHash.split(':');
    if (!saltHex || !keyHex) return false;

    const salt = Buffer.from(saltHex, 'hex');
    const storedKey = Buffer.from(keyHex, 'hex');
    const derivedKey = (await scryptAsync(plainPassword, salt, storedKey.length)) as Buffer;

    return timingSafeEqual(storedKey, derivedKey);
  }
}
