import { BASE_API } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/features/projects/types';

export const useRetrieveProject = (projectId: string) => {
  return useQuery({
    queryKey: ['retrieve-project', projectId],
    queryFn: async (): Promise<Project> => {
      const res = await fetch(`${BASE_API}/projects/${projectId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to get project');
      }
      return data satisfies Project;
    },
    retry: false,
  });
};
