import axiosInstance from '@/utils/axiosInstance';

import { UserProfile } from '@/types/user'

export const signInUser = (user: any) => {
	// return {
	// 	"name": "Ashwani",
	// 	"userName": "ashwin4",
	// 	"profileImageUrl": "url",
	// 	"twitterProvider": {
	// 		"token": "asds23ds3eqwdd2d222ed3d32d23.d32d3d3d32d32.d2332d123xsfdg",
	// 		"provider": "twitter"
	// 	},
	// 	"alohaToken": "asds23ds3eqwdd2d222ed3d32d23.d32d3d3d32d32.d2332d123xsfdg",
	// 	"createdAt": 1718649545661
	// }
	console.log("user:::", user)
	return axiosInstance.post('/users/signin', {
		name: user.user.name,
		profileImageUrl: user.user.image,
		twitterUserId: user.token.user.id,
		twitterProvider: user.token.account,
		categories: [],
	}).then((data) => data.data)
}