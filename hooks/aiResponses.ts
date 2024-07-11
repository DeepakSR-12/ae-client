import { fetchAiResponses } from "@/apis/aiResponses";
import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { UserProfile, UserProfileResponse } from "@/types/user"

export const useFetchAiResponses = () => {
  return useQuery({
    queryKey: ['aiResponses'],
    queryFn: () => fetchAiResponses()
  })
};
