// eslint-disable-next-line
export type UseCaseParams<T extends { invoke: (...args: any) => any }> =
  Parameters<T["invoke"]>[0];

// eslint-disable-next-line
export type UseCaseReturn<T extends { invoke: (...args: any) => any }> =
  ReturnType<T["invoke"]>;
