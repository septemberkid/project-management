import { BASE_API } from '@/config';
import { useMutation } from '@tanstack/react-query';

interface SignOutResponse {
  readonly message: string;
}
export const useSignOut = () => {
  return useMutation<SignOutResponse, Error, unknown>({
    mutationKey: ['sign-out'],
    mutationFn: async () => {
      const response = await fetch(`${BASE_API}/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Sign out failed.');
      }
      return data satisfies SignOutResponse;
    },
  });
};
