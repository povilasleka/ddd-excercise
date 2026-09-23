declare const brand: unique symbol;
export type Brand<T, B extends string> = T & { readonly [brand]: B };

export type Change<T, E> = Readonly<{
  entity: T;
  events: readonly E[];
}>;

export type DomainEntity<T, N> = Readonly<
  N & {
    id: T;
    createdAt: Date;
    updatedAt: Date;
  }
>;

export type DomainEvent<T> = Readonly<
  T & {
    occurredAt: Date;
  }
>;

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
