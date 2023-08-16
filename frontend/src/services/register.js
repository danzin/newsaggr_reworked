import axios from 'axios';
const baseUrl = '/api/user/register';

export const register = async (data) => {
  const response = await axios.post(baseUrl, data, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};
