import axios from 'axios';
import { getApiUrl } from '../config/api';

export const api = {
  getCourses: () => axios.get(getApiUrl('/api/courses')),
  getCourse: (id) => axios.get(getApiUrl(`/api/courses/${id}`)),
  createCourse: (data) => axios.post(getApiUrl('/api/courses'), data),
  updateCourse: (id, data) => axios.put(getApiUrl(`/api/courses/${id}`), data),
  deleteCourse: (id) => axios.delete(getApiUrl(`/api/courses/${id}`)),

  // Coupons
  getCoupons: (token) => axios.get(getApiUrl('/api/coupons/all'), { headers: { Authorization: `Bearer ${token}` } }),
  createCoupon: (data, token) => axios.post(getApiUrl('/api/coupons/create'), data, { headers: { Authorization: `Bearer ${token}` } }),
  deleteCoupon: (id, token) => axios.delete(getApiUrl(`/api/coupons/${id}`), { headers: { Authorization: `Bearer ${token}` } })
};

export default api;