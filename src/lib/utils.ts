import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price in Pakistani Rupees (PKR) */
export function formatPrice(price: number): string {
  if (price >= 10000000) {
    const crores = price / 10000000;
    return `Rs. ${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2)} Crore`;
  }
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Short PKR format for charts */
export function formatPriceShort(price: number): string {
  if (price >= 10000000) return `Rs.${(price / 10000000).toFixed(1)}Cr`;
  if (price >= 100000) return `Rs.${(price / 100000).toFixed(1)}L`;
  return formatPrice(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export const KARACHI_COORDS = { lat: 24.8607, lng: 67.0011 };
