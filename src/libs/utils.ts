import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SortingState } from '@tanstack/table-core';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function generateAvatarInitial(name: string) {
  const nameParts = name.trim().split(' ');
  return nameParts.length > 1
    ? nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase()
    : nameParts[0].charAt(0).toUpperCase();
}

export function getSortQuery(sortingState: SortingState) {
  let sortBy = null;
  let sortDir = null;
  if (sortingState.length > 0) {
    const { id, desc } = sortingState[0];
    sortBy = id;
    sortDir = desc ? 'desc' : 'asc';
  }
  return {
    sortBy,
    sortDir,
  };
}

export function buildQueryParams(
  queries: Record<string, string | null | number>,
) {
  const tmp: Record<string, string> = {};
  Object.keys(queries).forEach(key => {
    if (queries[key]) {
      if (
        typeof queries[key] === 'string' &&
        queries[key].trim().length === 0
      ) {
        return;
      }
      tmp[key] = String(queries[key]);
    }
  });
  return new URLSearchParams(tmp).toString();
}
