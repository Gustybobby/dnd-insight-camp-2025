import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constrain(value: number, min: number, max: number): number {
  return Math.max(Math.min(value, max), min);
}

export function nonNullable<T>(value: T): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error("value is null or undefined");
  }
  return value;
}
