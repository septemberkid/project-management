import { BASE_API } from '@/config';
import { SortingState } from '@tanstack/table-core';
import { buildQueryParams, getSortQuery } from '@/libs/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Project } from '@/features/projects/types';

interface GetProjectsResult {
  projects: Project[];
  total: number;
  total_pages: number;
}

export const useGetProjects = (
  filters: {
    name: string;
    clientId: string;
  },
  page: number,
  size: number,
  sort: SortingState,
) => {
  const { sortBy, sortDir } = getSortQuery(sort);

  return useQuery({
    queryKey: ['get-projects', page, size, sortBy, sortDir],
    queryFn: async (): Promise<GetProjectsResult> => {
      const urlParams = buildQueryParams({
        name: filters.name,
        client_id: filters.clientId,
        page,
        size,
        sort_by: sortBy,
        sort_dir: sortDir,
      });
      const res = await fetch(`${BASE_API}/projects?${urlParams}`, {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to get projects');
      }
      const data = await res.json();
      return data satisfies GetProjectsResult;
    },
    placeholderData: keepPreviousData,
  });
};
