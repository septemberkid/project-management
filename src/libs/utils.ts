import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
