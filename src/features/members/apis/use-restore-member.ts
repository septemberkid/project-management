import { BASE_API } from '@/config';
import { Member } from '@/features/members/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface RestoreMemberResponse {
  readonly message: string;
  readonly member?: Member;
}
export const useRestoreMember = () => {
  const queryClient = useQueryClient();
  return useMutation<RestoreMemberResponse, Error, { id: string }>({
    mutationKey: ['restore-member'],
    mutationFn: async ({ id }) => {
      const response = await fetch(`${BASE_API}/members/restore/${id}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to restore member');
      }
      return data satisfies RestoreMemberResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-members'],
      });
    },
  });
};
