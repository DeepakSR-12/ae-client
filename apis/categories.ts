import axiosInstance from '@/utils/axiosInstance';

import { UserProfile } from '@/types/user'

export const saveUserCategories = (selectedCategories: string[]) => {
	return axiosInstance.put('/users', {
		categories: selectedCategories,
	}).then((data) => data.data)
	// return axiosInstance.post('/api/users/login', user)
}

export const fetchSelectedCategories = () => {
	return axiosInstance.get('/users/categories').then((data) => data.data)
	// return axiosInstance.get('/api/users/login', user)
}