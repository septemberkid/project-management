import { BASE_API } from '@/config';
import { Project } from '@/features/projects/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectSchema } from '@/features/projects/schema';

interface UpdateProjectResponse {
  readonly message: string;
  readonly project?: Project;
}
export const useUpdateProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateProjectResponse, Error, ProjectSchema>({
    mutationKey: ['update-project', projectId],
    mutationFn: async payload => {
      const response = await fetch(`${BASE_API}/projects/${projectId}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update project');
      }
      return data satisfies UpdateProjectResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-projects'],
      });
    },
  });
};
