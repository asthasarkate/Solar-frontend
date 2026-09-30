import axiosInstance from './axiosInstance'

const predictionApi = {
  analyze: (formData) => axiosInstance.post('/analyze', formData),
  getHistory: (params) => axiosInstance.get('/history', { params }),
  getPrediction: (id) => axiosInstance.get(`/predictions/${id}`),
}

export default predictionApi
