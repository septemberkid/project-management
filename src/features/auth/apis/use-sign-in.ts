import { BASE_API } from '@/config';
import { SignInSchema } from '@/features/auth/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SignInResponse {
  readonly message: string;
}
export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation<SignInResponse, Error, SignInSchema>({
    mutationKey: ['sign-in'],
    mutationFn: async payload => {
      const response = await fetch(`${BASE_API}/auth/sign-in`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed.');
      }
      return data satisfies SignInResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
};
