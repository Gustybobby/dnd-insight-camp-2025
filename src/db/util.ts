import { timestamp } from "drizzle-orm/pg-core";

export function takeOne<T>(results: T[]): T | null {
  return results.length ? results[0] : null;
}

export function takeOneOrThrow<T>(results: T[]): T {
  const result = takeOne(results);
  if (!result) {
    throw new Error("record not found");
  }
  return result;
}

export const timestamptz = (name: string) =>
  timestamp(name, { precision: 6, withTimezone: true });
