import { BASE_API } from '@/config';
import { SignUpSchema } from '@/features/auth/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SignUpResponse {
  readonly message: string;
}
export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation<SignUpResponse, Error, SignUpSchema>({
    mutationKey: ['sign-up'],
    mutationFn: async payload => {
      const response = await fetch(`${BASE_API}/auth/sign-up`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed.');
      }
      return data satisfies SignUpResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
};
