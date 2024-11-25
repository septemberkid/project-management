import { BASE_API } from '@/config';
import { Member } from '@/features/members/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteMemberResponse {
  readonly message: string;
  readonly member?: Member;
}
export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteMemberResponse, Error, { id: string }>({
    mutationKey: ['delete-member'],
    mutationFn: async ({ id }) => {
      const response = await fetch(`${BASE_API}/members/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete member');
      }
      return data satisfies DeleteMemberResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-members'],
      });
    },
  });
};
