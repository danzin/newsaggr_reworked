import axios from 'axios';
const baseUrl = '/api/auth';

export const login = async (data) => {
  const response = await axios.post(baseUrl, data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};
