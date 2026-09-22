export type DomainEvent<T> = Readonly<
  T & {
    occurredAt: Date;
  }
>;
