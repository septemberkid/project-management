import { BASE_API } from '@/config';
import { buildQueryParams } from '@/libs/utils';
import { useQuery } from '@tanstack/react-query';
import { Option } from '@/components/combo-box';
import { ClientAsOption } from '@/features/clients/types';

export const useGetClientsOptions = (name?: string, clientId?: string) => {
  return useQuery({
    queryKey: ['get-clients-options', name, clientId],
    queryFn: async ({ signal }): Promise<Option[]> => {
      const urlParams = buildQueryParams({
        name: name || null,
        client_id: clientId || null,
      });
      const res = await fetch(`${BASE_API}/clients/options?${urlParams}`, {
        credentials: 'include',
        signal,
      });
      if (!res.ok) {
        throw new Error('Failed to get clients');
      }
      const data = (await res.json()) satisfies ClientAsOption[];
      const result: Option[] = [];
      data.forEach((o: ClientAsOption) => {
        result.push({
          label: o.name,
          value: o.id,
        });
      });
      return result;
    },
    retry: false,
  });
};
