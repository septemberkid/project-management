import { BASE_API } from '@/config';
import { SortingState } from '@tanstack/table-core';
import { Client } from '@/features/clients/types';
import { buildQueryParams, getSortQuery } from '@/libs/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface GetClientsResult {
  clients: Client[];
  total: number;
  total_pages: number;
}

export const useGetClients = (
  filters: {
    name: string;
    address: string;
  },
  page: number,
  size: number,
  sort: SortingState,
) => {
  const { sortBy, sortDir } = getSortQuery(sort);

  return useQuery({
    queryKey: ['get-clients', page, size, sortBy, sortDir],
    queryFn: async (): Promise<GetClientsResult> => {
      const urlParams = buildQueryParams({
        name: filters.name,
        address: filters.address,
        page,
        size,
        sort_by: sortBy,
        sort_dir: sortDir,
      });
      const res = await fetch(`${BASE_API}/clients?${urlParams}`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Unable to get clients');
      }
      const data = await res.json();
      return data satisfies GetClientsResult;
    },
    placeholderData: keepPreviousData,
  });
};
