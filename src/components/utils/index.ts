import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constrain(value: number, min: number, max: number): number {
  return Math.max(Math.min(value, max), min);
}

export function nonNullable<T>(value: T, onError?: () => void): NonNullable<T> {
  if (value === null || value === undefined) {
    onError?.();
    throw new Error("value is null or undefined");
  }
  return value;
}

export function mapNumToAlphabet(num: number): string {
  const startCode = "A".charCodeAt(0);
  return String.fromCharCode(startCode + num - 1);
}
