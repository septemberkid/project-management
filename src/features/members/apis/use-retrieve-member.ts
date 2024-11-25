import { BASE_API } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { Member } from '@/features/members/types';

export const useRetrieveMember = (memberId: string) => {
  return useQuery({
    queryKey: ['retrieve-member', memberId],
    queryFn: async (): Promise<Member> => {
      const res = await fetch(`${BASE_API}/members/${memberId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to get member');
      }
      return data satisfies Member;
    },
    retry: false,
  });
};
