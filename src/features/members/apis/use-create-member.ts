import { BASE_API } from '@/config';
import { Member } from '@/features/members/types';
import { MemberSchema } from '@/features/members/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateMemberResponse {
  readonly message: string;
  readonly member?: Member;
}
export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateMemberResponse, Error, MemberSchema>({
    mutationKey: ['create-member'],
    mutationFn: async payload => {
      const response = await fetch(`${BASE_API}/members`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create member');
      }
      return data satisfies CreateMemberResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-members'],
      });
    },
  });
};
