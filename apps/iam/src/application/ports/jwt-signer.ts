export interface JwtSigner {
  sign<TPayload extends object>(payload: TPayload): Promise<string>;
  verify<TPayload extends object>(token: string): Promise<TPayload | null>;
}
