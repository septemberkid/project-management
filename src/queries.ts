import 'server-only';
import { cookies } from 'next/headers';
const COOKIE_KEY = 'project-management-cookie';

export const isAuthenticated = async (): Promise<boolean> => {
  const cookie = await cookies();
  return cookie.has(COOKIE_KEY);
};
