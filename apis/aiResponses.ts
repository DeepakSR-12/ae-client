import axiosInstance from '@/utils/axiosInstance';

import { UserProfile } from '@/types/user'

export const fetchAiResponses = async () => {
    const AIPosts = [
        {
          id: 1,
          prompt: "who won latest IPL ?",
          content: "The latest IPL (Indian Premier League) was won by the Kolkata Knight Riders (KKR). They defeated Sunrisers Hyderabad (SRH) by 8 wickets in the final match to secure the title. Notable individual awards included Virat Kohli of Royal Challengers Bangalore (RCB) winning the Orange Cap for scoring the most runs (741), and Harshal Patel of Punjab Kings (PBKS) winning the Purple Cap for taking the most wickets (24). Sunil Narine of KKR was named the Most Valuable Player of the season",
          upvote: 25,
          downvote: 25
        },
        {
          id: 2,
          prompt: "who won election india ?",
          content: "In the latest Indian general elections, the National Democratic Alliance (NDA), led by the Bharatiya Janata Party (BJP) and Prime Minister Narendra Modi, secured a victory. The NDA is set to form the government for the third consecutive term. The BJP won 240 out of 543 seats in the Lok Sabha, while the Congress won 99 seats",
          upvote: 25,
          downvote: 25
        },
        {
          id: 3,
          prompt: "who won election india ?",
          content: "The Bharatiya Janata Party (BJP) led by Prime Minister Narendra Modi won the latest Indian general elections and is set to form the government for the third consecutive term",
          upvote: 25,
          downvote: 25
        },
        {
          id: 4,
          prompt: "who won election india ?",
          content: "Bharatiya Janata Party (BJP)",
          upvote: 25,
          downvote: 25
        }
      ]
	// return AIPosts
	const response = await axiosInstance.get(`/ai-node-responses`);
	return response.data;
}