import { BASE_API } from '@/config';
import { Member } from '@/features/members/types';
import { SortingState } from '@tanstack/table-core';
import { buildQueryParams, getSortQuery } from '@/libs/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface GetMemberResult {
  members: Member[];
  total: number;
  total_pages: number;
}

export const useGetMembers = (
  filters: {
    name: string;
    email: string;
    base_role: string;
    trashed: string;
  },
  page: number,
  size: number,
  sort: SortingState,
) => {
  const { sortBy, sortDir } = getSortQuery(sort);

  return useQuery({
    queryKey: ['get-members', page, size, sortBy, sortDir],
    queryFn: async (): Promise<GetMemberResult> => {
      const urlParams = buildQueryParams({
        name: filters.name,
        email: filters.email,
        base_role: filters.base_role,
        trashed: filters.trashed,
        page,
        size,
        sort_by: sortBy,
        sort_dir: sortDir,
      });
      const res = await fetch(`${BASE_API}/members?${urlParams}`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to get members');
      }
      const data = await res.json();
      return data satisfies GetMemberResult;
    },
    placeholderData: keepPreviousData,
  });
};
