import { BASE_API } from '@/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Member } from '@/features/members/types';
import { MemberSchema } from '@/features/members/schema';

interface UpdateMemberResponse {
  readonly message: string;
  readonly member?: Member;
}
export const useUpdateMember = (memberId: string) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateMemberResponse, Error, MemberSchema>({
    mutationKey: ['update-member', memberId],
    mutationFn: async payload => {
      const response = await fetch(`${BASE_API}/members/${memberId}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update member');
      }
      return data satisfies UpdateMemberResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-members'],
      });
    },
  });
};
