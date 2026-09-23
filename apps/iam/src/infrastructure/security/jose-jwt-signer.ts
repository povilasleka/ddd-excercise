import { SignJWT, jwtVerify, importPKCS8, importSPKI } from 'jose';
import type { JwtSigner } from '../../application/ports/jwt-signer.ts';

const ALG = 'ES256';
const EXPIRES_IN = '1h';

export interface JoseJwtSignerConfig {
  privateKeyPem: string;
  publicKeyPem: string;
}

export async function createJoseJwtSigner({
  privateKeyPem,
  publicKeyPem,
}: JoseJwtSignerConfig): Promise<JwtSigner> {
  const privateKey = await importPKCS8(privateKeyPem, ALG);
  const publicKey = await importSPKI(publicKeyPem, ALG);

  return {
    async sign<TPayload extends object>(payload: TPayload): Promise<string> {
      return new SignJWT({ ...payload } as Record<string, unknown>)
        .setProtectedHeader({ alg: ALG })
        .setIssuedAt()
        .setExpirationTime(EXPIRES_IN)
        .sign(privateKey);
    },

    async verify<TPayload extends object>(token: string): Promise<TPayload | null> {
      try {
        const { payload } = await jwtVerify(token, publicKey);
        return payload as TPayload;
      } catch {
        return null;
      }
    },
  };
}
