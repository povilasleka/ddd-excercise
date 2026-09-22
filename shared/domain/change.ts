export type Change<T, E> = Readonly<{
  entity: T;
  events: readonly E[];
}>;
