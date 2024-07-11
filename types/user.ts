export interface UserProfile {
  name: string;
  image?: string;
}

export interface UserProfileResponse {
  name: string;
  image?: string;
  alohaAccessToken?: string;
}
