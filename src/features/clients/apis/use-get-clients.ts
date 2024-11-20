import { useQuery } from '@tanstack/react-query';
import { BASE_API } from '@/config';
import { Client } from '@/features/clients/types';

export const useGetClients = () => {
  return useQuery({
    queryKey: ['get-clients'],
    queryFn: async (): Promise<Client[]> => {
      const res = await fetch(`${BASE_API}/clients`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Unable to get clients');
      }
      const data = await res.json();
      return data.clients satisfies Client[];
    },
  });
};
