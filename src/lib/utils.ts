import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  const initial = 1
  const range = [1, totalPages, ...Array.from({ length: initial * 2 + 1 }, (_, i) => currentPage - initial + i)]
  const uniqueRange = Array.from(new Set(range)).filter(page => page > 0 && page <= totalPages).sort((a, b) => a - b)
  return uniqueRange.reduce((acc: (number | string)[], curr, idx, src) => {
    if (idx > 0) {
      const prev = src[idx - 1]
      if (curr - prev === 2) {
        acc.push(prev + 1)
      } else if (curr - prev > 2) {
        acc.push("...")
      }
    }
    acc.push(curr)
    return acc
  }, [])
}