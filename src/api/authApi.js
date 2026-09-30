import axiosInstance from './axiosInstance'

const authApi = {
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  register: (data) => axiosInstance.post('/auth/register', data),
  getProfile: () => axiosInstance.get('/profile'),
  updateProfile: (data) => axiosInstance.put('/profile', data),
}

export default authApi
