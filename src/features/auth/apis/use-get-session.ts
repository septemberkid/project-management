import { useQuery } from '@tanstack/react-query';
import { BASE_API } from '@/config';
import { User } from '@/types';

export const useGetSession = () => {
  return useQuery({
    queryKey: ['get-session'],
    queryFn: async (): Promise<User> => {
      const res = await fetch(`${BASE_API}/auth/session`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Unable to get session');
      }
      const data = await res.json();
      return data.user satisfies User;
    },
    retry: false,
  });
};
