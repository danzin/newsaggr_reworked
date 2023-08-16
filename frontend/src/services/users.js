import axios from 'axios';

const baseUrl = '/api/user/';

export const getUsers = async (controller) => {
  try {
    const response = await axios.get(baseUrl, { signal: controller.signal });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
