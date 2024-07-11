import { fetchOCR, fetchQueryOCR } from "@/apis/ai";
import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { UserProfile, UserProfileResponse } from "@/types/user"
const FETCH_OCR_KEY = "evaluation"
const FETCH_QUERY_OCR_KEY = "verifyEvaluation"
export const useMutateOCR = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => fetchOCR(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: [FETCH_OCR_KEY] });

      const previousUserInfo = queryClient.getQueryData<UserProfileResponse[]>([FETCH_OCR_KEY]);

      queryClient.setQueryData<UserProfileResponse[]>([FETCH_OCR_KEY], old => {
        return [{ ...payload, id: Date.now() }, ...(old || [])];
      });

      return { previousUserInfo };
    },
    onError: (err, payload, context) => {
      console.log("err:", err)
      if (context?.previousUserInfo) {
        queryClient.setQueryData([FETCH_OCR_KEY], context.previousUserInfo);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_OCR_KEY] });
    },
    onSuccess: (data: UserProfileResponse, variables, context) => {
      // `data` is the response from the API
      console.log("data:::222222", data)
      queryClient.setQueryData<UserProfileResponse[]>([FETCH_OCR_KEY], old => {
        return [data, ...(old || [])];
      });
    },
  });
};

export const useMutateOCRQuery = (callback: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => {
      let result = '';
      return new Promise((resolve, reject) => {
        fetchQueryOCR(payload, (chunk: string) => {
          callback(chunk);
          result += chunk;
        }).then(() => {
          // onComplete(result);
          resolve(result);
        }).catch(reject);
      });
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: [FETCH_QUERY_OCR_KEY] });

      const previousUserInfo = queryClient.getQueryData<UserProfileResponse[]>([FETCH_QUERY_OCR_KEY]);

      queryClient.setQueryData<UserProfileResponse[]>([FETCH_QUERY_OCR_KEY], old => {
        return [{ ...payload, id: Date.now() }, ...(old || [])];
      });

      return { previousUserInfo };
    },
    onError: (err, payload, context) => {
      console.log("err:", err);
      if (context?.previousUserInfo) {
        queryClient.setQueryData([FETCH_QUERY_OCR_KEY], context.previousUserInfo);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_QUERY_OCR_KEY] });
    },
    onSuccess: (data, variables, context) => {
      // `data` is the response from the API
      console.log("data:::222222", data);
      // callback(data);
      queryClient.setQueryData<UserProfileResponse[]>([FETCH_QUERY_OCR_KEY], old => {
        return [data, ...(old || [])];
      });
    },
  });
};

export const useFetchOCR = (key: any, payload: any) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchOCR(payload)
  })
};
