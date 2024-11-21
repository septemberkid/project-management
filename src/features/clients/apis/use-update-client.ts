import { BASE_API } from '@/config';
import { Client } from '@/features/clients/types';
import { ClientSchema } from '@/features/clients/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateClientResponse {
  readonly message: string;
  readonly client?: Client;
}
export const useUpdateClient = (clientId: string) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateClientResponse, Error, ClientSchema>({
    mutationKey: ['update-client', clientId],
    mutationFn: async payload => {
      const response = await fetch(`${BASE_API}/clients/${clientId}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update client');
      }
      return data satisfies UpdateClientResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-clients'],
      });
    },
  });
};
