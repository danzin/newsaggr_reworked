import axios from 'axios';

const baseUrl = '/api/articles/';

const api = axios.create({
  baseURL: '/api/articles/',
});

/* Get articles by category
  Returns all if no category is set
*/
export const getPostsPageArticles = async (categories, pageParam = 1, lang) => {
  const categoriesParams = categories.join(',');
  console.log(lang);
  const response = await api.get(
    `/feed?q=${categoriesParams}&lang=${lang}&page=${pageParam}`,
  );
  return response.data;
};

/* Get articles by keyword */
export const searchArticles = async (query, page) => {
  const response = await api.get(`/search?q=${query}&page=${page}`);
  return response.data;
};

/* Update articles by category*/
export const updateExistingArticles = async (category) => {
  try {
    const response = await api.post(`${baseUrl}/updatearticles/?q=${category}`);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

/* Get single article by id*/
export const getArticle = async (id) => {
  try {
    console.log(id);
    const response = await api.get(`${baseUrl}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

/* Get all articles */
export const getArticles = async () => {
  try {
    const response = await api.get(baseUrl);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
