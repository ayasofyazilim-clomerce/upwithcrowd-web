import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type ResourceResult = Record<
  string,
  | {
      texts?: Record<string, string> | null | undefined;
      baseResources?: string[] | null | undefined;
    }
  | undefined
>;

export const formatCurrency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "-";
  return (
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace("₺", "") + "₺"
  );
};

export type NonEmptyArray<T> = [T, ...T[]];
export function checkNonEmptyArray<T>(arr: T[]): arr is NonEmptyArray<T> {
  return arr.length > 0;
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
