import { BASE_API } from '@/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Project } from '@/features/projects/types';

interface DeleteProjectResponse {
  readonly message: string;
  readonly project?: Project;
}
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteProjectResponse, Error, { id: string }>({
    mutationKey: ['delete-project'],
    mutationFn: async ({ id }) => {
      const response = await fetch(`${BASE_API}/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete project');
      }
      return data satisfies DeleteProjectResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-projects'],
      });
    },
  });
};
