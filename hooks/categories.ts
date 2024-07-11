import { saveUserCategories, fetchSelectedCategories } from "@/apis/categories";
import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { UserProfile, UserProfileResponse } from "@/types/user"

export const useSelectedCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (selectedCategories) => saveUserCategories(selectedCategories),
    onMutate: async (selectedCategories) => {
      await queryClient.cancelQueries({ queryKey: ['selectedCategories'] });

      const previousUserInfo = queryClient.getQueryData<UserProfileResponse[]>(['userInfo']);
      
      queryClient.setQueryData<UserProfileResponse[]>(['selectedCategories'], old => {
        return [{ ...selectedCategories, id: Date.now() }, ...(old || [])];
      });

      return { previousUserInfo };
    },
    onError: (err, selectedCategories, context) => {
      if (context?.previousUserInfo) {
        queryClient.setQueryData(['selectedCategories'], context.previousUserInfo);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['selectedCategories'] });
    },
    onSuccess: (data: UserProfileResponse, variables, context) => {
      // `data` is the response from the API
      console.log("data:::222222", data)
      queryClient.setQueryData<UserProfileResponse[]>(['selectedCategories'], old => {
        return [data, ...(old || [])];
      });
    },
  });
};

export const userSelectedCategories = () => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: () => fetchSelectedCategories()
    })
  };
