import { saveEvaluations, verifyEvaluations } from "@/apis/evaluation";
import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { UserProfile, UserProfileResponse } from "@/types/user"
const KEY = "evaluation"
const VERIFIED_KEY = "verifyEvaluation"
export const useMutateEvaluation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (evaluation) => saveEvaluations(evaluation),
    onMutate: async (evaluation) => {
      await queryClient.cancelQueries({ queryKey: [KEY] });

      const previousUserInfo = queryClient.getQueryData<UserProfileResponse[]>([KEY]);
      
      queryClient.setQueryData<UserProfileResponse[]>([KEY], old => {
        return [{ ...evaluation, id: Date.now() }, ...(old || [])];
      });

      return { previousUserInfo };
    },
    onError: (err, evaluation, context) => {
        console.log("err:", err)
      if (context?.previousUserInfo) {
        queryClient.setQueryData([KEY], context.previousUserInfo);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onSuccess: (data: UserProfileResponse, variables, context) => {
      // `data` is the response from the API
      console.log("data:::222222", data)
      queryClient.setQueryData<UserProfileResponse[]>([KEY], old => {
        return [data, ...(old || [])];
      });
    },
  });
};

export const userVerifyEvaluations = (callback: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (evaluation) => verifyEvaluations(evaluation),
    onMutate: async (evaluation) => {
      await queryClient.cancelQueries({ queryKey: [VERIFIED_KEY] });

      const previousUserInfo = queryClient.getQueryData<UserProfileResponse[]>([VERIFIED_KEY]);
      
      queryClient.setQueryData<UserProfileResponse[]>([VERIFIED_KEY], old => {
        return [{ ...evaluation, id: Date.now() }, ...(old || [])];
      });

      return { previousUserInfo };
    },
    onError: (err, evaluation, context) => {
        console.log("err:", err)
      if (context?.previousUserInfo) {
        queryClient.setQueryData([VERIFIED_KEY], context.previousUserInfo);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [VERIFIED_KEY] });
    },
    onSuccess: (data: UserProfileResponse, variables, context) => {
      // `data` is the response from the API
      console.log("data:::222222", data)
      callback(data)
      queryClient.setQueryData<UserProfileResponse[]>([VERIFIED_KEY], old => {
        return [data, ...(old || [])];
      });
    },
  });
};
