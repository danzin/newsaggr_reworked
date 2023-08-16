import axios from 'axios';
import useAuth from './useAuth';

export const useRefreshToken = async () => {
  const setAuth = useAuth();

  const refresh = async () => {
    const response = await axios.get('/api/refresh', {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};
