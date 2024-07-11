import { signInUser, fetchUser } from "@/apis/signin";
import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { UserProfile, UserProfileResponse } from "@/types/user"

export const useSignInUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser: UserProfile) => signInUser(newUser),
    onMutate: async (newUser: UserProfile) => {
      await queryClient.cancelQueries({ queryKey: ['userInfo'] });

      const previousUserInfo = queryClient.getQueryData<UserProfileResponse[]>(['userInfo']);
      
      queryClient.setQueryData<UserProfileResponse[]>(['userInfo'], old => {
        return [{ ...newUser, id: Date.now() }, ...(old || [])];
      });

      return { previousUserInfo };
    },
    onError: (err, newUser, context) => {
      if (context?.previousUserInfo) {
        queryClient.setQueryData(['userInfo'], context.previousUserInfo);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
    onSuccess: (data: UserProfileResponse, variables, context) => {
      // `data` is the response from the API
      console.log("data:::", data)
      if (data.alohaAccessToken) {
        localStorage.setItem('alohaToken', data.alohaAccessToken);
      }
      queryClient.setQueryData<UserProfileResponse[]>(['userInfo'], old => {
        return [data, ...(old || [])];
      });
    },
  });
};

export const useCachedUserInfo = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<UserProfileResponse[]>(['userInfo']);
};

// export const useFetchUser = (userId: number) => {
//   return useQuery({
//     queryKey: ['userInfo', userId],
//     queryFn: () => fetchUser(userId)
//   })
// };
