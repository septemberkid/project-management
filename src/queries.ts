import 'server-only';
import { cookies } from 'next/headers';
import { BASE_API } from '@/config';

interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}
const COOKIE_KEY = 'project-management-cookie';

export const getSession = async (): Promise<User | null> => {
  const cookie = await cookies();
  if (!cookie.has(COOKIE_KEY)) {
    return null;
  }
  const cookieValue = cookie.get(COOKIE_KEY)?.value;
  if (!cookieValue) {
    return null;
  }

  const res = await fetch(`${BASE_API}/auth/session`, {
    credentials: 'include',
    headers: {
      cookie: `${COOKIE_KEY}=${cookieValue}`,
    },
  });
  if (!res.ok) {
    return null;
  }
  return await res.json();
};
