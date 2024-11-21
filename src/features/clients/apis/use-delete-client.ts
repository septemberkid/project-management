import { BASE_API } from '@/config';
import { Client } from '@/features/clients/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteClientResponse {
  readonly message: string;
  readonly client?: Client;
}
export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteClientResponse, Error, { id: string }>({
    mutationKey: ['delete-client'],
    mutationFn: async ({ id }) => {
      const response = await fetch(`${BASE_API}/clients/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete client');
      }
      return data satisfies DeleteClientResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-clients'],
      });
    },
  });
};
