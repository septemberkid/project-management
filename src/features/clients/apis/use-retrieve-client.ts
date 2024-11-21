import { BASE_API } from '@/config';
import { Client } from '@/features/clients/types';
import { useQuery } from '@tanstack/react-query';

export const useRetrieveClient = (clientId: string) => {
  return useQuery({
    queryKey: ['retrieve-client', clientId],
    queryFn: async (): Promise<Client> => {
      const res = await fetch(`${BASE_API}/clients/${clientId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to get client');
      }
      return data satisfies Client;
    },
    retry: false,
  });
};
