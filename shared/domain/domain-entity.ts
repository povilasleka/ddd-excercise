export type DomainEntity<T, N> = Readonly<
  N & {
    id: T;
    createdAt: Date;
    updatedAt: Date;
  }
>;
