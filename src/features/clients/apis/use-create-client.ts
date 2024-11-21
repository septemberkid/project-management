import { BASE_API } from '@/config';
import { Client } from '@/features/clients/types';
import { CreateClientSchema } from '@/features/clients/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateClientResponse {
  readonly message: string;
  readonly client?: Client;
}
export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateClientResponse, Error, CreateClientSchema>({
    mutationKey: ['create-client'],
    mutationFn: async payload => {
      const response = await fetch(`${BASE_API}/clients`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create client.');
      }
      return data satisfies CreateClientResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-clients'],
      });
    },
  });
};
