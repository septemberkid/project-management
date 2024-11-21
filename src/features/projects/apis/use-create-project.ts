import { BASE_API } from '@/config';
import { Project } from '@/features/projects/types';
import { ProjectSchema } from '@/features/projects/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateProjectResponse {
  readonly message: string;
  readonly project?: Project;
}
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateProjectResponse, Error, ProjectSchema>({
    mutationKey: ['create-project'],
    mutationFn: async payload => {
      const response = await fetch(`${BASE_API}/projects`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create project');
      }
      return data satisfies CreateProjectResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-projects'],
      });
    },
  });
};
